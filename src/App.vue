<template>
  <div class="container">
      <div class="columns">
          <div class="column is-4 is-offset-4">
              <h1 class="title"  v-if="$route.path!=='/home/'">Login</h1>
          
              <form @submit.prevent="submitForm" v-if="$route.path!=='/home/'">
                  <div class="field">
                      <label>Username</label>
                      <div class="control">
                          <input name="Username" class="input" v-model="username">
                      </div>
                  </div>

                  

                  <div class="field">
                      <label>Password</label>
                      <div class="control">
                          <input type="password" name="password1" class="input" v-model="password1">
                      </div>
                  </div>

                  <div class="notification is-danger" v-if="errors.length">
                      <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                  </div>

                  <div class="field">
                      <div class="control">
                          <button class="button is-success">Submit</button>
                          
                      </div>
                  </div>
              </form>
              <router-view></router-view>
          </div>
      </div>
  </div>
  
</template>

<script>
  import axios from 'axios'

  
  const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg5NzExMTAzLCJpYXQiOjE2ODk3MTA4MDMsImp0aSI6IjBjM2Q5YTQ5NzQ1NTQ2NDFhMTNiNDkwMzg1ZWFhOGNiIiwidXNlcl9pZCI6MX0.ZmDtxepRf-fBp38DowyEdvP85sI8vpXpsE2gYaeJQZA' };
  export default {
      name: 'SignUp',
      data() {
          return {
              username: '',
              password1: '',
              
              errors: []
          }
      },
      methods: {
          submitForm() {
              this.errors = []

              if (this.username === '') {
                  this.errors.push('The username is missing')
              }

              if (this.password1 === '') {
                  this.errors.push('The password is too short')
              }


              if (!this.errors.length) {
                  const formData = {
                      username: this.username,
                      password: this.password1
                  }

                  axios.create({withCredentials: false})
                      .post('http://127.0.0.1:4000/login/', formData,{ headers })
                      .then(response => {
                          
                          console.log(response)
                          
                          this.$router.push("/home/").catch(()=>{});
                      })
                      .catch(error => {
                          if (error.response) {
                              for (const property in error.response.data) {
                                  this.errors.push(`${property}: ${error.response.data[property]}`)
                              }
                          } else if (error.message) {
                              this.errors.push('Something went wrong. Please try again!')
                          }
                      })
                  
                 
              }
          }
      }
  }
</script>
<style lang="scss">
@import '../node_modules/bulma'
</style>