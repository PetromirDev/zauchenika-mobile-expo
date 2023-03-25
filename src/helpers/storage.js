import { Platform } from 'react-native'
// import { ref, uploadBytesResumable } from 'firebase/storage'
// import { storage } from '../../firebaseConfig'

// export const FireBaseStorage = storage()

export const getFileLocalPath = (response) => {
	const source = response.assets[0]
	return Platform.OS === 'android' ? source.uri : source.path
}

// export const createStorageReferenceToFile = (response) => {
// 	const { fileName } = response.assets[0]
// 	return FireBaseStorage.ref(fileName)
// }

export const uploadFileToFireBase = (response, gid) => {
	// const fileSource = getFileLocalPath(response)
	// const storageRef = ref(storage, `/group-images/${gid}/image.${response.assets[0].fileName.split('.')[1]}`)

	return '@TODO'
	// return uploadBytesResumable(storageRef, fileSource)
	// return storageRef.putFile(fileSource)
}

export const uploadProgress = (ratio) => Math.round(ratio * 100)
