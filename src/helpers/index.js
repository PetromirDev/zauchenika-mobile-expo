import { changeURL, resize } from './changeURL'
import { pxW, pxH } from './pixelsToDP'
import setLocale from './setCalendarLocale'
import {
	// FireBaseStorage,
	getFileLocalPath,
	// createStorageReferenceToFile,
	uploadFileToFireBase,
	uploadProgress
} from './storage'
import { validateUser, validateEmail } from './validate'
import wait from './wait'

export {
	changeURL,
	resize,
	pxW,
	pxH,
	setLocale,
	// FireBaseStorage,
	getFileLocalPath,
	// createStorageReferenceToFile,
	uploadFileToFireBase,
	uploadProgress,
	validateUser,
	validateEmail,
	wait
}
