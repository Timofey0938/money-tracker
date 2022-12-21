import firebase from 'firebase'

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            state.info = {}
        }
    },
    actions: {
        async fetchInfo({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                commit('setInfo', info)
            } catch (e) {
                throw e
            }
        },
        async updateInfo({dispatch, getters}, toUpdate) {
            try {
                const uid = await dispatch('getUid')
                const updatedInfo = {...getters.info, ...toUpdate}
                await firebase.database().ref(`/users/${uid}/info`).update(updatedInfo)
                commit('setInfo', updatedInfo)
            } catch (e) {
                throw e
            }
        }
    },
    getters: {
        info: s => s.info
    }
}