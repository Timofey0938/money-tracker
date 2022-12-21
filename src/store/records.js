import firebase from 'firebase'

export default {
    actions: {
        async addRecord({dispatch}, recordData) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/records`).push(recordData)
            } catch (e) {
                throw e
            }
        },
        async fetchRecords({dispatch}) {
            try {
                const uid = await dispatch('getUid')
                const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
                return Object.keys(records).map(key => ({...records[key], id: key}))
            } catch (e) {
                throw e
            }
        }
    }
}