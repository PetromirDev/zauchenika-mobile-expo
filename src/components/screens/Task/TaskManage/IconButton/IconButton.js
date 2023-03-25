import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { node, bool, func } from 'prop-types'
// Helpers
import { pxH } from '@helpers/pixelsToDP'
// Context
import { useAppContext } from '@context/AuthContext'

function IconButton({ children, primary, onPress }) {
	const {
		palette: { textPrimary }
	} = useAppContext()

	return (
		<TouchableOpacity onPress={onPress}>
			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					padding: pxH(20),
					borderRadius: pxH(40),
					backgroundColor: primary ? '#3E82DC' : textPrimary,
					marginHorizontal: pxH(20)
				}}
			>
				{children}
			</View>
		</TouchableOpacity>
	)
}

IconButton.propTypes = {
	children: node.isRequired,
	primary: bool,
	onPress: func.isRequired
}

IconButton.defaultProps = {
	primary: false
}

export default IconButton
