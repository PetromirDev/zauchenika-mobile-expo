import { useCallback, useEffect, useRef, useState } from 'react'

import { doc } from 'firebase/firestore'
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
			const groupDocsRef = doc(db, 'groups')
			const query = query(groupDocsRef, where('users', 'array-contains', email), limit(limit || 10))
			const groupDocuments = await getDocs(query)

			if (!isMounted.current) return
			if (groupDocuments.length === 0) {
				setIsLoading(false)
				setGroups([])
				return
			}

			groupDocuments.forEach((doc) => {
				newGroups.push({
					...doc.data(),
					gid: doc.id
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
			fetchGroups(isMounted.current)
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
