import React from 'react'
import { TouchableOpacity, View, StyleSheet, TouchableWithoutFeedback, Modal } from 'react-native'
import PropTypes from 'prop-types'
import { User, Users, PlusCircle, Home, Plus } from 'react-native-feather'
// Context
import { useAppContext } from '@context/AuthContext'
// Helpers
import { pxH } from '@helpers'
// Components
import { MyText } from '@components/common'

const iconSize = pxH(25)
const textSize = 13
const largeIconSize = pxH(35)
const largeMenuText = 16
const menuText = 14

export default function Navigation({ navigation, currentScreen }) {
	const [menu, setMenu] = React.useState(false)
	const { palette } = useAppContext()
	const { textPrimary, textSecondary, textTertiary, highlighted, backgroundSecondary, background } = palette

	const navigate = (screen) => {
		navigation.navigate(screen)
		setMenu(false)
	}

	return (
		<>
			<View
				style={[
					styles.navigation,
					{
						backgroundColor: backgroundSecondary,
						borderTopWidth: 0.5,
						borderTopColor: textTertiary
					}
				]}
			>
				<View style={styles.inner}>
					<TouchableOpacity onPress={() => navigation.navigate('Начало')}>
						<View style={{ alignItems: 'center' }}>
							<Home
								stroke={currentScreen !== 'Начало' ? textTertiary : highlighted}
								width={iconSize}
								height={iconSize}
							/>
							<MyText text='Начало' size={textSize} color={currentScreen !== 'Начало' ? textTertiary : highlighted} />
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate('Групи')}>
						<View style={{ alignItems: 'center' }}>
							<Users
								stroke={currentScreen !== 'Групи' ? textTertiary : highlighted}
								width={iconSize}
								height={iconSize}
							/>
							<MyText text='Групи' size={textSize} color={currentScreen !== 'Групи' ? textTertiary : highlighted} />
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setMenu(true)}>
						<View style={{ alignItems: 'center' }}>
							<PlusCircle stroke={textTertiary} width={iconSize} height={iconSize} />
							<MyText text='Създай' size={textSize} color={textTertiary} />
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate('Профил')}>
						<View style={{ alignItems: 'center' }}>
							<User
								stroke={currentScreen !== 'Профил' ? textTertiary : highlighted}
								width={iconSize}
								height={iconSize}
							/>
							<MyText text='Профил' size={textSize} color={currentScreen !== 'Профил' ? textTertiary : highlighted} />
						</View>
					</TouchableOpacity>
				</View>
			</View>
			<View style={[styles.background, menu ? styles.backgroundVisible : null]} />
			<Modal animationType='slide' transparent visible={menu} onRequestClose={() => setMenu(false)}>
				<TouchableWithoutFeedback onPress={() => setMenu(false)}>
					<View
						style={{
							flex: 1,
							justifyContent: 'flex-end'
						}}
					>
						<TouchableWithoutFeedback>
							<View style={[styles.menu, { backgroundColor: background }]}>
								<TouchableOpacity onPress={() => navigate('Създай задача')}>
									<View style={styles.menuItem}>
										<Plus stroke={textPrimary} width={largeIconSize} height={largeIconSize} />
										<View style={styles.menuItemRight}>
											<MyText text='Създай задача' font='FiraSans-Medium' color={textPrimary} size={largeMenuText} />
											<MyText
												text='Създай групова или самостоятелна задача'
												font='FiraSans-Regular'
												styles={{ width: '90%' }}
												color={textSecondary}
												size={menuText}
											/>
										</View>
									</View>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => navigate('Създай група')}>
									<View style={styles.menuItem}>
										<Users stroke={textPrimary} width={largeIconSize} height={largeIconSize} />
										<View style={styles.menuItemRight}>
											<MyText text='Създай група' font='FiraSans-Medium' color={textPrimary} size={largeMenuText} />
											<MyText
												text='Създай група и покани хора'
												font='FiraSans-Regular'
												color={textSecondary}
												size={menuText}
											/>
										</View>
									</View>
								</TouchableOpacity>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</>
	)
}

Navigation.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired
	}).isRequired,
	currentScreen: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
	background: {
		backgroundColor: 'rgba(0,0,0,0.5)',
		height: '100%',
		left: 0,
		opacity: 0,
		pointerEvents: 'none',
		position: 'absolute',
		top: 0,
		transition: 'all 0.3s ease',
		width: '100%',
		zIndex: -1
	},
	backgroundVisible: {
		opacity: 1,
		pointerEvents: 'auto',
		zIndex: 5
	},
	inner: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%'
	},
	menu: {
		alignItems: 'flex-start',
		borderTopLeftRadius: pxH(20),
		borderTopRightRadius: pxH(20),
		justifyContent: 'center',
		padding: pxH(15),
		width: '100%'
	},
	menuItem: {
		alignItems: 'center',
		flexDirection: 'row',
		padding: pxH(15)
	},
	menuItemRight: {
		marginLeft: pxH(20)
	},
	navigation: {
		alignItems: 'center',
		bottom: 0,
		flexDirection: 'row',
		justifyContent: 'center',
		left: 0,
		padding: pxH(15),
		position: 'absolute',
		width: '100%',
		zIndex: 10
	}
})
