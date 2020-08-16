<template>
  <div class="dashboard-wrapper mt-15">
    <div class="clearfix"></div>
    <div class="dashboard-content p-20">
      <div class="form-box">
        <el-row>
          <el-col :span="13">
            <div class="pull-left">
              <router-link :to="{name: 'office-sales_customer'}">
                <i class="fe-arrow-left dashboard-top--icon"></i>
              </router-link>
            </div>
            <div class="form-title mb-40">Customer Information</div>
            <el-row :gutter="20">
              <el-col :span="24">
                <div class="input-error-box" v-if="error">
                  <i class="fe-alert-circle"></i>
                  <span>{{errorMessage}}</span>
                </div>
              </el-col>
              <!-- //firstname -->
              <el-col :span="24">
                <div class="input-box" :class="{ 'input-box--error': $v.email.$error }">
                  <i class="el-icon-message"></i>
                  <input
                    type="text"
                    placeholder="Email here ..."
                    v-model.trim.lazy="$v.email.$model"
                  />
                </div>
              </el-col>
              <!-- <el-col :span="15">
                <div class="input-box-el" :class="{ 'input-box--error': $v.category.$error }">
                  <i class="fe-layers"></i>
                  <el-select
                    v-model.trim.lazy="$v.category.$model"
                    filterable
                    placeholder="Category ..."
                  >
                    <el-option
                      v-for="item in categories"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    ></el-option>
                  </el-select>
                </div>
              </el-col> -->
              <el-col :span="10">
                <div class="input-box" :class="{ 'input-box--error': $v.firstname.$error }">
                  <i class="el-icon-user"></i>
                  <input type="text" placeholder="First Name" v-model.trim.lazy="$v.firstname.$model" />
                </div>
              </el-col>
              <el-col :span="10">
                <div class="input-box" :class="{ 'input-box--error': $v.lastname.$error }">
                  <i class="el-icon-user"></i>
                  <input type="text" placeholder="Last name" v-model.trim.lazy="$v.lastname.$model" />
                </div>
              </el-col>
            </el-row>
            <div class="hoz-line dark"></div>
            <el-row :gutter="20" class="mt-20">
              <!-- <el-col :span="10">
                <div class="input-box-el" :class="{ 'input-box--error': $v.supplier.$error }">
                  <i class="fe-square"></i>
                  <el-select
                    v-model.trim.lazy="$v.supplier.$model"
                    filterable
                    placeholder="Supplier ..."
                  >
                    <el-option
                      v-for="item in suppliers"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    ></el-option>
                  </el-select>
                </div>
              </el-col> -->
              <!-- <el-col :span="14">
                <div class="input-box" :class="{ 'input-box--error': $v.manufacturer.$error }">
                  <i class="fe-square"></i>
                  <input
                    type="text"
                    placeholder="Manufacturer"
                    v-model.trim.lazy="$v.manufacturer.$model"
                  />
                </div>
              </el-col> -->

              <el-col :span="8">
                <div class="input-box" :class="{ 'input-box--error': $v.phone.$error }">
                  <i class="el-icon-phone-outline"></i>
                  <input type="text" placeholder="Phone" v-model.trim.lazy="$v.phone.$model" />
                </div>
              </el-col>

              <!-- <el-col :span="8">
                <div class="input-box" :class="{ 'input-box--error': $v.quantity.$error }">
                  <i class="fe-square"></i>
                  <input type="text" placeholder="Quantity" v-model.trim.lazy="$v.quantity.$model" />
                </div>
              </el-col> -->

              <!-- <el-col :span="8">
                <div class="input-box" :class="{ 'input-box--error': $v.restock.$error }">
                  <i class="fe-square"></i>
                  <input
                    type="text"
                    placeholder="Restock limit"
                    v-model.trim.lazy="$v.restock.$model"
                  />
                </div>
              </el-col> -->

              <!-- <el-col :span="16">
                <div class="input-box" :class="{ 'input-box--error': $v.shelf.$error }">
                  <i class="fe-square"></i>
                  <input
                    type="text"
                    placeholder="Shelf-Row-Column"
                    v-model.trim.lazy="$v.shelf.$model"
                  />
                </div>
              </el-col> -->
            </el-row>

            <div class="btn btn-primary disabled" v-if="$v.$anyError">Add Customer</div>
            <div class="btn btn-primary disabled" v-else-if="submitting">
              <loader />
            </div>
            <div class="btn btn-primary" @click="submit" v-else>Add Customer</div>
          </el-col>
          <el-col :span="10"></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { required, helpers } from "vuelidate/lib/validators";
