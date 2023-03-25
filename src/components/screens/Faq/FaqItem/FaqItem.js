import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { useAppContext } from '@context/AuthContext'
/* Components */
import { MyText } from '@components/common'
import { pxH } from '@helpers'

function FaqItem({ question, answer }) {
	const { palette } = useAppContext()
	const { backgroundSecondary, textPrimary, textSecondary } = palette

	return (
		<View style={[styles.faqItem, { backgroundColor: backgroundSecondary }]}>
			<MyText styles={{ marginBottom: pxH(10) }} size={20} text={question} font='FiraSans-Medium' color={textPrimary} />
			<MyText size={14} text={answer} color={textSecondary} />
		</View>
	)
}

export default FaqItem

FaqItem.propTypes = {
	question: PropTypes.string.isRequired,
	answer: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
	faqItem: {
		borderRadius: pxH(20),
		marginTop: pxH(10),
		padding: pxH(20)
	}
})
