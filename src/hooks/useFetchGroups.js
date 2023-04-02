import { useCallback, useEffect, useRef, useState } from 'react'

import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebaseConfig'

const useFetchGroups = ({ email, limit }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [groups, setGroups] = useState([])
	const [error, setError] = useState(null)
	const [shouldRefetch, refetch] = useState({})

	const isMounted = useRef(false)

	const refresh = () => refetch({})

	const fetchGroups = useCallback(async () => {
		if (isMounted.current) {
			setIsLoading(true)
		}

		const newGroups = []
		try {
			const groupsCollection = collection(db, 'groups')
			const groupQuery = query(groupsCollection, where('users', 'array-contains', email), limit(limit || 10))
			const groupDocuments = await getDocs(groupQuery)

			if (groupDocuments.length === 0) {
				if (!isMounted.current) return

				setIsLoading(false)
				setGroups([])
				return
			}

			groupDocuments.forEach((document) => {
				newGroups.push({
					...document.data(),
					gid: document.id
				})
			})

			if (isMounted.current) {
				setGroups(newGroups)
				setIsLoading(false)
			}
		} catch (err) {
			if (isMounted.current) {
				throw new Error(err)
			}
		}
	}, [shouldRefetch])

	useEffect(() => {
		isMounted.current = true
		try {
			fetchGroups()
		} catch {
			if (isMounted.current) {
				setError('Error while fetching groups')
			}
		}

		return () => {
			isMounted.current = false
		}
	}, [fetchGroups])

	return {
		groups,
		isLoading,
		refresh,
		error
	}
}

export default useFetchGroups
