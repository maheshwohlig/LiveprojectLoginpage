<template>
  <div>
    <v-img :src="require('@/assets/images/login-bg.jpg')" cover>
      <v-container class="d-flex new" fluid>
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
                  :rules="rules.username"e
                  required
                ></v-text-field>
                <v-text-field
                  mx="2"
                  id="pass1"
                  v-model="password"
                  prepend-inner-icon="mdi-lock"
                  label="Password"
                  :type="show1 ? 'text' : 'password'"
                  :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
                  :rules="rules.password"
                  @click:append="show1 = !show1"
                  required
                ></v-text-field>
                <v-btn rounded block :disabled="!isFormValid" @click="submit">
                  login
                </v-btn>
              </v-form>
              <v-text class="my-5">powered by</v-text>
              <v-img
                :src="require('@/assets/images/betfair-logo.png')"
                height="40"
                max-width="150"
                contain
              ></v-img>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-img>
  </div>
</template>
<script>
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
          (v) =>
            /^[a-zA-Z0-9][a-zA-Z0-9_]*[a-zA-Z0-9](?<![-?\d+\.?\d*$]{6,}.*)$/ ||
            'Username is invalid',
        ],
        password: [
          (v) => !!v || 'password is required',
          (v) =>
            new RegExp(
              '/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[#$@!%&*?])[A-Za-zd#$@!%&*?]{8,15}$/'
            ) || 'minimum 8 characters',
        ],
      },
    }
  },
}
</script>
<style scoped>
.new {
  height: 100%;
}
</style>