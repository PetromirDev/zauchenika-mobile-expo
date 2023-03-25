import React from 'react'
import PropTypes from 'prop-types'
import { Modal, TouchableWithoutFeedback, View, Image } from 'react-native'
// Context
import { useAppContext } from '@context/AuthContext'
// Helpers
import { resize, pxH } from '@helpers'
// Components
import { MyText } from '@components/common'

export default function UserInfo({ onClose, userData }) {
	const visible = !!userData
	const { palette } = useAppContext()
	const { textPrimary, textSecondary, background, textTertiary } = palette

	if (!userData) return null

	const { displayName, email, photoURL, bio } = userData
	return (
		<>
			<View
				style={[
					{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						backgroundColor: 'rgba(0,0,0,0.5)',
						zIndex: -1,
						opacity: 0,
						transition: 'all 0.3s ease',
						pointerEvents: 'none'
					},
					visible ? { opacity: 1, pointerEvents: 'auto', zIndex: 5 } : null
				]}
			/>
			<Modal animationType='slide' transparent visible={visible}>
				<TouchableWithoutFeedback onPress={onClose}>
					<View
						style={{
							flex: 1,
							justifyContent: 'flex-end',
							alignItems: 'center'
						}}
					>
						<TouchableWithoutFeedback>
							<View
								style={{
									backgroundColor: background,
									width: '100%',
									padding: pxH(40),
									alignItems: 'center'
								}}
							>
								<View
									style={{
										padding: pxH(4),
										backgroundColor: background,
										borderRadius: pxH(50),
										marginTop: pxH(-70)
									}}
								>
									<Image
										source={{ uri: resize(photoURL, 500, 500) }}
										style={{ width: pxH(100), height: pxH(100), borderRadius: pxH(50) }}
									/>
								</View>
								<MyText
									text={displayName}
									color={textPrimary}
									font='FiraSans-Medium'
									size={24}
									styles={{ marginTop: 10 }}
								/>
								<MyText text={email} color={textTertiary} font='FiraSans-Regular' size={16} styles={{ marginTop: 0 }} />
								{bio ? (
									<MyText
										text={bio}
										color={textSecondary}
										size={16}
										styles={{ marginTop: pxH(20), textAlign: 'center' }}
									/>
								) : null}
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</>
	)
}

UserInfo.propTypes = {
	onClose: PropTypes.func.isRequired,
	userData: PropTypes.shape({
		displayName: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		photoURL: PropTypes.string.isRequired,
		bio: PropTypes.string
	}).isRequired
}
