import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
// Helpers
import { pxH } from '@helpers'

export default function PrimaryButton({ text, bg, textColor, borderColor, onPress, style, icon }) {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				backgroundColor: bg,
				padding: pxH(20),
				width: '100%',
				justifyContent: 'center',
				borderRadius: pxH(20),
				borderColor,
				borderWidth: 1,
				borderStyle: 'solid',
				...style
			}}
		>
			{icon}
			<Text
				style={{
					color: textColor,
					fontSize: pxH(16),
					fontFamily: 'FiraSans-Regular'
				}}
			>
				{text}
			</Text>
		</TouchableOpacity>
	)
}

PrimaryButton.propTypes = {
	text: PropTypes.string.isRequired,
	bg: PropTypes.string.isRequired,
	textColor: PropTypes.string.isRequired,
	borderColor: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
	icon: PropTypes.node,
	// eslint-disable-next-line react/forbid-prop-types
	style: PropTypes.object
}

PrimaryButton.defaultProps = {
	icon: null,
	style: {}
}
