import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebaseConfig'

export const validateUser = async (email) => {
	const userRef = collection(db, 'users')
	const queryD = query(userRef, where('email', '==', email))

	const querySnapshot = await getDocs(queryD)

	return querySnapshot.docs.length > 0
}

export const validateEmail = (email) => {
	const re = /^\S+@\S+\.\S+$/
	return re.test(email)
}
