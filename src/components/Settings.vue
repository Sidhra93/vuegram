<template>
    <section id="setting">
        <div class="col1">
            <h4>Settings</h4>
            <p>Update your profile</p>

            <transition name="fade">
                <p class="success" v-if="showSuccess">profile updated</p>
            </transition>

            <form @submit.prevent>
                <label for="name">Name</label>
                <input type="text" id="name" v-model.trim="name" :placeholder="userProfile.name">

                <button @click="updateProfile">Update Profile</button>
            </form>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data () {
        return {
            name: '',
            showSuccess: false
        }
    },
    computed: {
        ...mapState(['userProfile'])
    },
    methods: {
        updateProfile () {
            this.$store.dispatch('updateProfile', {
                name: this.name !== '' ? this.name : this.userProfile.name
            })

            this.name = ''
            
            this.showSuccess = true

            setTimeout(() => {
                this.showSuccess = false
            }, 2000)
        }
    }
}
</script>