<template>
    <div class="auth-layout">
        <AuthNavbar :button="button" />
        <div class="message-box">
            <div class="message"
                :class="{
                    'error': error
                }" 
                v-if="message != null"
            >{{ message }}
            </div>
        </div>
        <router-view />
    </div>
</template>

<script>
import AuthNavbar from '@/components/AuthNavbar'
import messages from '@/utils/messages'

export default {
    components: {
        AuthNavbar
    },
    data: () => ({
        message: null,
        error: false
    }),
    computed: {
        button() {
            return this.$route.meta.button
        },
        errorCode() {
            return this.$store.getters.error
        }
    },
    watch: {
        errorCode(fbError) {
            console.log(fbError.code)
            this.message = messages[fbError.code] || 'Что-то пошло не так'
            this.error = true
        }
    },
    mounted() {
        if (messages[this.$route.query.message]) {
            this.message = messages[this.$route.query.message]
            this.error = false
        }
    }
}
</script>

<style lang="scss" scoped>
.auth-layout {
    width: 100vw;
    height: 100vh;
    background-color: #eee;

    .message-box {
        height: 50px;

        .message {
            padding: 15px 30px;
            text-align: right;
        }
    }

    .error {
        color: red;
    }
}
</style>