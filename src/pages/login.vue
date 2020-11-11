<template>
    <div class="form-box login shadow shadow-3">
        <h2>SluxiPOS</h2>
        <h4>login in to your dashboard</h4>
        
        <div class="form-input-group">
            <div class="input-error-box" v-if="error">
                <i class="fe-alert-circle"></i>
                <span>{{errorMessage}}</span>
            </div>
            <div class="input-box" :class="{ 'input-box--error': $v.username.$error }">
                <i class="fe-user"></i>
                <input type="email" placeholder="Account ID" v-model.trim.lazy="$v.username.$model">
            </div>

            <div class="input-box" :class="{ 'input-box--error': $v.password.$error }">
                <i class="fe-lock"></i>
                <input type="password" placeholder="Password here ..." v-model.trim.lazy="$v.password.$model">
            </div>

            <div class="btn btn-primary disabled" v-if="$v.$anyError">Login</div>
            <div class="btn btn-primary disabled" v-else-if="submitting"><loader/></div>
            <div class="btn btn-primary" @click="submit" @keyup.enter="submit" v-else>Login</div>
        </div>
    </div>
</template>

<script>
    import { required } from 'vuelidate/lib/validators'
    import Loader from '@/components/loader.vue'
    export default {
        components: {
            Loader
        },
        data(){
            return {
                username: '',
                password: '',
                submitting: false,
                error: false,
                errorMessage: ''
            }
        },
        validations: {
            username: {
                required,
            },
            password: {
                required,
            }
        },
        methods: {
            submit(){
                this.error = false;
                this.submitting = true;
                let postdata = {
                    email: this.username,
                    password: this.password
                }
                this.$v.$touch()
                if (this.$v.$invalid) {
                   this.submitting = false;
                } else {
                    localStorage.setItem('username', this.username)
                   this.login(postdata)
                }
            },
            login(formdata){
                this.$http.post('users/auth', formdata)
                .then(res => {
                    localStorage.setItem('access_token', res.data.token)
                    localStorage.setItem('user', JSON.stringify(res.data.result.result))
                    this.$store.commit('SET_SESSION')
                    this.submitting = false
                    this.$router.push({name: 'pos-home'})
                })
                .catch(err => {
                    this.error = true;
                    this.errorMessage = err.body.message
                    this.submitting =  false;
                })
            },
            getPermission(){
                this.$http.get('users/user-permission')
                .then(async res => {
                    let result = res.body.result,
                    permissions = {}
                    await Promise.all(result.map(item => {
                        delete item.createdAt
                        delete item.updatedAt
                        delete item.roleId
                        delete item.userId
                        if(item.state == '1'){
                            item.state = true
                        }else{
                            item.state = false
                        }
                        permissions[item.resourceId] = item
                    }))

                    localStorage.setItem('account_permissions', JSON.stringify(permissions))
                    this.$store.commit('SET_PERMISSION')
                    console.log(permissions[38])

                    this.$router.push({name: 'pos-home'}) 

                })
            },
            getBusiness(){
                this.$http.get('setup/business-info')
                .then(res => {
                    let data =  res.body.result
                    if(data != null){
                        localStorage.setItem('business', JSON.stringify(data))
                        this.$store.commit('SET_BUSINESS')
                        this.setData(data)
                    }
                })
                .catch(err => {
                    this.$notify({
                        title: 'Failed',
                        message: "Unable to load data",
                        type: 'error'
                    });
                })
            }
        },
        created() {
            this.username = localStorage.getItem('username')
        },
    }
</script>

<style lang="scss">
    .access{
        position: relative;
                &.bg-image{
            background-image: url('../assets/images/national.jpg');
        }
        
        .form-box.login{
            h2{
                margin-bottom: 10px;
                font-size: 1.7em;
                font-family: Do_Hyeon;
                letter-spacing: 1.1px;
            }

            h4{
                margin-top: 10px;
                font-weight: 500;
                color:#5b6f83
            }
        }
    }
</style>