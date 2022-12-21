import firebase from 'firebase'

export default {
    actions: {
        async fetchCategories({dispatch}) {
            try {
                const uid = await dispatch('getUid')
                const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
                return Object.keys(categories).map(key => ({...categories[key], id: key}))
            } catch (e) {
                throw e
            }
        },
        async addCategory({dispatch}, {name, img}) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/categories`).push({ name, img, limit: 0 })
            } catch (e) {
                throw e
            }
        },
        async updateCategory({dispatch}, {id, name, img, limit}) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ name, img, limit })
            } catch (e) {
                throw e
            }
        },
        async deleteCategory({dispatch}, id) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/categories`).child(id).remove()
            } catch (e) {
                throw e
            }
        }
    }
}