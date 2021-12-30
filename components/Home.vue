<template>
  <div>
    <h1>welcome to Home Page</h1>
    <div v-if="!this.$auth.loggedIn">
      <h1>{{ this.$auth.username }}</h1>
      <v-btn @click="logout">log-out</v-btn>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'home',

  methods: {
    logout() {
      let ac_token = localStorage.getItem('username-info')
      let token = JSON.parse(ac_token)
      console.log(token.accessToken)
      let v = token.accessToken
      axios
        .post(`https://users.zodexchange.com/api/member/logout`, {
          accessToken: v,
        })
        .then((response) => {
          console.log('logoutResponce', response)
          this.$auth.logout()
          this.$router.push('/')
        })
    },
  },
}
</script>
 