import React from 'react'
import { TextInput } from 'react-native'
import PropTypes from 'prop-types'
import { pxH } from '@helpers'

export default function BigInput(props) {
	const {
		style,
		placeholder,
		keyboardType,
		onChangeText,
		value,
		multiline,
		backgroundColor,
		color,
		autoFocus,
		maxLength
	} = props
	return (
		<TextInput
			placeholderTextColor={color}
			style={{
				fontSize: pxH(16),
				fontFamily: 'FiraSans-Light',
				color,
				backgroundColor: backgroundColor || '#F2F2F2',
				borderRadius: pxH(20),
				padding: pxH(20),
				marginBottom: pxH(10),
				...style
			}}
			placeholder={placeholder}
			keyboardType={keyboardType}
			onChangeText={onChangeText}
			value={value}
			multiline={multiline || false}
			maxLength={maxLength || null}
			autoFocus={autoFocus || false}
		/>
	)
}

BigInput.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	style: PropTypes.object,
	placeholder: PropTypes.string,
	keyboardType: PropTypes.string,
	onChangeText: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	multiline: PropTypes.bool,
	backgroundColor: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	maxLength: PropTypes.number,
	autoFocus: PropTypes.bool
}

BigInput.defaultProps = {
	style: {},
	placeholder: '',
	keyboardType: 'default',
	multiline: false,
	maxLength: null,
	autoFocus: false
}
