import React, { useEffect, useState } from 'react'
import {
	SafeAreaView,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	ScrollView
} from 'react-native'
import PropTypes from 'prop-types'
import { updateProfile } from 'firebase/auth'
// Context
import { useAppContext, handleDeleteProfile } from '@context/AuthContext'
// Helpers
import { pxH, resize } from '@helpers'
/* Components */
import Navigation from '@components/layout/Navigation/Navigation'
import { MyText, Loader, PrimaryButton, BigInput, MyAlert } from '@components/common'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../../../firebaseConfig'

export default function ProfileSettings({ navigation }) {
	const {
		palette,
		user: { uid }
	} = useAppContext()
	const [user, setUser] = useState({})
	const [newDisplayName, setNewDisplayName] = useState('')
	const [newBio, setNewBio] = useState('')
	const [isSubmit, setIsSubmit] = useState(false)
	const [loading, setLoading] = useState(true)
	const { textSecondary, textTertiary, background, backgroundSecondary, inputColor, highlighted } = palette

	useEffect(() => {
		let isMounted = true
		try {
			const userRef = doc(db, 'users', uid)

			getDoc(userRef).then((document) => {
				if (isMounted) {
					setUser(document.data())
					setNewDisplayName(document.data().displayName)
					setNewBio(document.data().bio || '')
					setLoading(false)
				}
			})
		} catch {
			alert('Грешка при зареждане на профила!')
		}

		return () => {
			isMounted = false
		}
	}, [uid])

	const updateDisplayName = async () => {
		if (newDisplayName.length > 0 && !loading) {
			if (!isSubmit) {
				setIsSubmit(true)
				try {
					await updateProfile(auth, {
						displayName: newDisplayName
					})

					const userDocRef = doc(db, 'users', uid)
					await updateDoc(userDocRef, {
						displayName: newDisplayName,
						bio: newBio
					})

					alert('Промените са запазени успешно!')
					setUser((prevState) => ({ ...prevState, displayName: newDisplayName, bio: newBio }))
				} catch {
					setIsSubmit(false)
					alert('Грешка при запазване на промените!')
				}
			}
		} else {
			alert('Въведете име!')
		}
	}

	const deleteProfile = () => {
		MyAlert(
			'ВНИМАНИЕ',
			'Сигурни ли сте че искате да ИЗТРИЕТЕ вашият профил',
			handleDeleteProfile,
			[],
			'Да',
			null,
			[],
			'Отказ'
		)
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<SafeAreaView style={{ ...styles.container, backgroundColor: background }}>
				<ScrollView showsVerticalScrollIndicator={false}>
					{!loading ? (
						<View style={styles.profile}>
							{/* <TouchableOpacity> */}
							<View style={{ ...styles.photoWrapper, backgroundColor: backgroundSecondary }}>
								<Image style={styles.photo} source={{ uri: resize(user.photoURL, 300, 300) }} />
							</View>
							{/* </TouchableOpacity> */}
							<View style={styles.settings}>
								<View>
									<View style={styles.input}>
										<MyText text='Потребителско име' color={textSecondary} />
										<BigInput
											maxLength={20}
											style={{ marginVertical: pxH(5) }}
											value={newDisplayName}
											keyboardType='default'
											color={textTertiary}
											backgroundColor={inputColor}
											onChangeText={setNewDisplayName}
										/>
									</View>
									<View style={styles.input}>
										<MyText text='Описание' color={textSecondary} />
										<BigInput
											maxLength={200}
											placeholder='Описание на вас и вашия профил'
											multiline
											style={{ marginVertical: pxH(5), height: pxH(120), textAlignVertical: 'top' }}
											value={newBio}
											keyboardType='default'
											color={textTertiary}
											backgroundColor={inputColor}
											onChangeText={setNewBio}
										/>
									</View>
								</View>
								<View style={{ marginTop: 20 }}>
									<PrimaryButton
										onPress={updateDisplayName}
										bg={highlighted}
										borderColor={highlighted}
										text='Запази'
										textColor={background}
									/>
								</View>
								<View style={{ marginTop: pxH(30), alignItems: 'center' }}>
									<TouchableOpacity onPress={deleteProfile}>
										<MyText text='Изтриване на профил' color={textTertiary} />
									</TouchableOpacity>
								</View>
							</View>
						</View>
					) : (
						<Loader />
					)}
				</ScrollView>
				<Navigation navigation={navigation} currentScreen='Профил' />
			</SafeAreaView>
		</TouchableWithoutFeedback>
	)
}

ProfileSettings.propTypes = {
	navigation: PropTypes.shape({
		reset: PropTypes.func.isRequired,
		navigate: PropTypes.func.isRequired
	}).isRequired
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	input: {
		marginVertical: pxH(5)
	},
	photo: {
		borderRadius: pxH(70),
		height: pxH(140),
		position: 'relative',
		width: pxH(140)
	},
	photoWrapper: {
		alignItems: 'center',
		alignSelf: 'center',
		borderRadius: pxH(75),
		height: pxH(150),
		justifyContent: 'center',
		marginTop: pxH(30),
		width: pxH(150)
	},
	profile: {
		flex: 1,
		padding: pxH(20)
	},
	settings: {
		flex: 1,
		marginBottom: pxH(20),
		marginTop: pxH(40),
		paddingBottom: pxH(60)
	}
})
