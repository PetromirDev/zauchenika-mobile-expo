import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, SafeAreaView, StyleSheet } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
// Context
import { useAppContext } from '@context/AuthContext'
// Helpers
import { resize } from '@helpers'
/* Components */
import Header from '@components/layout/Header/Header'
import Navigation from '@components/layout/Navigation/Navigation'
import FullBanner from '@components/ads/FullBanner'
import LatestGroup from './LatestGroup/LatestGroup'
import Tasks from './Tasks/Tasks'

export default function Home({ navigation }) {
	const { user, palette } = useAppContext()
	const { textPrimary, red, background, highlighted } = palette
	const { displayName, photoURL, email } = user
	const [taskCount, setTaskCount] = useState(0)
	const [late, setLate] = useState(false)

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: background }]}>
			<View style={styles.home}>
				<Header
					textPrimary={textPrimary}
					highlighted={!late ? highlighted : red}
					headerText={`${taskCount} оставащ${taskCount === 1 ? 'а' : 'и'} задач${taskCount === 1 ? 'а' : 'и'}`}
					headerPrimary={`Здравей, ${displayName.substring(0, 15)}${displayName.length > 15 ? '...' : ''}`}
					photoURL={resize(photoURL, 120, 120)}
				/>
				<View
					style={{
						marginTop: hp(1.5),
						flexDirection: 'row',
						justifyContent: 'center',
						width: '100%'
					}}
				>
					<FullBanner id='ca-app-pub-1800635395568659/2502505332' personalized />
				</View>
				<LatestGroup email={email} />
				<Tasks setLate={setLate} setTaskCount={setTaskCount} />
			</View>
			<Navigation navigation={navigation} currentScreen='Начало' />
		</SafeAreaView>
	)
}

Home.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired
	}).isRequired
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	home: {
		flex: 1,
		padding: 20
	}
})
