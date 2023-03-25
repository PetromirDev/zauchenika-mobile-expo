import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
// Context
import { useAppContext } from '@context/AuthContext'
// Helpers
import { changeURL, pxH } from '@helpers'
/* Components */
import { MyText } from '@components/common'

const image = 'https://zauchenikabg.live/images/group.jpg'

function Group({ group, setSelectedGroup, selectedGroup }) {
	const { palette } = useAppContext()
	const { backgroundSecondary, textSecondary, inputColor } = palette

	return (
		<TouchableOpacity key={group.gid} onPress={() => setSelectedGroup({ name: group.name, gid: group.gid })}>
			<View
				style={[
					styles.group,
					{
						backgroundColor: selectedGroup.gid === group.gid ? inputColor : backgroundSecondary
					}
				]}
			>
				<Image source={{ uri: changeURL(group.image) || image }} style={styles.image} />
				<MyText font='FiraSans-Medium' size={16} text={group.name} color={textSecondary} />
			</View>
		</TouchableOpacity>
	)
}

export default Group

Group.propTypes = {
	group: PropTypes.shape({
		gid: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		image: PropTypes.string
	}).isRequired,
	setSelectedGroup: PropTypes.func.isRequired,
	selectedGroup: PropTypes.shape({
		gid: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired
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
