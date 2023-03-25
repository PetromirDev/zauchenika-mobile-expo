import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, Pressable } from 'react-native'
// Context
import { useAppContext } from '@context/AuthContext'
// Helpers
import { resize, pxH } from '@helpers'
/* Components */
import { MyText } from '@components/common'

function User({ email, currentEmail, owner, displayName, photoURL, onPress, showPopup }) {
	const {
		palette: { textPrimary, textSecondary }
	} = useAppContext()

	return (
		<Pressable
			onLongPress={(e) => (currentEmail === owner ? showPopup(e.nativeEvent, email) : null)}
			onPress={onPress}
			style={({ pressed }) => [
				{ opacity: pressed ? 0.3 : 1.0, flexDirection: 'row', marginTop: 15, position: 'relative' }
			]}
		>
			<Image
				source={{ uri: resize(photoURL, 200, 200) }}
				style={{ width: pxH(40), height: pxH(40), borderRadius: pxH(20) }}
			/>
			<View style={{ marginLeft: pxH(10) }}>
				<MyText
					text={`${displayName} - ${email === owner ? 'Администратор' : 'Участник'} ${
						email === currentEmail ? '(Аз)' : ''
					}`}
					color={textPrimary}
					font='FiraSans-Bold'
					size={16}
				/>
				<MyText text={`${email}`} color={textSecondary} font='FiraSans-Regular' size={14} />
			</View>
		</Pressable>
	)
}

User.propTypes = {
	email: PropTypes.string.isRequired,
	currentEmail: PropTypes.string.isRequired,
	owner: PropTypes.string.isRequired,
	displayName: PropTypes.string.isRequired,
	photoURL: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
	showPopup: PropTypes.func.isRequired
}

export default User
