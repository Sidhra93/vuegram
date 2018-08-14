<template>
    <div id="login">
        <transition name="fade">
            <div class="loading" v-if="performingRequest">
                <p>Loading...</p>
            </div>
        </transition>
        <section>
            <div class="col1">
                <h4>Vuegram</h4>
                <p>Welcome to the Vuegram app</p>
            </div>
            <div class="col2" :class="{ 'signup-form': !showLoginForm && !showForgotPassword }">
                <form @submit.prevent v-if="showLoginForm">
                    <h4>Welcome Back</h4>

                    <label for="email1">Email</label>
                    <input type="email" placeholder="you@email.com" id="email1" v-model.trim="loginForm.email">

                    <label for="password1">Password</label>
                    <input type="password" placeholder="******" id="password1" v-model.trim="loginForm.password">

                    <button class="button" @click="login">Log In</button>

                    <div class="extras">
                        <a @click="togglePasswordReset">Forgot Password</a>
                        <a @click="toggleForm">Create an Account</a>
                    </div>
                </form>
                <form @submit.prevent v-if="!showLoginForm && !showForgotPassword">
                    <h4>Get Started</h4>

                    <label for="name">Name</label>
                    <input type="text" placeholder="Name" id="name" v-model.trim="signupForm.name">

                    <label for="email2">Email</label>
                    <input type="email" placeholder="you@email.com" id="email2" v-model.trim="signupForm.email">

                    <label for="password2">Password</label>
                    <input type="password" placeholder="min 6 characters" id="password2" v-model.trim="signupForm.password">

                    <button class="button" @click="signup">Sign Up</button>

                    <div class="extras">
                        <a @click="toggleForm">Back to Log In</a>
                        
                    </div>
                </form>
                <form @submit.prevent class="password-reset" v-if="showForgotPassword">
                    <div v-if="!passwordResetSuccess">
                        <h4>Reset Password</h4>
                        <p>We will send you an email to reset your password</p>

                        <label for="email3">Email</label>
                        <input type="email" placeholder="you@email.com" id="email3" v-model.trim="passwordForm.email">

                        <button @click="resetPassword" class="button">Submit</button>

                        <div class="extras">
                            <a @click="togglePasswordReset">Back to Log In</a>
                        </div>
                    </div>
                    <div v-else>
                        <h4>Email Sent</h4>
                        <p>Check your email for a link to reset your password</p>
                        <button class="button" @click="togglePasswordReset">Back to Log In</button>
                    </div>
                </form>
                <transition name="fade">
                    <div class="error-msg" v-if="errorMsg !== ''">
                        <p>{{ errorMsg }}</p>
                    </div>
                </transition>
            </div>
        </section>
    </div>
</template>

<script>
const fb = require('../firebaseConfig.js')

export default {
    data () {
        return {
           loginForm: {
               email: '',
               password: ''
           },
           signupForm: {
               name: '',
               email: '',
               password: ''
           },
           passwordForm: {
               email: ''
           },
           showLoginForm: true,
           showForgotPassword: false,
           passwordResetSuccess: false,
           performingRequest: false,
           errorMsg: ''
        }
    },

    methods: {
        toggleForm () {
            this.errorMsg = ''
            this.showLoginForm = !this.showLoginForm
        },
        togglePasswordReset () {
            this.showForgotPassword = !this.showForgotPassword
            this.showLoginForm = !this.showLoginForm
            this.errorMsg = ''
            
        },
        login () {
            this.performingRequest = true
            fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password)
                .then(user => {
                    this.$store.commit('setCurrentUser', user.user)
                    this.$store.dispatch('fetchUserProfile')
                    this.performingRequest = false
                    this.$router.push('/dashboard')
                }).catch(err => {
                    console.log(err)
                    this.performingRequest = false
                    this.errorMsg = err.message                  
                })
        },
        signup () {
            this.performingRequest = true
            fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password)
                .then(user => {
                    this.$store.commit('setCurrentUser', user.user)
                    fb.usersCollection.doc(user.user.uid).set({
                        name: this.signupForm.name
                    }).then(() => {
                        this.$store.dispatch('fetchUserProfile')
                        this.performingRequest = false                    
                        this.$router.push('/dashboard')
                    }).catch(err => {
                        console.log(err)
                        this.performingRequest = false
                        this.errorMsg = err.message              
                    })
                }).catch(err => {
                    console.log(err)
                })
        },
        resetPassword () {
            this.performingRequest = true

            fb.auth.sendPasswordResetEmail(this.passwordForm.email).then(() => {
                this.performingRequest = false
                this.passwordResetSuccess = true
                this.passwordForm.email = ''
            }).catch(err => {
                console.log(err)
                this.performingRequest = true
                this.errorMsg = err.message
            })
        }
    }
}
</script>