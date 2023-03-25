import React from 'react'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet, Alert } from 'react-native'
import { Check, Trash } from 'react-native-feather'

// Context
import { useAppContext } from '@context/AuthContext'
// Helpers
import { pxH } from '@helpers'
// Components
import IconButton from './IconButton/IconButton'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../../firebaseConfig'

function TaskManage({ tid, users, email }) {
	const {
		palette: { backgroundSecondary }
	} = useAppContext()

	const navigation = useNavigation()

	const handleTaskDone = () => {
		if (users.includes(email)) {
			const taskRef = doc(db, 'tasks', tid)

			updateDoc(taskRef, {
				doneBy: arrayUnion(email),
				users: arrayRemove(email)
			})

			return Alert.alert(
				'Успешно маркирахте задачата за изпълнена!',
				'Натиснете ок за да продължите към начален екран',
				[{ text: 'Ок', onPress: () => navigation.navigate('Начало') }]
			)
		}
		return alert('Вече сте маркирали тази задача за решена!')
	}

	const handleDeleteTask = () => {
		if (users.includes(email)) {
			const taskRef = doc(db, 'tasks', tid)
			updateDoc(taskRef, {
				users: arrayRemove(email)
			})
			return Alert.alert(
				'Успешно изтрихте задачата от вашите задачи!',
				'Натиснете ок за да продължите към начален екран',
				[{ text: 'Ок', onPress: () => navigation.navigate('Начало') }]
			)
		}
		return alert('Вече сте изтрили тази задача от вашите задачи!')
	}

	return (
		<View style={styles.manageTask}>
			<IconButton onPress={handleTaskDone} primary>
				<Check width={pxH(25)} height={pxH(25)} stroke={backgroundSecondary} />
			</IconButton>
			<IconButton onPress={handleDeleteTask}>
				<Trash width={pxH(25)} height={pxH(25)} stroke={backgroundSecondary} />
			</IconButton>
		</View>
	)
}

TaskManage.propTypes = {
	tid: PropTypes.string.isRequired,
	users: PropTypes.arrayOf(PropTypes.string).isRequired,
	email: PropTypes.string.isRequired
}

export default TaskManage

const styles = StyleSheet.create({
	manageTask: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: pxH(40),
		width: '100%'
	}
})
