import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebaseConfig'

const useFetchTasks = ({ lookAt, lookType, lookFor }) => {
	const [tasks, setTasks] = useState({})
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [taskCount, setTaskCount] = useState(0)
	const [hasLateTask, setHasLateTask] = useState(false)
	const [shouldRefetch, refetch] = useState({})

	const refresh = () => refetch({})

	useEffect(() => {
		let isMounted

		if (isMounted) {
			setIsLoading(true)
		}
		try {
			const tasksCollectionRef = collection(db, 'tasks')
			const tasksQuery = query(tasksCollectionRef, where(lookAt, lookType, lookFor))

			getDocs(tasksQuery).then(async (newTasks) => {
				if (!newTasks.docs.length > 0 && isMounted) {
					setIsLoading(false)
					setError(null)
					setTasks({})
					setHasLateTask(false)
					return
				}

				const mappedTasks = []

				const getTasks = async () => {
					newTasks.docs.map(async (doc) => {
						const date = await new Date(doc.data().date.seconds * 1000).toLocaleDateString().split('/').join('-')
						const splitDate = date.split('-')
						const newDate = `${(await '20') + splitDate[2]}-${splitDate[0]}-${splitDate[1]}`
						mappedTasks.push({
							...doc.data(),
							tid: doc.id,
							formatedDate: newDate
						})
					})
					return mappedTasks
				}
				getTasks().then(async (tasksMapped) => {
					const reduced = tasksMapped.reduce((acc, currentItem) => {
						const { formatedDate, ...task } = currentItem
						if (acc[formatedDate]) {
							acc[formatedDate].push(task)
						} else {
							acc[formatedDate] = [task]
						}
						return acc
					}, {})
					if (isMounted) {
						setIsLoading(false)
						setTasks(reduced)
						setHasLateTask(new Date(Object.keys(reduced)[0]) < new Date())
						setTaskCount(newTasks.docs.length)
						setError(null)
					}
				})
			})
		} catch {
			if (isMounted) {
				setIsLoading(false)
				setError(error)
			}
		}

		return () => {
			isMounted = false
		}
	}, [shouldRefetch])

	return { tasks, isLoading, error, taskCount, hasLateTask, refresh }
}

export default useFetchTasks
