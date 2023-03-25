import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native'
import { RefreshCcw } from 'react-native-feather'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
// Context
import { useAppContext } from '@context/AuthContext'
// Hooks
import useFetchTasks from '@hooks/useFetchTasks'
/* Components */
import { MyText, MyAgenda } from '@components/common'

function Tasks({ setLate, setTaskCount }) {
	const {
		palette: { textPrimary },
		user: { email }
	} = useAppContext()
	const { tasks, isLoading, taskCount, hasLateTask, refresh } = useFetchTasks({
		lookAt: 'users',
		lookType: 'array-contains',
		lookFor: email
	})

	useEffect(() => {
		setLate(hasLateTask)
		setTaskCount(taskCount)
	}, [taskCount, hasLateTask])

	return (
		<>
			<View
				style={{
					...styles.headerWrapper,
					marginBottom: hp(1),
					marginTop: hp(2)
				}}
			>
				<MyText text='Твоите задачи' color={textPrimary} font='FiraSans-Medium' size={18} />
				<TouchableOpacity onPress={refresh}>
					<RefreshCcw width={hp(2)} height={hp(2)} color={textPrimary} />
				</TouchableOpacity>
			</View>
			<View style={{ flex: 1, height: '100%' }}>
				<MyAgenda
					tasks={tasks}
					onRefresh={refresh}
					refreshing={isLoading}
					refreshControlComponent={<RefreshControl refreshing={isLoading} onRefresh={refresh} />}
				/>
				<View style={{ marginBottom: 60 }} />
			</View>
		</>
	)
}

export default Tasks

Tasks.propTypes = {
	setLate: PropTypes.func.isRequired,
	setTaskCount: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	headerWrapper: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
})
