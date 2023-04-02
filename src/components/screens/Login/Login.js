import React, { useEffect } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { makeRedirectUri } from 'expo-auth-session'
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
// Authentication
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
// Helpers
import { useAppContext } from '@context/AuthContext'
import { pxH } from '@helpers'
// Components
import { MyText, PrimaryButton } from '@components/common'
// Images
import TopLeftImage from './images/topLeft.png'
import TopLeftImage2 from './images/topLeft2.png'
import TopRightImage from './images/topRight.png'
import WaveImage from './images/wave.png'
import LoginImage from './images/login2.svg'
import GoogleImage from './images/google.png'
import { auth } from '../../../../firebaseConfig'

WebBrowser.maybeCompleteAuthSession()

export default function Login() {
	const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
		androidClientId: '493922924089-f5ntifovb9nk4p46kh3corevip804ndn.apps.googleusercontent.com',
		iosClientId: 'rando',
		scopes: ['profile', 'email'],
		redirectUri: makeRedirectUri({
			scheme: 'com.petromirdev.zauchenika'
		}),
		behavior: 'web',
		clientId: '493922924089-f5ntifovb9nk4p46kh3corevip804ndn.apps.googleusercontent.com',
		expoClientId: '493922924089-f5ntifovb9nk4p46kh3corevip804ndn.apps.googleusercontent.com'
	})

	const {
		user,
		palette: { highlighted }
	} = useAppContext()

	useEffect(() => {
		if (response?.type === 'success') {
			const credential = GoogleAuthProvider.credential(
				response.authentication.idToken,
				response.authentication.accessToken
			)
			signInWithCredential(auth, credential)
		}
	}, [response])

	return !user ? (
		<View style={styles.container}>
			<Image source={TopLeftImage} style={styles.topLeft} />
			<Image source={TopLeftImage2} style={styles.topLeft2} />
			<Image source={TopRightImage} style={styles.topRight} />
			<Image source={WaveImage} style={styles.wave} />
			<LoginImage width={pxH(260)} height={pxH(180)} style={[styles.loginImage, { color: highlighted }]} />
			<View style={styles.login}>
				<View style={styles.welcomeMessage}>
					<MyText styles={{ marginTop: pxH(10) }} size={36} color='#212736' font='FiraSans-Bold' text='ЗаУченика' />
					<MyText
						styles={{ opacity: 0.38, marginBottom: pxH(30) }}
						font='FiraSans-Medium'
						color='#212736'
						size={14}
						text='Добре дошъл в ЗаУченика, ще ти хареса!'
					/>
				</View>
				<PrimaryButton
					disabled={!request}
					onPress={() => promptAsync()}
					icon={
						<Image
							style={{
								marginRight: pxH(10),
								width: pxH(30),
								height: pxH(30)
							}}
							source={GoogleImage}
						/>
					}
					bg='#F7F7F7'
					borderColor='#ABADB3'
					text='Вход с Google'
					textColor='#212736'
					style={{ marginTop: pxH(15) }}
				/>
			</View>
		</View>
	) : null
}
const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: 'white',
		flex: 1,
		justifyContent: 'center'
	},
	login: {
		padding: 10,
		width: '100%'
	},
	loginImage: {
		marginTop: hp(5)
	},
	topLeft: {
		height: hp(18),
		left: 0,
		position: 'absolute',
		top: 0,
		width: hp(12),
		zIndex: 2
	},
	topLeft2: {
		height: hp(8.2),
		left: 0,
		position: 'absolute',
		top: 0,
		width: hp(21.5),
		zIndex: 1
	},
	topRight: {
		height: hp(16),
		position: 'absolute',
		right: 0,
		top: 0,
		width: hp(14)
	},
	wave: {
		bottom: 0,
		height: hp(11),
		left: 0,
		position: 'absolute',
		width: '100%'
	},
	welcomeMessage: {
		alignItems: 'center',
		marginBottom: hp(1.5),
		marginTop: 0
	}
})
