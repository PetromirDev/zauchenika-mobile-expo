import { pxH } from '@helpers'

const agendaTheme = (textPrimary, textSecondary, textTertiary, background, backgroundSecondary, highlighted) => ({
	agendaDayTextColor: textTertiary,
	agendaDayNumColor: textSecondary,
	agendaTodayColor: highlighted,
	agendaKnobColor: highlighted,
	dayTextColor: textSecondary,
	textDisabledColor: textTertiary,
	textInactiveColor: textTertiary,
	monthTextColor: textPrimary,
	dotColor: highlighted,
	todayTextColor: highlighted,
	selectedDayBackgroundColor: highlighted,
	backgroundColor: background,
	calendarBackground: backgroundSecondary,
	textDayFontSize: pxH(16),
	textMonthFontSize: pxH(16),
	textDayHeaderFontSize: pxH(12),
	todayButtonPosition: 'center',
	'stylesheet.agenda.main': {
		weekday: {
			width: pxH(32),
			height: pxH(20),
			textAlign: 'center',
			color: textTertiary,
			fontSize: pxH(12),
			fontFamily: 'FiraSans-Regular',
			fontWeight: '400',
			margin: 0
		},
		weekdays: {
			position: 'absolute',
			left: 0,
			right: 0,
			top: 0,
			flexDirection: 'row',
			justifyContent: 'space-between',
			paddingLeft: pxH(24),
			paddingRight: pxH(24),
			paddingTop: pxH(15),
			paddingBottom: 5,
			backgroundColor: backgroundSecondary
		},
		reservations: {
			flex: 1,
			marginTop: 104,
			backgroundColor: 'transparent',
			padding: pxH(10)
		}
	},
	dotStyle: {
		width: pxH(4),
		height: pxH(4),
		borderRadius: pxH(2),
		marginTop: pxH(1)
	},
	'stylesheet.agenda.list': {
		dayText: {
			fontSize: pxH(14),
			color: textTertiary,
			marginTop: pxH(-5)
		},
		dayNum: {
			fontSize: pxH(28),
			color: textSecondary
		},
		innerContainer: {
			paddingHorizontal: pxH(10),
			flex: 1
		}
	},
	'stylesheet.day.basic': {
		selected: {
			backgroundColor: highlighted,
			borderRadius: pxH(34),
			alignItems: 'center',
			justifyContent: 'center',
			height: pxH(32),
			width: pxH(32)
		}
	}
})

export default agendaTheme
