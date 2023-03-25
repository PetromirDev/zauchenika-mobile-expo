import React from 'react'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import MyText from './MyText'

export default function PopupItem({ onPress, text, textColor, style }) {
	return (
		<TouchableOpacity onPress={onPress}>
			<MyText text={text} color={textColor} styles={{ ...style }} />
		</TouchableOpacity>
	)
}

PopupItem.propTypes = {
	onPress: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
	textColor: PropTypes.string.isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	style: PropTypes.object
}

PopupItem.defaultProps = {
	style: {}
}
