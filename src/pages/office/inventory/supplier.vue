<template>
    <div class="dashboard-wrapper dashboard-table mt-15">
        <div class="dashboard-top">
        </div>
        <div class="clearfix"></div>
        <div class="dashboard-content mt-10">
           <el-row>
               <el-col :span="14">
                   <div class="search-box pull-left">
                        <i class="fe-search"></i>
                        <input v-model="q" type="text" placeholder="Search ..." @keyup="search()">
                    </div>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="name" label="Name"></el-table-column>
                        <el-table-column prop="email" label="Email"> </el-table-column>
                        <el-table-column prop="phone" label="Phone"> </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                    <el-button size="mini" @click="editItem(scope.$index, scope.row)">Edit</el-button>
                                    <el-button size="mini" type="danger" @click="deleteModal(scope.$index, scope.row.id)">Delete</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
               </el-col>
               <el-col :span="10">
                   <div class="form-box">
                        <div class="form-title mb-40">Add Supplier</div>
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <div class="input-error-box" v-if="error">
                                    <i class="fe-alert-circle"></i>
                                    <span>{{errorMessage}}</span>
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="input-box" :class="{ 'input-box--error': $v.name.$error }">
                                    <i class="fe-user"></i>
                                    <input type="text" placeholder="Supplier's Full Name ..." v-model.lazy="$v.name.$model">
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="input-box" :class="{ 'input-box--error': $v.email.$error }">
                                    <i class="fe-mail"></i>
                                    <input type="text" placeholder="Supplier's Email Address ..." v-model.trim.lazy="$v.email.$model">
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="input-box" :class="{ 'input-box--error': $v.phone.$error }">
                                    <i class="fe-phone"></i>
                                    <input type="text" placeholder="Supplier's Phone Number ..." v-model.trim.lazy="$v.phone.$model">
                                </div>
                            </el-col>
                        </el-row>
                       <el-button round size="medium" v-if="$v.$anyError" class="disabled">Save Supplier</el-button>
                        <el-button round size="medium" v-else-if="submitting" class="disabled"><loader/></el-button>
                        <el-button round size="medium" v-else @click="submit">Save Supplier</el-button>

                   </div>
               </el-col>
           </el-row>
        </div>
    </div>
</template>

<script>
    import vueCustomScrollbar from 'vue-custom-scrollbar';
    import Loader from '@/components/loader.vue'
    import { required, alpha, helpers, email } from 'vuelidate/lib/validators'

    export default {
        components: {
            vueCustomScrollbar,
            Loader
        },
        data() {
            return {
                name: "",
                email: "",
                phone: "",
                tableData: [],
                id: null,
                q:'',

                submitting: false,
                error: false,
                errorMessage: null
            }
        },
        validations: {
            name: {
                required,
                alphaSpace:helpers.regex('alphaSpace', /^[a-z0-9_ ]*$/i),
            },
            email: {
                email
            },
            phone: {
            }
        },
        methods: {
            submit(){
                this.error = false;
                this.submitting = true;
                let postdata = {
                   name: this.name,
                   email: this.email,
                   phone: this.phone
                }
                this.$v.$touch()
                if (this.$v.$invalid) {
                   this.submitting = false;
                } else {
                   this.saveCategory(postdata)
                }
            },
            saveCategory(formdata){
                formdata.id = this.id
                this.$http.post('product/save-supplier', formdata)
                .then(res => {
                    this.id = null
                    this.submitting = false
                    this.resetform
                    this.$notify({
                        title: 'Success',
                        message: "Supplier saved",
                        type: 'success'
                    });
                    this.resetform()
                    this.getSuppliers()
                })
                .catch((err) => {
                    this.error = true
                    this.errorMessage = err.body.message
                    this.submitting =  false;
                })
            },

            resetform(){
                this.name = ""
                this.$nextTick(() => { this.$v.$reset() })
            },

            getSuppliers(){
                this.$http.get('product/supplier/list')
                .then(res => {
                    let data =  res.body.result
                    this.tableData = data
                })
                .catch(err => {
                    this.$notify({
                        title: 'Failed',
                        message: "Unable to load data",
                        type: 'error'
                    });
                })

            },
            editItem(i, item){
                this.name = item.name
                this.email = item.email
                this.phone = item.phone
                this.id = item.id
            },
            deleteItem(i, id){
                this.$http.post('product/supplier/remove', {id})
                .then(res => {
                     this.tableData.splice(i, 1);
                    this.$notify({
                        title: 'Success',
                        message: "Supplier deleted",
                        type: 'success'
                    });
                })
                .catch(err => {
                    this.$notify({
                        title: 'Failed',
                        message: "Unable to delete supplier",
                        type: 'error'
                    });
                })
            },
            deleteModal(i, id) {
                this.$confirm('This will permanently delete the supplier. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                })
                .then(() => {
                    this.deleteItem(i, id)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Delete canceled'
                    });          
                });
            },
            search(){
                this.$http.get('product/supplier/search', {
                    params: {q: this.q}
                })
                .then(res => {
                    let data =  res.body.result
                    this.tableData = data
                })
            }
        },
        created() {
          this.getSuppliers()  
        },
    }
</script>


<style lang="scss">
    
</style>