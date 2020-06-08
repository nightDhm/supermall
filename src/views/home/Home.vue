<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'

export default {
name:"Home",
components:{
  NavBar
}
}
</script>

<style>
  .home-nav{
    background-color: var(--color-tint);
    color: white;
  }
</style>