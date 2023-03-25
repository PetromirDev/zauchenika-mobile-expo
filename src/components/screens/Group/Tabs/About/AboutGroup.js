import React, { useEffect, useState, useCallback } from 'react'
import { UserPlus } from 'react-native-feather'
import { View, Pressable, ScrollView } from 'react-native'

import PropTypes from 'prop-types'
// Context
import { useAppContext } from '@context/AuthContext'
// Helpers
import { pxH, validateUser, validateEmail } from '@helpers'
// Components
import { MyText, BigInput, MyModal, Popup, PopupItem, MyAlert } from '@components/common'
import UserInfo from './UserInfo/UserInfo'
import User from './User/User'
import ExitButton from './ExitButton/ExitButton'
import GroupPhoto from './GroupPhoto/GroupPhoto'
import { arrayRemove, arrayUnion, collection, doc, getDoc, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../../../../../../firebaseConfig'

function AboutGroup({ groupData, user, userEmails, setUserEmails, image }) {
	const { palette } = useAppContext()
	const { gid, owner } = groupData
	const { inputColor, textSecondary, textTertiary, textPrimary } = palette
	// STATE
	const [users, setUsers] = useState([])
	const [newUser, setNewUser] = useState('')
	const [addNewUser, setAddNewUser] = useState(false)
	const [selectedUser, setSelectedUser] = useState(null)
	const [managedUser, setManagedUser] = useState(null)
	const [popupPos, setPopupPos] = useState(null)
	const [isSubmit, setIsSubmit] = useState(false)

	const addUser = useCallback(async () => {
		if (validateEmail(newUser) && !isSubmit) {
			if (await validateUser(newUser)) {
				if (!userEmails.includes(newUser)) {
					setIsSubmit(true)
					try {
						const groupRef = doc(db, 'groups', gid)

						await updateDoc(groupRef, {
							users: arrayUnion(newUser)
						})

						alert(`Успешно добавихте ${newUser} в групата!`)

						const newUserDocRef = collection(db, 'users')
						const newUserDataQuery = query(newUserDocRef, where('email', '==', newUser))

						const newUserSnapshot = await getDocs(newUserDataQuery)

						newUserSnapshot.forEach((doc) => {
							setUsers((oldUsers) => [...oldUsers, { ...doc.data(), id: doc.id }])
						})
						setAddNewUser(false)
						setNewUser('')
						setIsSubmit(false)
					} catch {
						alert('Грешка при добавянето на потребителя!')
					}
				} else {
					alert('Вече е добавен потребител с този имейл адрес!')
				}
			} else {
				alert('Не съществува потребител с този имейл адрес!')
			}
		} else {
			alert('Моля въведете валиден имейл адрес!')
		}
	}, [gid, isSubmit, newUser, setUsers, userEmails])

	useEffect(() => {
		let isMounted = true
		const userDocRef = collection(db, 'users')
		const userDataQuery = query(userDocRef, where('email', 'in', userEmails))

		getDocs(userDataQuery).then((data) => {
			const newUsers = []
			data.docs.forEach((newUserDoc) => {
				newUsers.push(newUserDoc.data())
			})
			if (isMounted) {
				setUsers(newUsers)
				setSelectedUser(null)
			}
		})
		return () => {
			isMounted = false
		}
	}, [setUsers, userEmails])

	const handleRemoveUser = async () => {
		if (user.email === owner) {
			const groupRef = doc(db, 'groups', gid)
			await updateDoc(groupRef, { users: arrayRemove(managedUser) })

			setUserEmails((oldUsers) => oldUsers.filter((oldUser) => oldUser !== managedUser))
			setUsers((oldUsers) => oldUsers.filter((oldUser) => oldUser.email !== managedUser))
			setManagedUser(null)
			setPopupPos(null)
		}
	}

	const removeUser = () => {
		if (user.email === owner) {
			MyAlert(
				'Сигурни ли сте, че искате да премахнете този потребител?',
				`Съгласни ли сте да премахнете ${managedUser} от групата`,
				handleRemoveUser,
				[],
				'Да',
				null,
				[],
				'Отказ'
			)
		}
	}

	const showPopup = (touchPos, email) => {
		setPopupPos({ x: touchPos.pageX, y: touchPos.pageY })
		setManagedUser(email)
	}

	const closePopup = () => {
		setPopupPos(null)
		setManagedUser(null)
	}

	return (
		<ScrollView
			style={{ width: '100%', flex: 1 }}
			contentContainerStyle={{ flex: 1 }}
			showsVerticalScrollIndicator={false}
		>
			<GroupPhoto image={image} gid={gid} />
			{/* Render users header */}
			<View style={{ paddingHorizontal: pxH(20), flex: 1 }}>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
					<MyText text='Участници' color={textSecondary} size={16} />
					<Pressable onPress={() => setAddNewUser(true)}>
						<UserPlus width={pxH(20)} height={pxH(20)} stroke={textSecondary} />
					</Pressable>
				</View>
				{/* Render users */}
				{users.map((member) => (
					<User
						key={member.uid}
						photoURL={member.photoURL}
						currentEmail={user.email}
						email={member.email}
						owner={owner}
						displayName={member.displayName}
						onPress={() => setSelectedUser(member)}
						showPopup={showPopup}
					/>
				))}
			</View>
			{/* Exit button */}
			<ExitButton currentUserEmail={user.email} groupOwner={owner} userEmails={userEmails} gid={gid} />
			<UserInfo
				onClose={() => {
					setSelectedUser(null)
				}}
				userData={selectedUser}
			/>
			<MyModal
				buttonText='Добави'
				visible={addNewUser}
				onPress={addUser}
				onClose={() => setAddNewUser(false)}
				title='Добави участник'
			>
				<BigInput
					placeholder='Имейл адрес'
					value={newUser}
					keyboardType='email-address'
					onChangeText={setNewUser}
					backgroundColor={inputColor}
					color={textTertiary}
				/>
			</MyModal>
			<Popup offsetY={pxH(110)} offsetX={pxH(140)} background={inputColor} onClose={closePopup} popupPos={popupPos}>
				<PopupItem onPress={removeUser} text='Премахни' textColor={textPrimary} />
			</Popup>
		</ScrollView>
	)
}

AboutGroup.propTypes = {
	groupData: PropTypes.shape({
		owner: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		image: PropTypes.string,
		users: PropTypes.arrayOf(PropTypes.string).isRequired,
		description: PropTypes.string,
		gid: PropTypes.string.isRequired,
		created: PropTypes.shape({
			seconds: PropTypes.number.isRequired,
			nanoseconds: PropTypes.number.isRequired
		})
	}).isRequired,
	user: PropTypes.shape({
		email: PropTypes.string.isRequired,
		uid: PropTypes.string.isRequired,
		displayName: PropTypes.string.isRequired,
		photoURL: PropTypes.string.isRequired
	}).isRequired,
	userEmails: PropTypes.arrayOf(PropTypes.string).isRequired,
	setUserEmails: PropTypes.func.isRequired,
	image: PropTypes.string.isRequired
}

export default React.memo(AboutGroup)
