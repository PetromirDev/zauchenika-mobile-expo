import React, { useEffect } from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { StyleSheet, View, TouchableOpacity, Modal, ScrollView, Image } from 'react-native'
import PropTypes from 'prop-types'
// Context
import { useAppContext } from '@context/AuthContext'
// Hooks
import useFetchGroups from '@hooks/useFetchGroups'
// Helpers
import { pxH } from '@helpers'
/* Components */
import { MyText } from '@components/common'
import Group from './Group/Group'

function ChooseGroupModal({
	setSelectedGroup,
	setIsSelectGroupModalVisible,
	selectedGroup,
	isSelectGroupModalVisible
}) {
	const { user, palette } = useAppContext()
	const { groups: myGroups, isLoading } = useFetchGroups({ email: user.email })
	const { textPrimary, background, backgroundSecondary, textSecondary, inputColor } = palette

	// Hide group picker when we pick a group
	useEffect(() => {
		let isMounted = true
		if (isMounted) {
			setIsSelectGroupModalVisible(false)
		}
		return () => {
			isMounted = false
		}
	}, [selectedGroup])

	return (
		<Modal
			animationType='slide'
			transparent
			visible={isSelectGroupModalVisible}
			onRequestClose={() => setIsSelectGroupModalVisible(false)}
		>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<View
					style={{
						backgroundColor: background,
						borderRadius: pxH(20),
						paddingTop: pxH(40),
						flex: 1,
						width: '100%',
						padding: pxH(20)
					}}
				>
					<MyText
						font='FiraSans-Medium'
						size={22}
						styles={{ textAlign: 'center', padding: pxH(20), marginBottom: pxH(20) }}
						text='Изберете с кого ще бъде споделена задачата'
						color={textPrimary}
					/>
					<ScrollView style={{ marginTop: pxH(30), flex: 1, width: '100%' }}>
						<TouchableOpacity onPress={() => setSelectedGroup({ name: 'Само с мен', gid: user.uid })}>
							<View
								style={[
									styles.group,
									{
										borderRadius: pxH(20),
										backgroundColor: selectedGroup.gid === user.uid ? inputColor : backgroundSecondary
									}
								]}
							>
								<Image source={{ uri: user.photoURL }} style={styles.image} />
								<MyText font='FiraSans-Medium' size={16} text='Само с мен' color={textSecondary} />
							</View>
						</TouchableOpacity>
						{!isLoading && myGroups.length > 0
							? myGroups.map((group) => (
									<Group
										key={group.gid}
										group={group}
										setSelectedGroup={setSelectedGroup}
										selectedGroup={selectedGroup}
									/>
							  ))
							: null}
					</ScrollView>
				</View>
			</View>
		</Modal>
	)
}

export default ChooseGroupModal

ChooseGroupModal.propTypes = {
	selectedGroup: PropTypes.shape({
		gid: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired,
	setSelectedGroup: PropTypes.func.isRequired,
	isSelectGroupModalVisible: PropTypes.bool.isRequired,
	setIsSelectGroupModalVisible: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	group: {
		alignItems: 'center',
		borderRadius: pxH(15),
		flexDirection: 'row',
		marginBottom: pxH(15),
		padding: pxH(10),
		width: '100%'
	},
	image: {
		borderRadius: hp(1.8),
		height: hp(6.2),
		marginRight: hp(1.3),
		width: hp(6.2)
	}
})
