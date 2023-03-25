import React, { useMemo } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
// Context
import { useAppContext } from '@context/AuthContext'
// Helpers
import { pxH, setLocale } from '@helpers'
/* Components */
import MyText from '../MyText'
import Task from './Task/Task'

import agendaTheme from './theme'
/* Lazy */
const Agenda = React.lazy(() => import('react-native-calendars/src/agenda/index'))

const renderItem = (item) => (
	<Task
		title={item.title}
		description={item.description}
		dueDate={item.date}
		sharedWith={item.users}
		doneBy={item.doneBy}
		tid={item.tid}
	/>
)

function MyAgenda({ tasks, onRefresh, refreshing, refreshControlComponent, style }) {
	setLocale()
	const { palette } = useAppContext()
	const { textPrimary, textSecondary, textTertiary, background, backgroundSecondary, highlighted } = palette

	const theme = useMemo(
		() => agendaTheme(textPrimary, textSecondary, textTertiary, background, backgroundSecondary, highlighted),
		[textPrimary, textSecondary, textTertiary, background, backgroundSecondary, highlighted]
	)

	return (
		<Agenda
			onRefresh={onRefresh}
			refreshing={refreshing}
			refreshControl={refreshControlComponent}
			style={{ borderRadius: 20, ...style }}
			theme={theme}
			items={tasks}
			renderItem={renderItem}
			renderEmptyData={() => (
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						padding: pxH(20)
					}}
				>
					<MyText size={16} text='Нямате задачи за този ден' font='FiraSans-Medium' color={textTertiary} />
				</View>
			)}
			pastScrollRange={1}
			futureScrollRange={2}
		/>
	)
}

MyAgenda.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types, react/require-default-props
	tasks: PropTypes.object,
	onRefresh: PropTypes.func.isRequired,
	refreshing: PropTypes.bool.isRequired,
	refreshControlComponent: PropTypes.element.isRequired,
	// eslint-disable-next-line react/forbid-prop-types, react/require-default-props
	style: PropTypes.object
}

MyAgenda.defaultProps = {
	tasks: {}
}

export default React.memo(MyAgenda)
