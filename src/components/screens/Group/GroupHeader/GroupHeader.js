import React from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
// Components
import { MyText } from '@components/common'
// Helpers
import { pxH } from '@helpers'

export default function GroupHeader(props) {
	const { menu, setMenu, taskCount, backgroundSecondary, highlighted, textSecondary, textTertiary } = props

	return (
		<View
			style={[
				styles.header,
				{
					backgroundColor: backgroundSecondary,
					borderBottomColor: textTertiary,
					borderBottomWidth: 0.5
				}
			]}
		>
			<View style={styles.inner}>
				<TouchableOpacity onPress={() => setMenu('tasks')}>
					<View style={styles.menuItem}>
						<MyText color={menu === 'tasks' ? highlighted : textSecondary} size={16} text={`Задачи (${taskCount})`} />
						<View
							style={[
								styles.menuItemBottom,
								{
									backgroundColor: menu === 'tasks' ? highlighted : backgroundSecondary
								}
							]}
						/>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => setMenu('about')}>
					<View style={styles.menuItem}>
						<MyText color={menu === 'about' ? highlighted : textSecondary} size={16} text='За групата' />
						<View
							style={[
								styles.menuItemBottom,
								{
									backgroundColor: menu === 'about' ? highlighted : backgroundSecondary
								}
							]}
						/>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	)
}

GroupHeader.propTypes = {
	menu: PropTypes.string.isRequired,
	setMenu: PropTypes.func.isRequired,
	taskCount: PropTypes.number.isRequired,
	backgroundSecondary: PropTypes.string.isRequired,
	highlighted: PropTypes.string.isRequired,
	textSecondary: PropTypes.string.isRequired,
	textTertiary: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
	header: {
		paddingTop: pxH(20),
		width: '100%'
	},
	inner: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	menuItem: {
		marginHorizontal: pxH(10),
		padding: pxH(5),
		paddingBottom: 0
	},
	menuItemBottom: {
		borderTopLeftRadius: pxH(20),
		borderTopRightRadius: pxH(20),
		height: pxH(3),
		marginTop: pxH(5),
		width: '100%'
	}
})
