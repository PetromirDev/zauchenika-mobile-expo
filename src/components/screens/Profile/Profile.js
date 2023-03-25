import React from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { User, LogOut, Moon, Sun, HelpCircle } from 'react-native-feather'
// Context
import { useAppContext, LogOutF } from '@context/AuthContext'
// Helpers
import { pxH, resize } from '@helpers'
/* Components */
import { MyText, MyAlert } from '@components/common'
import Navigation from '@components/layout/Navigation/Navigation'
import FullBanner from '@components/ads/FullBanner'
import Setting from './Setting/Setting'

const handleLogOut = () => {
	MyAlert('Сигурни ли сте, че искате да излезете?', '', LogOutF, [], 'Изход', null, [], 'Отказ')
}

const iconSize = pxH(30)

export default function Profile({ navigation }) {
	const { user, darkMode, setDarkMode, palette } = useAppContext()
	const { textPrimary, textSecondary, textTertiary, background, backgroundSecondary } = palette
	const { photoURL, displayName, email } = user

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: background }]}>
			<ScrollView style={{ flex: 1 }}>
				<View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
					<FullBanner id='ca-app-pub-1800635395568659/8032813395' personalized />
				</View>
				<TouchableOpacity onPress={() => navigation.navigate('Настройки профил', { uid: user.uid })}>
					<View style={styles.profileData}>
						<Image
							style={styles.photo}
							source={{
								uri: resize(photoURL, 300, 300)
							}}
						/>
						<View style={styles.userData}>
							<MyText text={displayName} color={textPrimary} size={20} font='FiraSans-Medium' />
							<MyText text={email} color={textSecondary} size={14} />
						</View>
					</View>
				</TouchableOpacity>

				<View style={{ ...styles.settings, backgroundColor: backgroundSecondary }}>
					<View style={{ marginBottom: pxH(40) }}>
						<MyText
							text='Профил'
							color={textPrimary}
							size={24}
							font='FiraSans-Medium'
							styles={{ marginBottom: pxH(10) }}
						/>
						<Setting onPress={() => navigation.navigate('Настройки профил', { uid: user.uid })} text='Настройки профил'>
							<User width={iconSize} height={iconSize} stroke={textSecondary} />
						</Setting>
					</View>
					<MyText
						text='Настройки'
						color={textPrimary}
						size={24}
						font='FiraSans-Medium'
						styles={{ marginBottom: pxH(10) }}
					/>
					<Setting
						onPress={() => {
							setDarkMode((prev) => !prev)
							navigation.reset({ index: 0, routes: [{ name: 'Профил' }] })
						}}
						text='Тъмен режим'
						isDarkModeSwitch
					>
						{darkMode ? (
							<Moon width={iconSize} height={iconSize} stroke={textSecondary} />
						) : (
							<Sun width={iconSize} height={iconSize} stroke={textSecondary} />
						)}
					</Setting>
					<Setting onPress={() => navigation.navigate('Често задавани въпроси')} text='Често задавани въпроси'>
						<HelpCircle width={iconSize} height={iconSize} stroke={textSecondary} />
					</Setting>
					<View style={{ marginTop: iconSize }}>
						<Setting onPress={handleLogOut} text='Изход'>
							<LogOut width={iconSize} height={iconSize} stroke={textSecondary} />
						</Setting>
					</View>
					<MyText
						size={12}
						color={textTertiary}
						text='Версия на приложението: 1.0.0'
						styles={{ marginTop: pxH(40), marginBottom: pxH(70), alignSelf: 'center' }}
					/>
				</View>
			</ScrollView>
			<Navigation navigation={navigation} currentScreen='Профил' />
		</SafeAreaView>
	)
}

Profile.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
		reset: PropTypes.func.isRequired
	}).isRequired
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	photo: {
		borderRadius: pxH(65),
		height: pxH(65),
		width: pxH(65)
	},
	profileData: {
		alignItems: 'center',
		flexDirection: 'row',
		padding: pxH(20)
	},
	settings: {
		flex: 1,
		marginTop: pxH(10),
		padding: pxH(20)
	},
	userData: {
		marginLeft: pxH(20)
	}
})
