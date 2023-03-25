import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { PlusCircle, RefreshCcw } from 'react-native-feather'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
// Hooks
import useFetchGroups from '@hooks/useFetchGroups'
// Context
import { useAppContext } from '@context/AuthContext'
/* Components */
import { MyText, Group } from '@components/common'
import { useNavigation } from '@react-navigation/native'

function LatestGroup({ email }) {
	const navigation = useNavigation()
	const {
		palette: { textPrimary, backgroundSecondary, textSecondary, background }
	} = useAppContext()
	const { groups, isLoading, refresh } = useFetchGroups({ email, limit: 1 })
	const latestGroup = groups[0]

	return (
		<View style={{ marginBottom: hp(1), marginTop: hp(2) }}>
			<View style={styles.headerWrapper}>
				<MyText
					styles={{ marginBottom: hp(1) }}
					text='Последна група'
					color={textPrimary}
					font='FiraSans-Medium'
					size={18}
				/>
				<TouchableOpacity onPress={refresh}>
					<RefreshCcw width={hp(2)} height={hp(2)} color={textPrimary} />
				</TouchableOpacity>
			</View>
			{isLoading ? (
				<View style={[styles.groupPlaceholder, { backgroundColor: backgroundSecondary }]}>
					<View style={[styles.groupPlaceholderIconWrapper, { backgroundColor: background }]} />
					<View style={styles.groupPlaceholderText}>
						<View style={{ width: '50%', height: 20, backgroundColor: background }} />
						<View style={{ width: '80%', height: 15, backgroundColor: background, marginTop: 5 }} />
					</View>
				</View>
			) : null}
			{!latestGroup && !isLoading ? (
				<TouchableOpacity onPress={() => navigation.navigate('Създай група')}>
					<View style={[styles.groupPlaceholder, { backgroundColor: backgroundSecondary }]}>
						<View style={[styles.groupPlaceholderIconWrapper, { backgroundColor: background }]}>
							<PlusCircle width={30} height={30} color={textSecondary} />
						</View>
						<View style={styles.groupPlaceholderText}>
							<MyText text='Споделяй задачи' color={textPrimary} size={18} />
							<MyText text='Натисни тук, за да създадеш своя собствена група' color={textSecondary} size={14} />
						</View>
					</View>
				</TouchableOpacity>
			) : null}
			{latestGroup && !isLoading ? (
				<Group
					groupName={latestGroup.name}
					groupDescription={latestGroup.description}
					groupImage={latestGroup.image}
					gid={latestGroup.gid}
					owner={latestGroup.owner}
					members={latestGroup.users}
				/>
			) : null}
		</View>
	)
}

export default LatestGroup

LatestGroup.propTypes = {
	email: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
	groupPlaceholder: {
		borderRadius: 15,
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 7,
		padding: 10
	},
	groupPlaceholderIconWrapper: {
		alignItems: 'center',
		borderRadius: 15,
		height: hp(12.5),
		justifyContent: 'center',
		padding: hp(1),
		width: hp(14)
	},
	groupPlaceholderText: {
		flex: 1,
		marginLeft: 10
	},
	headerWrapper: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
})
