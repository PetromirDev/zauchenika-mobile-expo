import React from 'react'
import { SafeAreaView, View, StyleSheet, FlatList, RefreshControl } from 'react-native'
import PropTypes from 'prop-types'
// Context
import { useAppContext } from '@context/AuthContext'
// Helpers
import { pxH, resize } from '@helpers'
// Hooks
import useFetchGroups from '@hooks/useFetchGroups'
/* Components */
import Navigation from '@components/layout/Navigation/Navigation'
import Header from '@components/layout/Header/Header'
import { MyText, Group, PrimaryButton } from '@components/common'
import FullBanner from '@components/ads/FullBanner'
// Images
import NoGroups from './images/no-groups.svg'

const renderItem = ({ item: { name, image, description, gid, owner, users } }) => (
	<Group groupName={name} groupDescription={description} groupImage={image} gid={gid} members={users} owner={owner} />
)

export default function Groups({ navigation }) {
	const { user, palette } = useAppContext()
	const { textPrimary, textSecondary, background, highlighted } = palette
	const { email, photoURL } = user
	const { groups, isLoading, refresh } = useFetchGroups({ email })

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: background }]}>
			<View style={{ flex: 1, padding: pxH(20) }}>
				<View>
					<Header
						textPrimary={textPrimary}
						highlighted={highlighted}
						headerPrimary='Твоите групи'
						photoURL={resize(photoURL, 120, 120)}
						headerText={!isLoading ? `${Object.keys(groups).length} групи` : 'Зареждане...'}
					/>
					<View
						style={{
							marginTop: pxH(10),
							flexDirection: 'row',
							justifyContent: 'center'
						}}
					>
						<FullBanner id='ca-app-pub-1800635395568659/5708357794' personalized />
					</View>
				</View>
				{groups.length > 0 || isLoading ? (
					<FlatList
						contentContainerStyle={{ marginTop: pxH(20) }}
						refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh} />}
						data={groups}
						renderItem={renderItem}
						ListFooterComponent={<View style={{ marginBottom: pxH(100) }} />}
						keyExtractor={(item) => item.gid}
						showsVerticalScrollIndicator={false}
					/>
				) : (
					<View style={styles.noGroups}>
						<NoGroups width={pxH(260)} height={pxH(200)} style={[styles.noGroupsImage, { color: highlighted }]} />
						<MyText
							text='Търсихме навсякъде и не намерихме групи :('
							color={textSecondary}
							styles={styles.noGroupsText}
						/>
						<PrimaryButton
							onPress={() => navigation.navigate('Създай група')}
							textColor='#fff'
							bg={highlighted}
							borderColor={highlighted}
							text='Създай група'
							style={styles.noGroupsButton}
						/>
						<MyText text='или' color={textSecondary} size={14} styles={styles.noGroupsOrText} />
						<MyText
							text={`сподели имейл адреса си:\n ${email}`}
							size={16}
							color={textSecondary}
							styles={styles.noGroupsText}
						/>
					</View>
				)}
			</View>
			<Navigation navigation={navigation} currentScreen='Групи' />
		</SafeAreaView>
	)
}

Groups.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func
	}).isRequired
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	noGroups: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center'
	},
	noGroupsButton: {
		marginBottom: pxH(20)
	},
	noGroupsImage: {
		marginBottom: pxH(20)
	},
	noGroupsOrText: {
		marginBottom: pxH(10)
	},
	noGroupsText: {
		marginBottom: pxH(30),
		textAlign: 'center'
	}
})
