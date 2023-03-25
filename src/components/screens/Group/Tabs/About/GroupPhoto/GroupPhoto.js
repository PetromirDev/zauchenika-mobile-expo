import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, Pressable } from 'react-native'

import { useInterstitialAd } from '@react-native-admob/admob'
import PropTypes from 'prop-types'
// Context
import { useAppContext } from '@context/AuthContext'
// Helpers
import { pxH, uploadFileToFireBase, uploadProgress } from '@helpers'

import * as ImagePicker from 'react-native-image-picker'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../../../../firebaseConfig'

const IMAGE_PICKER_OPTIONS = { noData: true }

function GroupPhoto({ image, gid }) {
	const [imageURI, setImageURI] = useState(image?.uri)

	const { adLoaded, adDismissed, show } = useInterstitialAd('ca-app-pub-1800635395568659/6810513481')

	const { palette } = useAppContext()
	const { highlighted } = palette

	const [progress, setProgess] = useState(0)

	const showAd = () => {
		try {
			if (adLoaded) {
				show()
			} else {
				alert('Успешно променихте снимката на групата!')
			}
		} catch {
			alert('Грешка при смяна на снимката!')
		}
	}

	const monitorFileUpload = (task) => {
		task.on('state_changed', (snapshot) => {
			const currentProgress = uploadProgress(snapshot.bytesTransferred / snapshot.totalBytes)
			switch (snapshot.state) {
				case 'running':
					setProgess(currentProgress)
					break
				case 'success':
					snapshot.ref
						.getDownloadURL()
						.then(async (downloadURL) => {
							setImageURI(downloadURL)

							const groupRef = doc(db, 'groups', gid)
							await updateDoc(groupRef, { image: downloadURL })

							setProgess(0)
							showAd()
						})
						.catch(() => {
							alert('Грешка при промяна на снимката')
							setProgess(0)
						})
					break
				default:
					break
			}
		})
	}

	const chooseImage = () => {
		ImagePicker.launchImageLibrary(IMAGE_PICKER_OPTIONS, (response) => {
			if (response.didCancel) return

			if (response.error) {
				alert('Грешка')
			} else if (response.assets[0].fileSize < 5 * 1024 * 1024) {
				const uploadTask = uploadFileToFireBase(response, gid)
				monitorFileUpload(uploadTask)
			} else {
				alert('Максималната големина на файла е 5MB!')
			}
		})
	}
	useEffect(() => {
		if (adDismissed) {
			alert('Успешно променихте снимката на групата!')
		}
	}, [adDismissed])

	return (
		<>
			{/* Group photo upload loading indicator */}
			<View style={{ width: `${progress}%`, height: pxH(4), backgroundColor: highlighted, marginBottom: pxH(40) }} />
			{/* Group photo */}
			<Pressable onPress={chooseImage} style={{ alignItems: 'center', marginBottom: pxH(50) }}>
				<Image source={{ uri: imageURI }} style={styles.image} />
			</Pressable>
		</>
	)
}
export default GroupPhoto

GroupPhoto.propTypes = {
	image: PropTypes.string,
	gid: PropTypes.string.isRequired
}

GroupPhoto.defaultProps = {
	image: null
}

const styles = StyleSheet.create({
	image: {
		borderRadius: pxH(120),
		height: pxH(120),
		padding: pxH(30),
		width: pxH(120)
	}
})
