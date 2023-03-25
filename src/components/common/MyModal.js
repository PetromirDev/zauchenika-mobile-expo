import React from 'react'
import { Modal, View, Pressable, TouchableWithoutFeedback } from 'react-native'
import { X } from 'react-native-feather'
import PropTypes from 'prop-types'
// Context
import { useAppContext } from '@context/AuthContext'
// Helpers
import { pxH, pxW } from '@helpers'
// Components
import MyText from './MyText'
import PrimaryButton from './PrimaryButton'

export default function MyModal({ onPress, onClose, visible, title, buttonText, children }) {
	const { palette } = useAppContext()
	const { textSecondary, background, highlighted, textPrimary } = palette

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
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<TouchableWithoutFeedback>
							<View
								style={{
									backgroundColor: background,
									padding: pxH(20),
									marginVertical: 'auto',
									width: '100%',
									maxWidth: pxW(340),
									borderRadius: pxH(15)
								}}
							>
								<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: pxH(30) }}>
									<MyText
										text={title}
										font='FiraSans-Medium'
										color={textPrimary}
										size={20}
										styles={{ marginLeft: 'auto' }}
									/>
									<Pressable onPress={onClose} style={{ marginLeft: 'auto' }}>
										<X width={25} height={25} stroke={textSecondary} />
									</Pressable>
								</View>
								{children}
								<View style={{ marginTop: 10 }}>
									<PrimaryButton
										bg={highlighted}
										textColor={background}
										borderColor={highlighted}
										text={buttonText}
										onPress={onPress}
									/>
								</View>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</>
	)
}

MyModal.propTypes = {
	onPress: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	buttonText: PropTypes.string.isRequired
}
