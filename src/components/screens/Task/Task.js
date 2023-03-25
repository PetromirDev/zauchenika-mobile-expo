import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
// Context
import { useAppContext } from '@context/AuthContext'
// Helpers
import { pxH } from '@helpers'
// Components
import TaskBody from './TaskBody/TaskBody'
import TaskManage from './TaskManage/TaskManage'

export default function Task({ route, navigation }) {
	const { user, palette } = useAppContext()
	const { background } = palette
	const { email } = user
	const { title, description, users, date, doneBy, tid } = route.params

	useEffect(() => {
		navigation.setOptions({ title })
	}, [navigation, title])

	return (
		<View
			style={{
				...styles.container,
				backgroundColor: background
			}}
		>
			<TaskBody
				title={title}
				description={description}
				users={users}
				date={date}
				doneBy={doneBy}
				tid={tid}
				email={email}
			/>
			<TaskManage tid={tid} users={users} email={email} />
		</View>
	)
}

Task.propTypes = {
	route: PropTypes.shape({
		params: PropTypes.shape({
			title: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			users: PropTypes.arrayOf(PropTypes.string).isRequired,
			date: PropTypes.shape({
				seconds: PropTypes.number.isRequired,
				nanoseconds: PropTypes.number.isRequired
			}).isRequired,
			doneBy: PropTypes.arrayOf(PropTypes.string).isRequired,
			tid: PropTypes.string.isRequired
		})
	}).isRequired,
	navigation: PropTypes.shape({
		setOptions: PropTypes.func.isRequired
	}).isRequired
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: pxH(20)
	}
})
