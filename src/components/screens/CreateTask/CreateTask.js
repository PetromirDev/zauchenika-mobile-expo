import React, { useState, useEffect } from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {
	StyleSheet,
	SafeAreaView,
	Keyboard,
	View,
	KeyboardAvoidingView,
	Switch,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Alert
} from 'react-native'
import PropTypes from 'prop-types'
import { Calendar, Folder } from 'react-native-feather'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { collection, addDoc, serverTimestamp, getDoc, doc } from 'firebase/firestore'
import { useInterstitialAd } from '@react-native-admob/admob'
// Context
import { useAppContext } from '@context/AuthContext'
// Helpers
import { pxH } from '@helpers'
/* Components */
import { MyText, BigInput, PrimaryButton } from '@components/common'
import ChooseGroupModal from './ChooseGroupModal/ChooseGroupModal'
import { db } from '../../../../firebaseConfig'

export default function CreateTask({ navigation }) {
	const { user, palette } = useAppContext()
	const { highlighted, background, backgroundSecondary, textSecondary, textTertiary, inputColor } = palette
	const [dateEnabled, setDateEnabled] = useState(false)
	const [date, setDate] = useState()
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [isSelectGroupModalVisible, setIsSelectGroupModalVisible] = useState(false)
	const [shownDate, setShownDate] = useState('')
	const [selectedGroup, setSelectedGroup] = useState({ name: 'Само с мен', gid: user.uid })
	const [isSubmit, setIsSubmit] = useState(false)
	const { adLoaded, adDismissed, show } = useInterstitialAd('ca-app-pub-1800635395568659/6810513481')
	/* SIZES */
	const iconSize = hp(3)

	// Datepicker functions
	const showDatePicker = () => {
		setDateEnabled((prev) => !prev)
		if (!dateEnabled) {
			setDatePickerVisibility(true)
			setDate('')
			setShownDate('')
		} else {
			setDate('')
			setShownDate('')
		}
	}

	const hideDatePicker = () => {
		setDatePickerVisibility(false)
		setDateEnabled(false)
		setShownDate('')
	}

	const handleConfirm = (pickedDate) => {
		hideDatePicker()
		const before = new Date(pickedDate.toDateString()) < new Date(new Date().toDateString())
		if (before === false) {
			setDate(pickedDate)
			setShownDate(new Date(pickedDate).toLocaleDateString('bg-BG'))
			setDateEnabled(true)
		} else {
			Alert.alert('Не може да избирате задна дата!')
		}
	}
	// Create a task
	const writeTask = async (users) => {
		try {
			await addDoc(collection(db, 'tasks'), {
				title,
				description,
				date,
				group: selectedGroup.gid,
				users,
				created: serverTimestamp()
			})

			showAd()
		} catch {
			Alert('Грешка при създаване на задачата!')
			setIsSubmit(false)
		}
	}

	// Create a task
	const createTask = async () => {
		if (title && date && selectedGroup) {
			if (!isSubmit) {
				setIsSubmit(true)
				if (selectedGroup.gid === user.uid) {
					writeTask([user.email])
					return
				}
				const docRef = doc(db, 'groups', selectedGroup.gid)
				const docSnap = await getDoc(docRef)

				if (docSnap.exists()) {
					writeTask(docSnap.data().users)
				} else {
					alert('Грешка при създаване на задачата!')
				}
			}
		} else {
			alert('Моля попълнете всички данни!')
		}
	}

	/* ADS */
	const showAd = () => {
		try {
			if (adLoaded) {
				show()
			} else {
				navigation.reset({ index: 0, routes: [{ name: 'Начало' }] })
			}
		} catch {
			setIsSubmit(false)
			alert('Грешка при създаване на задачата!')
		}
	}

	useEffect(() => {
		if (adDismissed) {
			navigation.reset({ index: 0, routes: [{ name: 'Начало' }] })
		}
	}, [adDismissed])

	return (
		<SafeAreaView style={styles.container}>
			{/* <ScrollView style={{flex: 1, backgroundColor: 'red'}} showsVerticalScrollIndicator={false}> */}
			<KeyboardAvoidingView style={styles.container}>
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
					<View style={{ ...styles.inner, backgroundColor: background }}>
						<DateTimePickerModal
							isVisible={isDatePickerVisible}
							mode='date'
							onConfirm={handleConfirm}
							onCancel={hideDatePicker}
							confirmBtnText='Confirm'
							cancelBtnText='Cancel'
						/>
						<BigInput
							maxLength={50}
							color={textTertiary}
							backgroundColor={inputColor}
							placeholder='Заглавие на задачата'
							keyboardType='default'
							onChangeText={setTitle}
						/>
						<BigInput
							maxLength={200}
							color={textTertiary}
							backgroundColor={inputColor}
							style={{ height: pxH(150), marginBottom: pxH(30), textAlignVertical: 'top' }}
							onChangeText={setDescription}
							placeholder='Описание на задачата'
							multiline
							keyboardType='default'
						/>
						<TouchableOpacity onPress={showDatePicker}>
							<View style={[styles.taskSettings, { backgroundColor: inputColor }]}>
								<View style={styles.taskSettingsLeft}>
									<View style={[styles.iconWrapper, { backgroundColor: textSecondary }]}>
										<Calendar width={iconSize} height={iconSize} stroke={backgroundSecondary} />
									</View>
									<View>
										<MyText
											styles={{ marginTop: 0 }}
											color={textSecondary}
											text='До дата'
											size={16}
											font='FiraSans-Medium'
										/>
										<MyText
											color={textTertiary}
											text={shownDate ? `${shownDate} ММ-ДД-ГГ` : 'Няма посочена дата'}
											size={14}
											font='FiraSans-Regular'
										/>
									</View>
								</View>
								<Switch
									style={styles.switch}
									trackColor={{ false: '#7F7F7F', true: textTertiary }}
									thumbColor={dateEnabled ? backgroundSecondary : backgroundSecondary}
									ios_backgroundColor='#f4f3f4'
									onValueChange={showDatePicker}
									value={dateEnabled}
								/>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => setIsSelectGroupModalVisible(true)}>
							<View style={[styles.taskSettings, { backgroundColor: inputColor }]}>
								<View style={styles.taskSettingsLeft}>
									<View style={[styles.iconWrapper, { backgroundColor: highlighted }]}>
										<Folder width={iconSize} height={iconSize} stroke={backgroundSecondary} />
									</View>
									<View>
										<MyText color={textSecondary} text='Споделяне' size={16} font='FiraSans-Medium' />
										<MyText
											color={textTertiary}
											text={selectedGroup.name || 'Самостоятелна задача'}
											size={14}
											font='FiraSans-Regular'
										/>
									</View>
								</View>
							</View>
						</TouchableOpacity>
						<View style={{ marginTop: pxH(40) }}>
							<PrimaryButton
								onPress={createTask}
								bg={highlighted}
								borderColor={highlighted}
								text='Създай задача'
								textColor={background}
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
			<ChooseGroupModal
				selectedGroup={selectedGroup}
				setSelectedGroup={setSelectedGroup}
				isSelectGroupModalVisible={isSelectGroupModalVisible}
				setIsSelectGroupModalVisible={setIsSelectGroupModalVisible}
			/>
			{/* </ScrollView> */}
		</SafeAreaView>
	)
}

CreateTask.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
		reset: PropTypes.func.isRequired
	}).isRequired
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	iconWrapper: {
		alignItems: 'center',
		borderRadius: pxH(10),
		height: pxH(40),
		justifyContent: 'center',
		marginRight: pxH(10),
		width: pxH(40)
	},
	inner: {
		flex: 1,
		padding: pxH(20),
		paddingTop: pxH(30)
	},
	switch: {
		transform: [{ scaleX: hp(0.2) }, { scaleY: hp(0.2) }]
	},
	taskSettings: {
		alignItems: 'center',
		borderRadius: pxH(15),
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: pxH(10),
		padding: pxH(12)
	},
	taskSettingsLeft: {
		alignItems: 'center',
		flexDirection: 'row'
	}
})
