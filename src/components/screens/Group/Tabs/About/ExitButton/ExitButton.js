import React from 'react'
import { ArrowRight, LogOut } from 'react-native-feather'
import { Alert, View, TouchableOpacity } from 'react-native'
import { updateDoc, collection, doc } from 'firebase/firestore'
import PropTypes from 'prop-types'
// Context
import { useAppContext } from '@context/AuthContext'
// Helpers
import { pxH } from '@helpers'
// Components
import { MyText, MyAlert } from '@components/common'

import { useNavigation } from '@react-navigation/native'
import { db } from '../../../../../../../firebaseConfig'

function ExitButton({ currentUserEmail, groupOwner, userEmails, gid }) {
	const { palette } = useAppContext()
	const { textSecondary, textPrimary, backgroundSecondary } = palette
	const navigation = useNavigation()

	const handleExitGroup = async () => {
		const groupRef = doc(db, 'groups', gid)
		await updateDoc(groupRef, { users: firestore.FieldValue.arrayRemove(currentUserEmail) })
		navigation.reset({ index: 0, routes: [{ name: 'Групи' }] })
	}

	const exitGroup = () => {
		if (currentUserEmail !== groupOwner || (currentUserEmail === 1 && userEmails[0] === currentUserEmail)) {
			MyAlert('Сигурни ли сте, че искате да излезете от групата?', '', handleExitGroup, [], 'Да', null, [], 'Отказ')
		} else {
			Alert.alert('Внимание!', 'Вие сте администратор на групата и не можете да я напуснете!')
		}
	}
	return (
		<TouchableOpacity onPress={exitGroup}>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					paddingTop: pxH(50),
					paddingBottom: pxH(20),
					paddingHorizontal: pxH(20)
				}}
			>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<LogOut width={pxH(30)} height={pxH(30)} stroke={textSecondary} />
					<MyText
						styles={{ marginLeft: pxH(15) }}
						text='Изход'
						color={textSecondary}
						size={16}
						font='FiraSans-Medium'
					/>
				</View>
				<View
					style={{
						padding: pxH(15),
						borderRadius: pxH(8),
						backgroundColor: backgroundSecondary,
						justifyContent: 'center',
						alignItems: 'center',
						marginLeft: 'auto'
					}}
				>
					<ArrowRight width={pxH(15)} height={pxH(15)} stroke={textPrimary} />
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default ExitButton

ExitButton.propTypes = {
	currentUserEmail: PropTypes.string.isRequired,
	groupOwner: PropTypes.string.isRequired,
	userEmails: PropTypes.arrayOf(PropTypes.string).isRequired,
	gid: PropTypes.string.isRequired
}
