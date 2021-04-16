<template>
  <div id="app">
    <settings/>
    <main-info/>
    <additional-info/>
  </div>
</template>

<script>

import MainInfo from "@/components/MainInfo";
import AdditionalInfo from "@/components/AdditionalInfo";
import Settings from "@/components/Settings";
export default {
  name: 'App',
  components: {
    Settings,
    AdditionalInfo,
    MainInfo
  },
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.showUpdateUI = true;
      });
    }
    this.$store.dispatch('initDevice', null);
  },
  mounted() {
    this.$store.dispatch('runSchedule', 600000);
  },
  methods:{
    async accept() {
      this.showUpdateUI = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    }
  },
  computed: {
    device(){
      return this.$store.getters.isMobile
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=PT+Sans&display=swap');
body{
  background-color: #498CEC;
  width: 100%;
  height: 100vh;
  box-sizing: border-box!important;
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
  min-height: 500px;
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

@media only screen and (max-width: 800px){
  body{
    background-color: #7290B9;
  }
  #app {
    min-height: 430px;
  }
}
@media only screen and (max-height: 725px) and (min-width: 401px){

}
</style>