import Loader from "@/components/loader.vue";
import vueCustomScrollbar from "vue-custom-scrollbar";
export default {
  components: {
    vueCustomScrollbar,
    Loader,
  },
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      lastPurchase: "",
    //   purchases: "",

      // avatarImage: '',
      // categories: [],
      // suppliers: [],
      submitting: false,
      error: false,
      errorMessage: null,
    };
  },
  validations: {
    firstname: {
      required,
    },

    lastname: {
      required,
    },
    email: {
    //   required,
      // alphaChar:helpers.regex('alphaChar',  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    },

    phone: {
      required,
    },

   
  },
  methods: {
    submit() {
      this.error = false;
      this.submitting = true;
      let postdata = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        phone: this.phone,
        lastPurchase: this.lastPurchase,
        // purchases: this.purchases,
      };

    

      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitting = false;
      } else {
        this.saveCustomer(postdata);
      }
    },
   
    saveCustomer(payload) {
      let formData = new FormData();
      const fields = Object.entries(payload);
    //   for (const index in fields) {
    //     formData.append(fields[index][0], fields[index][1]);
    //   }
      this.$http
        .post("sales/new", formData)
        .then((res) => {
          this.submitting = false;
          this.$notify({
            title: "Success",
            message: "Customer saved",
            type: "success",
          });
          this.resetform();
        })
        .catch((err) => {
          this.error = true;
          this.errorMessage = err.body.message;
          this.submitting = false;
        });
    },
    // getCategories() {
    //   this.$http.get("product/category/list?type=simple").then((res) => {
    //     let data = res.body.result;
    //     data.map((item, i) => {
    //       let unit = {
    //         key: item.id,
    //         value: item.name,
    //       };
    //       this.categories[i] = unit;
    //     });
    //   });
    // },
    // getSuppliers() {
    //   this.$http.get("product/supplier/list?type=simple").then((res) => {
    //     let data = res.body.result;
    //     data.map((item, i) => {
    //       let unit = {
    //         key: item.id,
    //         value: item.name,
    //       };
    //       this.suppliers[i] = unit;
    //     });
    //   });
    // },
    resetform() {
      this.firstname= "",
      this.lastname= "",
      this.email= "",
      this.phone="",
    //   lastPurchase: "",
    //   purchases: "",

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
  },
  created() {
    // this.getCategories();
    // this.getSuppliers();
  },
};
</script>



<style lang="scss" scoped>
.form-box {
  .input-box {
    width: 100% !important;
  }
  .input-error-box {
    width: 100% !important;
  }
}
.avatar-box {
  width: 150px;
  height: 150px;
  background-color: #f0f0f0;
  margin: 0 auto;
  border-radius: 5px;
}
.form-title {
  font-size: 1.25em;
  font-family: "Open sans";
  font-weight: bold;
  color: slategray;
}
.hoz-line {
  margin-top: 0;
}

.preview {
  input[type="file"] {
    display: none;
  }
}

.preview-box {
  width: 150px;
  height: 150px;
  background-color: #f0f0f0;
  margin: 0 auto;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
  img {
    width: 100%;
  }
}

.product-overview {
  padding: 0 30px;
  &--name {
    text-align: center;
    font-size: 1.8em;
  }
  &--double {
    display: flex;
    justify-content: space-between;
  }
  &--tags {
    text-align: left;
    .el-tag {
      margin-right: 10px;
    }
  }
  &--price {
    font-size: 1.2em;
    font-weight: bold;
  }
}

.product {
  &--sub {
    &--caption {
      color: silver;
      margin-right: 10px;
      font-size: 1em;
    }
    &--name {
      font-size: 1.15em;
    }
  }
}
</style>