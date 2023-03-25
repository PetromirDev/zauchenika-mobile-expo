import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableOpacity, Switch } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ArrowRight } from 'react-native-feather'
// Context
import { useAppContext } from '@context/AuthContext'
// Helpers
import { pxH } from '@helpers'
// Components
import { MyText } from '@components/common'

function Setting({ onPress, text, children, isDarkModeSwitch }) {
	const navigation = useNavigation()
	const { darkMode, setDarkMode, palette } = useAppContext()
	const { textPrimary, textSecondary, background } = palette

	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.setting}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center'
					}}
				>
					{children}
					<MyText styles={{ marginLeft: pxH(15) }} text={text} color={textSecondary} size={16} font='FiraSans-Medium' />
				</View>
				{!isDarkModeSwitch ? (
					<View
						style={{
							padding: pxH(15),
							borderRadius: pxH(8),
							backgroundColor: background,
							justifyContent: 'center',
							alignItems: 'center',
							marginLeft: 'auto'
						}}
					>
						<ArrowRight width={pxH(15)} height={pxH(15)} stroke={textPrimary} />
					</View>
				) : (
					<Switch
						style={{
							marginLeft: 'auto',
							transform: [{ scaleX: pxH(1.6) }, { scaleY: pxH(1.6) }]
						}}
						trackColor={{ false: '#7F7F7F', true: '#4E4E4E' }}
						thumbColor={darkMode ? '#fff' : '#fff'}
						ios_backgroundColor='#f4f3f4'
						onValueChange={() => {
							setDarkMode((prev) => !prev)
							navigation.reset({ index: 0, routes: [{ name: 'Профил' }] })
						}}
						value={darkMode}
					/>
				)}
			</View>
		</TouchableOpacity>
	)
}

Setting.propTypes = {
	onPress: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	isDarkModeSwitch: PropTypes.bool
}

Setting.defaultProps = {
	isDarkModeSwitch: false
}

export default Setting

const styles = StyleSheet.create({
	setting: {
		alignItems: 'center',
		flexDirection: 'row',
		paddingVertical: pxH(15)
	}
})
