<template>
  <div id="app">
    <router-view/>
  </div>
</template> 

<style lang="scss">
 
  $font-path: './assets/fonts/';  

    @font-face {
      font-family: Do_Hyeon;
      src: url($font-path+'Do_Hyeon/DoHyeon-Regular.ttf');
    }

    @font-face {
      font-family: 'Open sans';
      src: url($font-path+'Open_Sans/OpenSans-Regular.ttf');
    }

  body{
    padding: 0;
    margin: 0;
    font-family: 'Open sans';
  }


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.bg{
  width: 100vw;
  height: 100vh;
  background-color: whitesmoke;
  overflow: hidden;
  &.bg-image{
    background-size: cover;;
  }
}

body {
  background: #f1f1f1;
  text-align: center;
}

.hoz-line{
  width: 350px;
  height: 1px;
  background-color: white;
  margin: 0 auto; 
  &.dark{
    background-color: rgba(33, 35, 43, 0.11);
  }
}

.shadow {
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  height: 300px;
  margin: 1rem;
  position: relative;
  width: 300px;
}

.shadow-1 {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.shadow-1:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

.shadow-2 {
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

.shadow-3 {
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}

.shadow-4 {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

.shadow-5 {
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
}

.form-box{
  .input-label{
    text-align: left;  
    margin-bottom: 7px;
    font-size: .9em;
    color: slategrey;
    font-weight: bold;
    span{
      color: silver;
      font-weight: normal;
      font-size: 13px;
    }
  }
  .form-input-group{
      margin-top: 30px;
  }
    .input-error-box{
      width: 90%;
      margin: 0 auto;
      margin-bottom: 20px;
      background-color:  rgb(255, 118, 118);
      border-radius: 5px;
      padding: 9px 10px;
      box-sizing: border-box;
      color: white;
      text-align: left;
      span{
        font-size: .9em;
      }
      i{
        margin-left: 5px;
        margin-right: 10px;
      }
      &.hide{
        opacity: 0;
      }
    }
    .input-box{
      width: 90%;
      margin: 0 auto;
      margin-bottom: 30px;
      position: relative;
      i{
        position: absolute;
        top: 11px;
        left: 15px;
        font-size: 1.1em;
        color: rgb(137, 147, 155);
      }
      input{
          background-color: rgb(219, 219, 219);
          width: 100%;
          padding: 13px;
          border: none;
          outline: none;
          box-sizing: border-box;
          border-radius: 5px;
          padding-left: 50px;
          color:#2c3e50;
          &::placeholder{
            color: rgb(137, 147, 155);
          }
      }

      &--error{
        i{
          color: rgb(250, 154, 154)
        }
        input{
          background-color: rgb(255, 245, 245) !important;
          &::placeholder{
            color: rgb(255, 118, 118);
          }
        }
      }
      .input-suffix{
        font-size: 14px;
        position: absolute;
        left: calc(100% - 30px);
      }
    }
    .input-box-file{
      background-color: #f0f0f0;
      border-radius: 5px;
      margin-bottom: 20px;
      overflow: hidden;
      .hidden{
        display: none;
      }
      .file-button{
        height: 40px;
        width: 150px;
        background-color: slategrey;
        color: white;
        cursor: pointer;
        line-height: 40px;
        display: inline-block;
      }

      .file-name{
        width: calc(100% - 151px);
        display: inline-block;
        color: slategray
      }
    }
    .input-box-el{
      background-color: #f0f0f0;
      border-radius: 5px;
      margin-bottom: 20px;
      i{
        color: rgb(137, 147, 155);;
      }
      .el-select{
        width: calc(100% - 60px);
      }
      .el-input__inner {
        width: 100%;
        -webkit-appearance: none;
        background-color: #f0f0f0;
        border: none;
        box-sizing: border-box;
        color:#2c3e50;
        &::placeholder{
          color: rgb(137, 147, 155);;
        }
      }
    }
}

.btn{
  width: 120px;
  padding: 10px 10px;
  border-radius: 50px;
  margin: 0 auto;
  font-size: .9em;
  // text-transform: uppercase;
  // font-weight: bold;
  transition: all .3s ease-in-out;
  cursor: pointer;
  font-family: 'Open sans';
  &.btn-primary{
    background-color: #faf9f9;
    border: 1px solid rgb(158, 169, 180);
    color:slategray
  }
  &.disabled{
    background-color: #6896c5;
    cursor: no-drop
  }
}

.footer{
    width: 100%;
    position: absolute;
    bottom: 5px;
    color: rgb(214, 214, 214);
    .footer-text{
        a{
            color: rgb(214, 214, 214);
            text-decoration: none;
            font-weight: bold;
        }
    }
}
.bold{
  font-weight: bold;
}

.pull-right{
  float: right;
}

.pull-left{
  float: left;
}

.clearfix{
  clear: both;
}
.back-icon{
  font-size: 1.3em;
  color: silver;
}

.form-title{
  font-size: 1.25em;
  font-family: 'Open sans';
  font-weight: bold;
  color: slategray;
}
.preview-box{
    width: 150px;
    height: 150px;
    background-color: #f0f0f0;
    margin: 0 auto;
    border-radius: 5px;
    cursor: pointer;
    overflow: hidden;
    img{
        width: 100%;
    }
}
.pointer{
  cursor: pointer;
}

.table-cell-danger{
  background-color: rgb(255, 203, 203) !important;
  padding: 2px 15px;
}

.table-cell-warning{
  background-color: rgb(255, 242, 225) !important;
  padding: 2px 15px;
}

.text-green{
  color: #40cfa2;
}

.text-purple{
  color: #7c1d68;
}
</style>

