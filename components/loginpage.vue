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
                  v-model="username"
                  label="Username"
                  :rules="rules.username"
                  required
                ></v-text-field>
                <v-text-field
                  mx="2"
                  id="pass1"
                  v-model="password"
                  pattern="[A-Za-z]{3}"
                  prepend-inner-icon="mdi-lock"
                  label="Password"
                  :type="show1 ? 'text' : 'password'"
                  :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
                  :rules="rules.password"
                  @click:append="show1 = !show1"
                  required
                ></v-text-field>
                <NuxtLink to="/home">
                  <v-btn
                    rounded
                    block
                    :disabled="!isFormValid"
                    @click="submit"
                    class="
                      decoration:none;background-color:
                      deep-orange
                      accent-3
                    "
                  >
                    login
                  </v-btn>
                </NuxtLink>
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
export default {
  data() {
    return {
      username: '',
      password: '',
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
  methods: {
    async submit() {
      let result = await axios.post(
        `https://users.zodexchange.com/api/member/playerLogin`,
        {
          username: this.username,
          password: this.password,
          siteOrigin: 'zodexchange.com',
        }
      )

      let value = result.data.value

      console.log('value...', result.data.value)
      console.log('result...', result)

      localStorage.setItem(
        'username-info',
        JSON.stringify(result.config.data),
        console.log('<<<<<', result.config.data)
      )

      localStorage.setItem('password-info', JSON.stringify(result.config.data))

      if (value) {
        console.log('true...')
        this.$router.push('/home')
      }
    },
    // async created() {
    // let result = await axios({
    //   method: 'POST',
    //   url: 'https://users.zodexchange.com/api/member/playerLogin',
    //   data: {
    //     username: 'winp1',
    //     password: 'abc123',
    //   },
    // })
    // console.log(result)
    // localStorage.setItem(
    //   'username-info',
    //   JSON.stringify(result.data.username),
    //   console.log('<<<<<', result)
    // )
    // localStorage.setItem(
    //   'password-info',
    //   JSON.stringify(result.data.password)
    // )
    // },
  },
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
