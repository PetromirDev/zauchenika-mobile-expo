import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
// Context
import { useAppContext } from '@context/AuthContext'
// Hooks
import useFetchTasks from '@hooks/useFetchTasks'
// // Helpers
// import { setLocale } from '@helpers'
/* Components */
import { MyAgenda } from '@components/common'
import GroupHeader from './GroupHeader/GroupHeader'
import AboutGroup from './Tabs/About/AboutGroup'

export default function Group({ route, navigation }) {
	const { name, gid, image, members } = route.params
	const { user, palette } = useAppContext()
	const { tasks, isLoading, taskCount } = useFetchTasks({ lookFor: gid, lookAt: 'group', lookType: '==' })
	const { background, textSecondary, backgroundSecondary, textTertiary, highlighted } = palette
	const [menu, setMenu] = useState('tasks')
	/* About group */
	const [userEmails, setUserEmails] = useState(members)

	useEffect(() => {
		navigation.setOptions({ title: name })
	}, [name])

	return (
		<View style={{ flex: 1, backgroundColor: background }}>
			{/* Group header */}
			<GroupHeader
				menu={menu}
				setMenu={setMenu}
				taskCount={taskCount}
				backgroundSecondary={backgroundSecondary}
				highlighted={highlighted}
				textSecondary={textSecondary}
				textTertiary={textTertiary}
			/>
			{/* Tasks */}
			{menu === 'tasks' && (
				<View style={{ flex: 1 }}>
					<MyAgenda
						tasks={tasks}
						refreshing={isLoading}
						style={{
							borderTopColor: '#e3e3e3',
							borderTopWidth: 0.2,
							borderRadius: 0
						}}
					/>
				</View>
			)}
			{/* About group */}
			<View style={{ display: menu === 'about' ? 'flex' : 'none', flex: 1 }}>
				<AboutGroup
					userEmails={userEmails}
					setUserEmails={setUserEmails}
					groupData={route.params}
					user={user}
					image={image}
				/>
			</View>
		</View>
	)
}

Group.propTypes = {
	route: PropTypes.shape({
		params: PropTypes.shape({
			name: PropTypes.string.isRequired,
			gid: PropTypes.string.isRequired,
			image: PropTypes.string,
			members: PropTypes.arrayOf(PropTypes.string).isRequired
		}).isRequired
	}).isRequired,
	navigation: PropTypes.shape({
		setOptions: PropTypes.func.isRequired
	}).isRequired
}
