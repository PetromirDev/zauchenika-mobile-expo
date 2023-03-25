import React from 'react'
import { Modal, ScrollView, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'
import { Send, X } from 'react-native-feather'
// Context
import { useAppContext } from '@context/AuthContext'
// Helpers
import { pxH } from '@helpers'
// Components
import BigInput from './BigInput'

export default function FullScreenModal({ onClose, onSubmit, value, onChangeText, visible }) {
	const { palette } = useAppContext()
	const { textTertiary, inputColor, highlighted, background } = palette
	return (
		<Modal visible={visible} animationType='slide'>
			<View style={{ flex: 1, backgroundColor: background }}>
				<View
					style={{
						backgroundColor: highlighted,
						padding: pxH(15),
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%'
					}}
				>
					<TouchableOpacity onPress={onClose}>
						<X width={pxH(25)} height={pxH(25)} stroke='#fff' />
					</TouchableOpacity>
					<TouchableOpacity onPress={onSubmit}>
						<Send width={pxH(22)} height={pxH(22)} stroke='#fff' opacity={value.length > 0 ? 1 : 0.5} />
					</TouchableOpacity>
				</View>
				<ScrollView style={{ padding: pxH(20), marginTop: pxH(60) }}>
					<BigInput
						autoFocus
						value={value}
						onChangeText={onChangeText}
						keyboardType='default'
						maxLength={500}
						placeholder='Вашето съобщение'
						backgroundColor={inputColor}
						color={textTertiary}
						multiline
					/>
				</ScrollView>
			</View>
		</Modal>
	)
}

FullScreenModal.propTypes = {
	onClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	onChangeText: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired
}
