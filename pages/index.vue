<template>
  <div>
    <!-- <NuxtLink to="/login"></NuxtLink> -->
    <loginpage></loginpage>
  </div>
  
</template>

<script>
import loginpage from '@/components/loginpage'
import Home from '@/components/Home'
export default {
  name: 'IndexPage',
  component: { loginpage },
}
</script>
