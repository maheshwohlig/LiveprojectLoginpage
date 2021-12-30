<template>
  <div>
    <v-img :src="require('@/assets/images/login-bg.jpg')" class="coverimg">
      <v-container class="d-flex new">
        <v-row align="center" justify="center">
          <v-col col="12" md="6" sm="4">
            <v-card-text
              align="center"
              style="background-color: rgba(0, 0, 0, 0.7)"
            >
              <v-img
                :src="require('@/assets/images/PlayExch-logo.png')"
                width="300"
                height="150"
                contain
              ></v-img>
              <v-form v-model="isFormValid">
                <v-text-field
                  prepend-inner-icon="mdi-account"
                  v-model="auth.username"
                  label="Username"
                  :rules="rules.username"
                  required
                ></v-text-field>
                <v-text-field
                  mx="2"
                  id="pass1"
                  v-model="auth.password"
                  prepend-inner-icon="mdi-lock"
                  label="Password"
                  :type="show1 ? 'text' : 'password'"
                  :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
                  :rules="rules.password"
                  @click:append="show1 = !show1"
                  required
                ></v-text-field>

                <v-btn
                  rounded
                  v-bind:style="{ 'background-color': '#f53809' }"
                  block
                  :disabled="!isFormValid"
                  @click="submitForm"
                >
                  login
                </v-btn>
              </v-form>
              <v-card-text
                >powered by
                <v-img
                  :src="require('@/assets/images/betfair-logo.png')"
                  height="40"
                  max-width="150"
                  contain
                ></v-img>
              </v-card-text>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>

      <v-row align="center" justify="center" class="text-center">
        <v-col
          col="12"
          lg="12"
          md="6"
          sm="4"
          style="
            width: 100%;
            position: absolute;
            background-color: rgba(0, 0, 0, 0.7);
          "
          >AML Policy</v-col
        >
      </v-row>
    </v-img>
  </div>
</template>

<script>
import axios from 'axios'
// import { mapActions } from 'vuex'

export default {
  data() {
    return {
      auth: {
        username: 'winp1',
        password: 'abc123',
      },
      show1: false,
      isFormValid: false,
      rules: {
        username: [
          (v) => !!v || 'Username is required',
          // (value) => (value && value.length >= 3) || 'minimum 3 characters',
        ],
        password: [
          (v) => !!v || 'password is required',
          // (value) => (value && value.length >= 8) || 'minimum 8 characters',
          // (v) => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
          // (v) => /(?=.*\d)/.test(v) || 'Must have one number',
          // (v) =>
          //   /([!@$%])/.test(v) || 'Must have one special character [!@#$%]',
        ],
      },
    }
  },
  // methods: {
  //   submitForm() {
  //     this.$auth.login({
  //       data: {
  //         username: this.username,
  //         password: this.password,
  //       },
  //     })
  //   },
  // },
  methods: {
    //   // ...mapActions(['fetchdata']),
    async submitForm() {
      // this.fetchdata({ username: this.username, password: this.password })

      await axios
        .post(`https://users.zodexchange.com/api/member/playerLogin`, {
          username: this.auth.username,
          password: this.auth.password,
          siteOrigin: 'zodexchange.com',
        })
        .then((response) => {
          let vu = JSON.parse(response.config.data)

          let x = vu.username
          console.log('x', x)

          this.$auth.loginWith(
            'local',
            `https://users.zodexchange.com/api/member/playerLogin`,
            {
              data: {
                username: this.auth.username,
                password: this.auth.password,
              },
            }
          )

          let v = response.data.value
          let st_data = response.data.data

          localStorage.setItem('username-info', JSON.stringify(st_data))

          if (v === true) {
            this.$router.push('/home')
          }
        })
        .catch(({ response: err }) => {
          let v = err.data.value
          alert('incorrect user')
          if (v === false) {
            this.$router.push('/')
          }
        })
    },
  },
  // props: ['submitForm', 'hasName'],
}
</script>

<style scoped>
.new {
  height: 100%;
}

.coverimg {
  height: 100vh;
}
</style>
