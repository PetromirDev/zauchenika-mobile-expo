import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useAppContext } from '@context/AuthContext'
/* Components */
import { pxH } from '@helpers'
import FaqItem from './FaqItem/FaqItem'

const faqs = [
	{
		question: 'Защо има реклами в приложението?',
		answer: 'За да може приложението да остане безплатно се налага да виждате реклами.'
	},
	{
		question: 'Защо трябва да използвам социална мрежа за да вляза в ЗаУченика?',
		answer:
			// eslint-disable-next-line max-len
			'От съображение за сигурност за приложението и потребителя е необходимо да използвате социална мрежа, за да влезете в ЗаУченика.'
	},
	{
		question: 'Как мога да получа повече информация за приложението?',
		answer: 'Приложението ЗаУченика разполага с уебсайт, където може да намерите повече детайли за нас.'
	}
]
export default function Faq() {
	const { palette } = useAppContext()
	const { background } = palette

	return (
		<View style={[styles.container, { backgroundColor: background }]}>
			{faqs.map((faq) => (
				<FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: pxH(20)
	}
})
