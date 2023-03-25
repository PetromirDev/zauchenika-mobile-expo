import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native'
// Context
import { useAppContext } from '@context/AuthContext'
// Helpers
import { pxH } from '@helpers'
// Componjents
import MyText from '../../MyText'

function Task({ title, description, dueDate, sharedWith, doneBy, tid }) {
	const {
		palette: { backgroundSecondary, textPrimary, textSecondary }
	} = useAppContext()
	const navigation = useNavigation()

	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate('Задача', {
					title,
					description,
					date: dueDate,
					users: sharedWith,
					doneBy,
					tid
				})
			}
		>
			<View
				style={{
					...styles.task,
					backgroundColor: backgroundSecondary
				}}
			>
				<MyText
					font='FiraSans-Medium'
					size={16}
					color={textPrimary}
					text={`${title.slice(0, 22)}${title.length > 22 ? '...' : ''}`}
				/>
				{description ? (
					<MyText
						font='FiraSans-Regular'
						size={14}
						color={textSecondary}
						text={`${description.slice(0, 50)}${description.length > 50 ? '...' : ''}`}
					/>
				) : null}
			</View>
		</TouchableOpacity>
	)
}

export default Task

Task.propTypes = {
	title: PropTypes.string.isRequired,
	tid: PropTypes.string.isRequired,
	description: PropTypes.string,
	dueDate: PropTypes.shape({
		seconds: PropTypes.number.isRequired,
		nanoseconds: PropTypes.number.isRequired
	}).isRequired,
	sharedWith: PropTypes.arrayOf(PropTypes.string).isRequired,
	doneBy: PropTypes.arrayOf(PropTypes.string)
}

Task.defaultProps = {
	description: '',
	doneBy: []
}

const styles = StyleSheet.create({
	task: {
		borderRadius: pxH(15),
		flex: 1,
		marginBottom: pxH(10),
		padding: pxH(15)
	}
})
