import axios from 'axios'

//state
export const state = () => ({

}),


    //getters
    getters = {

    },


    //actions
    actions = {

        async fetchdata(username, password) {
            let url = 'https://users.zodexchange.com';
            await axios.post(url + `/api/member/playerLogin`, {
                username, password, siteOrigin: 'zodexchange.com',
            })
                .then((response) => {
                    let v = response.data.value
                    let user_name = JSON.parse(response.config.data)
                    localStorage.setItem('username-info', user_name.username)
                    localStorage.setItem('password-info', user_name.password)
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




        }
    },


    //mutations
    mutations = {

    }