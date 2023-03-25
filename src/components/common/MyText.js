import React from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import { pxH } from '@helpers'

export default function MyText(props) {
	const { size, color, text, font, styles } = props
	return (
		<Text
			style={{
				fontSize: pxH(size),
				color,
				margin: 0,
				fontFamily: font,
				...styles
			}}
		>
			{text}
		</Text>
	)
}

MyText.propTypes = {
	size: PropTypes.number,
	color: PropTypes.string,
	text: PropTypes.string.isRequired,
	font: PropTypes.string,
	// eslint-disable-next-line react/forbid-prop-types
	styles: PropTypes.object
}

MyText.defaultProps = {
	size: 16,
	color: '#000',
	font: 'FiraSans-Regular',
	styles: {}
}
