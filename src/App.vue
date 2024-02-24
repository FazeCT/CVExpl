<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

onMounted(() => {
  initFlowbite();
})

import appNavbar from './components/Navbar.vue'
import appFooter from './components/Footer.vue'
</script>

<template>
  <div id="page-container">
    <div id="content-container">
        <appNavbar/>
        <RouterView />
    </div>
    <appFooter/>
  </div>
</template>

<style>
body, #app {
  background-color: #141414; 
}

#page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#content-container {
  flex: 1;
}

#footer {
  flex-shrink: 0;
}
</style>
