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
                <input type="email" placeholder="Email here ..." v-model.trim.lazy="$v.username.$model">
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
    import { required, email } from 'vuelidate/lib/validators'
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
                email
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
            }
        },
    }
</script>

<style lang="scss">
    .access{
        position: relative;
        &.bg-image{
            background-image: url('../assets/images/retail.jpg');
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