import React, { useState, useEffect } from 'react'
import {
	StyleSheet,
	SafeAreaView,
	Keyboard,
	View,
	KeyboardAvoidingView,
	FlatList,
	TouchableWithoutFeedback,
	TouchableOpacity
} from 'react-native'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useAppContext } from '@context/AuthContext'
import { TestIds, useInterstitialAd } from 'react-native-google-mobile-ads'
import { Plus, X } from 'react-native-feather'
import PropTypes from 'prop-types'
// Helpers
import { validateUser, validateEmail, pxH } from '@helpers'
/* Components */
import { MyText, BigInput, PrimaryButton } from '@components/common'
import { db } from '../../../../firebaseConfig'

export default function CreateGroup({ navigation }) {
	const { user, palette } = useAppContext()
	const { highlighted, background, backgroundSecondary, textSecondary, textTertiary, inputColor } = palette
	const { email } = user
	const [users, setUsers] = useState([user.email])
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [newUser, setNewUser] = useState('')
	const [isSubmit, setIsSubmit] = useState(false)
	const {
		isLoaded: isAdLoaded,
		isClosed,
		load,
		show
		// @TODO: Add ad unit id
	} = useInterstitialAd(TestIds.INTERSTITIAL, {
		requestNonPersonalizedAdsOnly: true
	})

	useEffect(() => {
		load()
	}, [load])

	const removeUser = (userToDeleteEmail) => {
		setUsers((currentUsers) => currentUsers.filter((currentUser) => currentUser !== userToDeleteEmail))
	}

	const addUser = async () => {
		if (newUser && newUser.toLocaleLowerCase() !== user.email.toLocaleLowerCase() && validateEmail(newUser)) {
			if (await validateUser(newUser)) {
				if (newUser.toLocaleLowerCase() && !users.includes(newUser.toLocaleLowerCase())) {
					setUsers((oldUsers) => [...oldUsers, newUser.toLocaleLowerCase()])
					Keyboard.dismiss()
					setNewUser('')
				} else {
					alert('Вече сте добавили потребител с този имейл адрес!')
					setNewUser('')
				}
			} else {
				alert('Потребител с този имейл адрес не съществува!')
			}
		} else if (newUser && newUser.toLocaleLowerCase() === user.email.toLocaleLowerCase()) {
			alert('Това е вашият имейл адрес!')
		} else {
			alert('Моля въведете имейл адрес!')
		}
	}

	const showAd = () => {
		try {
			if (isAdLoaded) {
				show()
			} else {
				navigation.reset({ index: 0, routes: [{ name: 'Групи' }] })
			}
		} catch {
			setIsSubmit(false)
			alert('Грешка при създаване на групата!')
		}
	}

	useEffect(() => {
		if (isClosed) {
			// Action after the ad is closed
			navigation.reset({ index: 0, routes: [{ name: 'Групи' }] })
		}
	}, [isClosed, navigation])

	const createGroup = async () => {
		if (name && description && users.length > 1) {
			if (!isSubmit) {
				setIsSubmit(true)
				try {
					const newUsers = [user.email, ...users]
					setUsers(newUsers)
					await addDoc(collection(db, 'groups'), {
						name,
						description,
						users: newUsers,
						image: '',
						created: serverTimestamp(),
						owner: user.email
					})
					showAd()
				} catch {
					alert('Грешка при създаване на групата!')
					setIsSubmit(false)
				}
			}
		} else if (name && description && users.length === 1) {
			alert('Моля добавете потребители')
		} else {
			alert('Моля въведете име, описание и добави потребители!')
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView style={styles.container}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={[styles.inner, { backgroundColor: background }]}>
						<BigInput
							maxLength={30}
							backgroundColor={inputColor}
							color={textTertiary}
							placeholder='Име на групата'
							keyboardType='default'
							onChangeText={setName}
							value={name}
						/>
						<BigInput
							maxLength={90}
							backgroundColor={inputColor}
							color={textTertiary}
							placeholder='Кратко описание на групата'
							keyboardType='default'
							onChangeText={setDescription}
							value={description}
							multiline
							style={{ height: pxH(120), textAlignVertical: 'top' }}
						/>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								marginBottom: pxH(30),
								marginTop: pxH(40)
							}}
						>
							<BigInput
								backgroundColor={inputColor}
								color={textTertiary}
								style={{ marginBottom: 0, flex: 1 }}
								placeholder='Имейл адрес на участник'
								value={newUser}
								keyboardType='email-address'
								onChangeText={setNewUser}
							/>
							<TouchableOpacity onPress={() => addUser()}>
								<View style={[styles.plus, { backgroundColor: highlighted }]}>
									<Plus width={pxH(30)} height={pxH(30)} stroke={background} />
								</View>
							</TouchableOpacity>
						</View>
						<MyText text={`${users.length} ${users.length === 1 ? 'участник' : 'участници'}`} color={textTertiary} />
						<FlatList
							showsVerticalScrollIndicator={false}
							contentContainerStyle={{
								justifyContent: 'center',
								alignItems: 'flex-start',
								marginBottom: pxH(30),
								marginTop: pxH(10)
							}}
							data={users.filter((userToFilter) => userToFilter.toLocaleLowerCase() !== email)}
							numColumns={1}
							keyExtractor={(item) => item}
							renderItem={({ item }) => (
								<View
									style={{
										...styles.user,
										backgroundColor: backgroundSecondary
									}}
								>
									<MyText text={item} font='FiraSans-Regular' color={textTertiary} />
									<TouchableOpacity onPress={() => removeUser(item)}>
										<X
											width={pxH(20)}
											height={pxH(20)}
											strokeWidth={3}
											style={{ marginLeft: pxH(5) }}
											stroke={textSecondary}
										/>
									</TouchableOpacity>
								</View>
							)}
						/>
						<View
							style={{
								marginTop: pxH(40)
							}}
						>
							<PrimaryButton
								onPress={createGroup}
								bg={highlighted}
								borderColor={highlighted}
								text='Създай група'
								textColor={background}
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

CreateGroup.propTypes = {
	navigation: PropTypes.shape({
		reset: PropTypes.func.isRequired
	}).isRequired
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	inner: {
		flex: 1,
		padding: pxH(20),
		paddingTop: pxH(40)
	},
	plus: {
		alignItems: 'center',
		borderRadius: pxH(20),
		height: pxH(60),
		justifyContent: 'center',
		marginLeft: pxH(15),
		width: pxH(60)
	},
	user: {
		alignItems: 'center',
		borderRadius: pxH(10),
		flexDirection: 'row',
		justifyContent: 'center',
		marginRight: pxH(10),
		marginTop: pxH(10),
		padding: pxH(10)
	}
})
