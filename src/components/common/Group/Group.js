import React from 'react'
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'
// Context
import { useAppContext } from '@context/AuthContext'
// Components
import FALLBACK_IMAGE from '@images/logo.png'
// Images
import MyText from '../MyText'

export default function Group({ groupName, groupImage, gid, groupDescription, members, owner }) {
	const groupImageSrc = groupImage ? { uri: groupImage } : FALLBACK_IMAGE
	const { palette } = useAppContext()
	const { backgroundSecondary, textPrimary, textSecondary } = palette
	const navigation = useNavigation()

	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate('Група', {
					name: groupName,
					gid,
					image: groupImageSrc,
					description: groupDescription,
					owner,
					members
				})
			}
		>
			<View style={[styles.groupContent, { backgroundColor: backgroundSecondary }]}>
				<View style={{ ...styles.imageWrapper, backgroundColor: palette.background }}>
					<Image style={styles.image} source={groupImageSrc} />
				</View>
				<View style={styles.groupRight}>
					<View style={styles.groupRightTop}>
						<MyText size={18} color={textPrimary} text={groupName} font='FiraSans-Medium' />
					</View>
					<MyText style={{ flex: 1, marginBottom: 10 }} size={14} color={textSecondary} text={groupDescription} />
				</View>
			</View>
		</TouchableOpacity>
	)
}

Group.propTypes = {
	groupName: PropTypes.string.isRequired,
	groupImage: PropTypes.string,
	gid: PropTypes.string.isRequired,
	groupDescription: PropTypes.string,
	members: PropTypes.arrayOf(PropTypes.string).isRequired,
	owner: PropTypes.string.isRequired
}

Group.defaultProps = {
	groupImage: '',
	groupDescription: ''
}

const styles = StyleSheet.create({
	groupContent: {
		borderRadius: 15,
		flexDirection: 'row',
		marginBottom: 7,
		padding: 10
	},
	groupRight: {
		flex: 1,
		justifyContent: 'flex-start',
		marginLeft: 15
	},
	image: {
		borderRadius: 15,
		height: '100%',
		width: '100%'
	},
	imageWrapper: {
		borderRadius: 15,
		height: hp(12.5),
		padding: hp(1),
		width: hp(14)
	}
})
