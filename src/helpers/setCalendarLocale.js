import { LocaleConfig } from 'react-native-calendars'

const setLocale = () => {
	LocaleConfig.locales.bg = {
		monthNames: [
			'Януари',
			'Февруари',
			'Март',
			'Април',
			'Май',
			'Юни',
			'Юли',
			'Август',
			'Септември',
			'Октомври',
			'Ноември',
			'Декември'
		],
		monthNamesShort: ['Ян', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юл', 'Авг', 'Септ', 'Окт', 'Ноемв', 'Дек'],
		dayNames: ['неделя', 'понеделник', 'вторник', 'сряда', 'четвъртък', 'петък', 'събота'],
		dayNamesShort: ['нд', 'пн', 'вт', 'ср', 'чт', 'пет', 'събота'],
		today: 'Днес'
	}
	LocaleConfig.defaultLocale = 'bg'
}

export default setLocale
