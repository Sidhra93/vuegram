<template>
    <div id="login">
        <section>
            <div class="col1">
                <h4>Vuegram</h4>
                <p>Welcome to the Vuegram app</p>
            </div>
            <div class="col2">
                <form @submit.prevent>
                    <h4>Welcome Back</h4>

                    <label for="email1">Email</label>
                    <input type="text" placeholder="you@email.com" id="email1" v-model.trim="loginForm.email">

                    <label for="password1">Password</label>
                    <input type="password" placeholder="******" id="password1" v-model.trim="loginForm.password">

                    <button class="button">Log In</button>

                    <div class="extras">
                        <a>Forgot Password</a>
                        <a>Create an Account</a>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data () {
        return {
           loginForm: {
               email: '',
               password: ''
           }
        }
    }
}
</script>