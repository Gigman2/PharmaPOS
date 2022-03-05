<template>
    <div class="dashboard-wrapper dashboard-table mt-15">
        <div class="dashboard-top">
           
        </div>
        <div class="clearfix"></div>
        <div class="dashboard-content mt-10">
            <el-row :gutter="20">
                <el-col :span="14">
                    <div class="form-box">
                        <div class="form-title mb-40">Business Information</div>
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <div class="input-error-box" v-if="error">
                                    <i class="fe-alert-circle"></i>
                                    <span>{{errorMessage}}</span>
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="input-box" :class="{ 'input-box--error': $v.name.$error }">
                                    <i class="fe-briefcase"></i>
                                    <input type="text" placeholder="Business name here ..." v-model.trim.lazy="$v.name.$model">
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="input-box" :class="{ 'input-box--error': $v.address.$error }">
                                    <i class="fe-map-pin"></i>
                                    <input type="text" placeholder="Address" v-model.trim.lazy="$v.address.$model">
                                </div>
                            </el-col>
                            <el-col :span="14">
                                <div class="input-box" :class="{ 'input-box--error': $v.email.$error }">
                                    <i class="fe-mail"></i>
                                    <input type="text" placeholder="Email" v-model.trim.lazy="$v.email.$model">
                                </div>
                            </el-col>
                            <el-col :span="10">
                                <div class="input-box" :class="{ 'input-box--error': $v.phone.$error }">
                                    <i class="fe-phone"></i>
                                    <input type="text" placeholder="Phone Number" v-model.trim.lazy="$v.phone.$model">
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="input-box" :class="{ 'input-box--error': $v.manager.$error }">
                                    <i class="fe-user"></i>
                                    <input type="text" placeholder="Manager's Full Name" v-model.trim.lazy="$v.manager.$model">
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="input-box-file">
                                    <input id="logo" type="file" class="hidden" @change="uploadLogo" accept="image/png">
                                    <label for="logo">
                                        <div class="file-button">
                                            <i class="fe-inbox"></i>
                                            Upload Logo
                                        </div>
                                    </label>
                                    <div class="file-name">{{uploadedImage}}</div>
                                </div>
                            </el-col>
                        </el-row>
                        <div class="btn btn-primary disabled" v-if="$v.$anyError">Save Infomation</div>
                        <div class="btn btn-primary disabled" v-else-if="submitting"><loader/></div>
                        <div class="btn btn-primary" @click="submit" v-else>Save Infomation</div>
                   </div>
                </el-col>
                <el-col :span="10">
                    <div class="preview">
                        <div class="preview-box">
                            <img :src="bucket+preview" alt="" srcset="">
                        </div>
                    </div>
                    <div class="information-preview">
                        <h2 class="mb-2 form-title">{{name}}</h2>
                        <div class="mb-3">{{manager}}</div>
                        <div class="mb-3">{{address}}</div>
                        <div class="mb-3">{{email}}</div>
                        <div class="mb-3">{{phone}}</div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import vueCustomScrollbar from 'vue-custom-scrollbar';
    import Loader from '@/components/loader.vue'
    import { required, alpha, helpers } from 'vuelidate/lib/validators'
    import {mapGetters} from 'vuex';

    export default {
        components: {
            vueCustomScrollbar,
            Loader,

        },
        data() {
            return {
                name: "",
                address: "",
                email: "",
                phone: "",
                manager:"",
                logo: "",
                id: null,

                submitting: false,
                error: false,
                errorMessage: null,
                uploadedImage:'',


                businessLogo: '',
                preview: ''
            }
        },
        validations: {
            name: {
                required,
            },
            address: {
                required,
            },
            email: {
                required,
            },
            phone: {
                
            },
            manager: {
                
            },
            logo: {
                
            }, 
        },
        computed: {
            ...mapGetters({bucket: 'GET_BUCKET'})
        },
        methods: {
            submit(){
                this.error = false;
                this.submitting = true;
                let postdata = {
                   name: this.name,
                   email: this.email,
                   phone: this.phone,
                   address: this.address,
                   manager: this.manager,
                }
                if(this.logo != null){
                    postdata.logo = this.logo
                }
                this.$v.$touch()
                if (this.$v.$invalid) {
                   this.submitting = false;
                } else {
                   this.saveInformation(postdata)
                }
            },
            saveInformation(payload){
                payload.id = this.id
                let formData = new FormData(); 
                const fields = Object.entries(payload);
                for(const index in fields){
                    formData.append(fields[index][0], fields[index][1]);
                }
                this.$http.post('setup/business-save', formData)
                .then(res => {
                    this.id = null
                    this.submitting = false
                    this.$notify({
                        title: 'Success',
                        message: "Business information updated",
                        type: 'success'
                    });
                    this.resetform()
                    this.getInformationBack()
                })
                .catch((err) => {
                    this.error = true
                    this.errorMessage = err.body.message
                    this.submitting =  false;
                })
            },
            uploadLogo(e){
                let file = e.target.files[0]
                this.uploadedImage = file.name;
                this.logo = file
            },

            resetform(){
                this.name = "",
                this.email = "",
                this.phone = "",
                this.address = "",
                this.manager = "",
                this.$nextTick(() => { this.$v.$reset() })
            },

            getInformationBack(){
                this.$http.get('setup/business-info')
                .then(res => {
                    let data =  res.body.result
                    if(data != null){
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

            },
            setData(data){
                this.id = data.id
                this.name = data.name
                this.email = data.email
                this.phone = data.phone
                this.address = data.address
                this.manager = data.manager
                this.preview = data.logo
            }
        },
        created() {
          this.getInformationBack()  
        },
    }
</script>


<style lang="scss" scoped>
    .input-box{
        width: 100% !important;
    }

    .preview-box{
        width: 120px;
        height: auto;
    }

</style>