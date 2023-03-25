import React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import PropTypers from 'prop-types'

export default function Popup({ popupPos, background, onClose, children, offsetX, offsetY }) {
	if (!popupPos) return null
	return (
		<TouchableWithoutFeedback onPress={onClose}>
			<View style={{ flex: 1, width: '100%', height: '100%', position: 'absolute', left: 0, top: 0 }}>
				<TouchableWithoutFeedback>
					<View
						style={{
							flex: 1,
							backgroundColor: background,
							borderRadius: 15,
							padding: 15,
							alignItems: 'center',
							justifyContent: 'center',
							position: 'absolute',
							top: popupPos.y - offsetY,
							left: popupPos.x > offsetX ? popupPos.x - offsetX : popupPos.x
						}}
					>
						{children}
					</View>
				</TouchableWithoutFeedback>
			</View>
		</TouchableWithoutFeedback>
	)
}

Popup.propTypes = {
	popupPos: PropTypers.shape({
		x: PropTypers.number.isRequired,
		y: PropTypers.number.isRequired
	}),
	background: PropTypers.string.isRequired,
	onClose: PropTypers.func.isRequired,
	children: PropTypers.func.isRequired,
	offsetX: PropTypers.number.isRequired,
	offsetY: PropTypers.number.isRequired
}

Popup.defaultProps = {
	popupPos: null
}
