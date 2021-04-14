<template>
  <div class="main-info">
    <div class="main-info_title">
      <div class="weather-ico">
        <img :src="icoSource" alt="">
      </div>
      <div class="weather-value">
        {{ weatherValue }} º
      </div>
    </div>
    <div class="main-info_subtitle">
      {{ description }}
    </div>
  </div>
</template>

<script>
export default {
  name: "MainInfo",
  computed: {
    weatherValue(){
      return Math.round(parseInt(this.$store.getters.getWeather.main.temp));
    },
    description(){
      return this.$store.getters.getWeather.weather[0].description
    },
    icoSource(){
      const name = this.$store.getters.getWeather.weather[0].main;
      try{
        const img = require.context('../assets/weather/', false, /\.png$/)
        return img('./' + name.toLowerCase() + ".png");
      }
      catch (e){
        const img = require.context('../assets/weather/', false, /\.png$/)
        return img('./partly cloudy.png');
      }
    },
  },
}
</script>

<style scoped>
.main-info{
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%, -50%);
  color: #FFFFFF;
}
.main-info_title{
  min-width: 516px;
  display: flex;
}
.weather-ico img{
    width: 200px;
    height: 200px;
  }
.weather-value{
  font-family: PT Sans,sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 180px;
  line-height: 216px;
  text-align: center;
}
.main-info_subtitle{
  font-family: Lato,sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  line-height: 30px;
  text-align: center;
  color: #FFFFFF;
}
@media only screen and (max-width: 800px){

  .weather-ico img{
    width: 100px;
    height: 100px;
  }
  .weather-value{
    font-family: PT Sans,sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 90px;
    line-height: 108px;
    text-align: center;
  }
  .main-info_subtitle{
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    color: #FFFFFF;
  }
  .main-info_title{
    min-width: 260px;
    display: flex;
  }
}
</style>