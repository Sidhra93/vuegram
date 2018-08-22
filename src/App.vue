<template>
    <div id="app">
        <Navigation v-if="currentUser" />
        <router-view/>
    </div>
</template>

<script>
import Navigation from '@/components/Navigation'

import { mapState } from 'vuex'

export default {
    name: 'App',
    components: { Navigation },
    computed: {
        ...mapState(['currentUser'])
    }
}
</script>
