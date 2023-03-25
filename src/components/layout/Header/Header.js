import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { MyText } from '@components/common'
import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'
// Context
import { useAppContext } from '@context/AuthContext'
// Helpers
import { pxH } from '@helpers'

export default function Header(props) {
	const {
		palette: { highlighted, textPrimary }
	} = useAppContext()
	const navigation = useNavigation()
	const { headerPrimary, headerText, photoURL } = props

	return (
		<View style={styles.header}>
			<View>
				<MyText text={headerPrimary} color={textPrimary} font='FiraSans-Medium' size={20} />
				<MyText text={headerText} color={highlighted} font='FiraSans-Medium' size={16} />
			</View>
			<TouchableOpacity onPress={() => navigation.navigate('Профил')}>
				<Image style={styles.userPFP} source={{ uri: photoURL }} />
			</TouchableOpacity>
		</View>
	)
}

Header.propTypes = {
	headerPrimary: PropTypes.string.isRequired,
	headerText: PropTypes.string.isRequired,
	photoURL: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	userPFP: {
		borderRadius: pxH(50),
		height: pxH(50),
		width: pxH(50)
	}
})
