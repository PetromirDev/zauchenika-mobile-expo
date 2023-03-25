import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, FlatList } from 'react-native'
import { Clock } from 'react-native-feather'
// Context
import { useAppContext } from '@context/AuthContext'
// Helpers
import { pxH } from '@helpers'
// Components
import { MyText } from '@components/common'
// Images
import TaskEmptyImage from './images/task-empty.svg'

function TaskBody({ doneBy, sharedWith, title, description, date, email }) {
	const {
		palette: { backgroundSecondary, highlighted, textSecondary, background, textTertiary }
	} = useAppContext()
	const splitDate = new Date(date.seconds * 1000).toLocaleDateString('bg-BG').split('/')
	const formatedDate = `${splitDate[1]}.${splitDate[0]}.${splitDate[2]}`

	const renderUserItem = ({ item }) => (
		<View style={[styles.user, { backgroundColor: background }]}>
			<MyText size={14} text={item === email ? 'Мен' : item} color={textTertiary} />
		</View>
	)

	return (
		<View style={styles.task}>
			<View style={styles.taskTop}>
				<MyText text={title} size={26} color='#fff' />
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						marginTop: pxH(10)
					}}
				>
					<Clock width={pxH(20)} height={pxH(20)} stroke='#fff' />
					<MyText text={`До дата: ${formatedDate}`} size={14} color='#fff' styles={{ marginLeft: pxH(5) }} />
				</View>
			</View>
			<View style={[styles.taskBody, { backgroundColor: backgroundSecondary }]}>
				{description ? (
					<View>
						<MyText text='Описание:' size={16} color={textSecondary} styles={{ marginBottom: pxH(5) }} />
						<MyText text={description} size={16} color={textTertiary} styles={{ marginBottom: pxH(20) }} />
					</View>
				) : null}
				{sharedWith && sharedWith.length > 0 ? (
					<View style={styles.taskShared}>
						<MyText text='Споделена с:' size={16} color={textSecondary} />

						<FlatList
							renderItem={renderUserItem}
							data={sharedWith}
							keyExtractor={(item) => item}
							contentContainerStyle={{ alignItems: 'flex-start' }}
							numColumns={1}
							showsVerticalScrollIndicator={false}
						/>
					</View>
				) : null}
				{doneBy && doneBy.length > 0 ? (
					<View style={styles.taskShared}>
						<MyText text='Решили:' size={16} color={textSecondary} />
						<FlatList
							renderItem={renderUserItem}
							data={doneBy}
							keyExtractor={(item) => item}
							contentContainerStyle={{ alignItems: 'flex-start' }}
							numColumns={1}
							showsVerticalScrollIndicator={false}
						/>
					</View>
				) : null}
				{doneBy && doneBy.length === 0 && !description && sharedWith && sharedWith.length === 0 ? (
					<View style={styles.taskEmpty}>
						<TaskEmptyImage
							style={[styles.taskEmptyImage, { color: highlighted }]}
							width={pxH(280)}
							height={pxH(220)}
						/>
						<MyText text='Празно... 🕸️' size={14} color={textSecondary} />
					</View>
				) : null}
			</View>
			<View />
		</View>
	)
}

TaskBody.propTypes = {
	doneBy: PropTypes.arrayOf(PropTypes.string).isRequired,
	sharedWith: PropTypes.arrayOf(PropTypes.string),
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	date: PropTypes.shape({
		seconds: PropTypes.number.isRequired
	}).isRequired,
	email: PropTypes.string.isRequired
}

TaskBody.defaultProps = {
	description: '',
	sharedWith: []
}

export default TaskBody

const styles = StyleSheet.create({
	task: {
		borderRadius: pxH(20),
		flex: 1
	},
	taskBody: {
		borderBottomLeftRadius: pxH(20),
		borderBottomRightRadius: pxH(20),
		flex: 1,
		marginBottom: pxH(40),
		padding: pxH(20)
	},
	taskEmpty: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center'
	},
	taskEmptyImage: {
		marginBottom: pxH(20)
	},
	taskShared: {
		marginBottom: pxH(20)
	},
	taskTop: {
		backgroundColor: '#3E82DC',
		borderTopLeftRadius: pxH(20),
		borderTopRightRadius: pxH(20),
		padding: pxH(20),
		paddingTop: pxH(60)
	},
	user: {
		borderRadius: pxH(10),
		marginRight: pxH(10),
		marginTop: pxH(10),
		padding: pxH(10)
	}
})
