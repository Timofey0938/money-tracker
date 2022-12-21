import firebase from 'firebase'

export default {
    actions: {
        async login({dispatch, commit}, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async signup({dispatch, commit}, {email, password, userName}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    card: 0,
                    cash: 0,
                    total: 0,
                    userName
                })
                
                await firebase.database().ref(`/users/${uid}/categories`).push({
                    name: 'Жилье',
                    img: 'home',
                    limit: 0
                })
                await firebase.database().ref(`/users/${uid}/categories`).push({
                    name: 'Еда',
                    img: 'lunch_dining',
                    limit: 0
                })
                await firebase.database().ref(`/users/${uid}/categories`).push({
                    name: 'Транспорт',
                    img: 'directions_car',
                    limit: 0
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        getUid() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        },
        async logout({commit}) {
            await firebase.auth().signOut()
            commit('clearInfo')
        }
    }
}