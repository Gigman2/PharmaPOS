<template>
    <div class="dashboard-wrapper mt-15">
        
    </div>
</template>

<script>
    import moment from 'moment';
    import { mapGetters } from 'vuex';
    
    export default {
        data() {
            return {
                accountData: [
                ]
            }
        },
        components: {
            ...mapGetters({user: 'USER', roler: 'ROLE'})
        },
        methods: {
            
        },
        created() {
          
        },
    }
</script>


<style lang="scss">

</style>