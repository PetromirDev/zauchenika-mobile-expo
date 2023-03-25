import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { node } from 'prop-types'
// import auth from '@react-native-firebase/auth'
import { deleteUser, onAuthStateChanged, signOut } from 'firebase/auth'
// import MMKVStorage, { useMMKVStorage } from 'react-native-mmkv-storage'
import NetInfo from '@react-native-community/netinfo'
import { ActivityIndicator, View } from 'react-native'
import { WifiOff } from 'react-native-feather'
// Helpers
import { pxH } from '@helpers'
import { dark, light } from '@constants/pallete'
// Components
import MyText from '../components/common/MyText'
import { auth } from '../../firebaseConfig'

const AppContext = createContext()

export const LogOutF = () => signOut(auth)

export const handleDeleteProfile = () => {
	deleteUser(auth.currentUser).catch((err) => {
		if (err.code === 'auth/requires-recent-login') {
			alert('Моля излезте и влезте отново, за да изтриете профила си.')
		} else {
			alert('Грешка!', 'Моля опитайте отново.')
		}
	})
}

// const localStorage = new MMKVStorage.Loader().initialize()

export default function AuthContextProvider({ children }) {
	const [user, setUser] = useState()
	const [initializing, setInitializing] = useState(true)
	const [darkMode, setDarkMode] = useState(false)
	// const [darkMode, setDarkMode] = useMMKVStorage('darkMode', localStorage, false)
	const palette = darkMode ? dark : light
	const [isConnected, setIsConnected] = useState(true)

	useEffect(() => {
		const authSubscriber = onAuthStateChanged(auth, (newUser) => {
			setInitializing(true)
			setUser(newUser)
			if (initializing) {
				setInitializing(false)
			}
		})
		const netinfoSubscriber = NetInfo.addEventListener((state) => {
			setIsConnected(state.isConnected)
		})
		return () => {
			authSubscriber()
			netinfoSubscriber()
		}
	}, [])

	const value = useMemo(
		() => ({ user, initializing, darkMode, setDarkMode, palette }),
		[user, initializing, darkMode, setDarkMode, palette]
	)

	return !initializing ? (
		<AppContext.Provider value={value}>
			{!isConnected ? (
				<View
					style={{
						alignItems: 'center',
						flexDirection: 'row',
						backgroundColor: '#CC3131',
						zIndex: 10,
						padding: pxH(10)
					}}
				>
					<WifiOff width={pxH(20)} height={pxH(20)} stroke='#fff' />
					<MyText
						color='#fff'
						font='FiraSans-Medium'
						size={12}
						text='Кой заключи интернета в килера, защото нямате връзка?'
						styles={{ marginLeft: pxH(10) }}
					/>
				</View>
			) : null}
			{children}
		</AppContext.Provider>
	) : (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				backgroundColor: palette?.background
			}}
		>
			<ActivityIndicator size='large' color={palette?.textSecondary} />
		</View>
	)
}

AuthContextProvider.propTypes = {
	children: node.isRequired
}

export function useAppContext() {
	return useContext(AppContext)
}
