<template>
    <div class="dashboard-wrapper dashboard-table mt-15">
        <div class="dashboard-top">
           
        </div>
        <div class="clearfix"></div>
        <div class="dashboard-content mt-10">
            <el-row :gutter="20">
                <el-col :span="13">
                    <div class="search-box pull-left">
                        <i class="fe-search"></i>
                        <input type="text" placeholder="Search ...">
                    </div>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="name" label="Name"></el-table-column>
                        <el-table-column prop="product" label="Products"> </el-table-column>
                        <el-table-column prop="by" label="Added by"> </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                    <el-button size="mini" @click="editItem(scope.$index, scope.row)">Edit</el-button>
                                    <el-button size="mini" type="danger" @click="deleteModal(scope.$index, scope.row.id)">Delete</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="11">
                   <div class="form-box">
                        <div class="form-title mb-40">Add Category</div>
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <div class="input-error-box" v-if="error">
                                    <i class="fe-alert-circle"></i>
                                    <span>{{errorMessage}}</span>
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="input-box" :class="{ 'input-box--error': $v.name.$error }">
                                    <i class="fe-layers"></i>
                                    <input type="text" placeholder="New Category name here ..." v-model.trim.lazy="$v.name.$model">
                                </div>
                            </el-col>
                        </el-row>
                        <div class="btn btn-primary disabled" v-if="$v.$anyError">Save Category</div>
                        <div class="btn btn-primary disabled" v-else-if="submitting"><loader/></div>
                        <div class="btn btn-primary" @click="submit" v-else>Save Category</div>
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

    export default {
        components: {
            vueCustomScrollbar,
            Loader,

        },
        data() {
            return {
                name: "",
                tableData: [],
                id: null,

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
        },
        methods: {
            submit(){
                this.error = false;
                this.submitting = true;
                let postdata = {
                   name: this.name
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
                this.$http.post('product/save-category', formdata)
                .then(res => {
                    this.id = null
                    this.submitting = false
                    this.$notify({
                        title: 'Success',
                        message: "Category saved",
                        type: 'success'
                    });
                    this.resetform()
                    this.getCategories()
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

            getCategories(){
                this.$http.get('product/category/list')
                .then(res => {
                    let data =  res.body.result
                    data.map(item => {
                        if(item.addedby){
                            item.by = item.addedby.firstname+' '+item.addedby.lastname
                            item.product = item.products.length
                        }
                    })
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
                this.id = item.id
            },
            deleteItem(i, id){
                this.$http.post('product/category/remove', {id})
                .then(res => {
                     this.tableData.splice(i, 1);
                    this.$notify({
                        title: 'Success',
                        message: "Category deleted",
                        type: 'success'
                    });
                })
                .catch(err => {
                    this.$notify({
                        title: 'Failed',
                        message: "Unable to delete category",
                        type: 'error'
                    });
                })
            },
            deleteModal(i, id) {
                this.$confirm('This will permanently delete the category. Continue?', 'Warning', {
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
            }
        },
        created() {
          this.getCategories()  
        },
    }
</script>


<style lang="scss">
    
</style>