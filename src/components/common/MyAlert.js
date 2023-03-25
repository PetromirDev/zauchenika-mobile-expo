import { Alert } from 'react-native'

function MyAlert(title, text, onPress, onPressParams, onPressText, onCancel, onCancelParams, onCancelText) {
	Alert.alert(title, text, [
		{
			text: onCancelText,
			onPress: () => (onCancel ? onCancel(...onCancelParams) : null)
		},
		{
			text: onPressText,
			onPress: () => onPress(...onPressParams)
		}
	])
}

export default MyAlert
