/* eslint-disable import/no-unresolved */
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { getFirestore } = require('firebase-admin/firestore')
const serviceAccount = require('./key.json')

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
})

const db = getFirestore()

exports.createUserDoc = functions
	.region('europe-west1')
	.auth.user()
	.onCreate((user) => {
		// functions.logger.info(user);
		const { photoURL, uid, displayName, email } = user
		db.collection('users').doc(uid).set({
			photoURL,
			uid,
			displayName,
			email
		})
	})

exports.deleteUserDoc = functions
	.region('europe-west1')
	.auth.user()
	.onDelete((user) => {
		db.collection('users').doc(user.uid).delete()
		db.collection('groups')
			.where('users', 'array-contains', user.email)
			.get()
			.then((data) => {
				if (data.docs.length > 0) {
					data.docs.forEach((doc) => {
						db.collection('groups')
							.doc(doc.id)
							.update({
								users: admin.firestore.FieldValue.arrayRemove(user.email)
							})
							.then((updatedDoc) => {
								if (updatedDoc.data().owner === user.email && updatedDoc.data().users.length >= 1) {
									db.collection('groups').doc(doc.id).update({ owner: updatedDoc.data().users[0] })
								}
							})
					})
				}
			})
	})

exports.incrementCommentCount = functions
	.region('europe-west1')
	.firestore.document('/messages/{mid}/comments/{cid}')
	.onCreate((snap, context) => {
		db.collection('messages')
			.doc(context.params.mid)
			.update({ commentCount: admin.firestore.FieldValue.increment(1) })
	})

exports.decrementCommentCount = functions
	.region('europe-west1')
	.firestore.document('/messages/{mid}/comments/{cid}')
	.onDelete((snap, context) => {
		db.collection('messages')
			.doc(context.params.mid)
			.update({ commentCount: admin.firestore.FieldValue.increment(-1) })
	})

// exports.deleteEmptyGroup = functions
// 	.region('europe-west1')
// 	.firestore.document('/groups/{gid}')
// 	.onUpdate((change, context) => {
// 		const groupMembers = change.after.data().users
// 		if (groupMembers.length === 0) {
// 			db.collection('groups').doc(context.params.gid).delete()
// 		}
// 	})

// exports.deleteEmptyTask = functions
// 	.region('europe-west1')
// 	.firestore.document('/tasks/{tid}')
// 	.onUpdate((change, context) => {
// 		const taskUsers = change.after.data().users
// 		if (taskUsers.length === 0) {
// 			db.collection('tasks').doc(context.params.tid).delete()
// 		}
// 	})

exports.deleteOldTasks = functions
	.region('europe-west1')
	.pubsub.schedule('every 24 hours')
	.onRun(() => {
		const today = admin.firestore.FieldValue.serverTimestamp()
		const beforeMonth = today.setMonth(today.getMonth() + 1)
		db.collection('tasks')
			.where('date', '<=', beforeMonth)
			.get()
			.then((data) => {
				data.docs.forEach((doc) => {
					db.collection('tasks').doc(doc.id).delete()
				})
			})
	})
