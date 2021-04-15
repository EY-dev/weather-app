<template>
  <div class="additional-info-box">
    <div class="additional-info">
      <div class="additional-info_row">
        <div class="additional-info_row_item">
          <info-element title="Ветер" :value="windValue"/>
        </div>
        <div class="additional-info_row_item">
          <info-element title="Давление" :value="pressureValue"/>
        </div>
      </div>
      <div class="additional-info_row">
        <div class="additional-info_row_item">
          <info-element title="Влажность" :value="humidityValue"/>
        </div>
        <div class="additional-info_row_item">
          <info-element title="Вероятность дождя" value="нет данных"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import InfoElement from "@/components/InfoElement";
export default {
  name: "AdditionalInfo",
  components: {InfoElement},
  methods:{
    getAngleWind(windAngle){
      if ((windAngle >= 0 && windAngle <= 22) || (windAngle > 337 && windAngle <= 360))
        return ' северный'
      if (windAngle > 22 && windAngle <= 67)
        return ' северо-восточный'
      if (windAngle > 67 && windAngle <= 112)
        return ' восточный'
      if (windAngle > 112 && windAngle <= 157)
        return ' юго-восточный'
      if (windAngle > 157 && windAngle <= 202)
        return ' южный'
      if (windAngle > 202 && windAngle <= 247)
        return ' юго-западный'
      if (windAngle > 247 && windAngle <= 292)
        return ' западный'
      if (windAngle > 292 && windAngle <= 337)
        return ' северо-западный'
    }
  },
  computed:{
    windValue(){
      let units = ' м/с,'
      if (this.$store.getters.getUnit === 'F')
        units = ' mph,'
      return Math.round(parseInt(this.$store.getters.getWeather.wind.speed)) + units + this.getAngleWind(parseInt(this.$store.getters.getWeather.wind.deg));
    },
    pressureValue(){
      let units = ' мм рт.ст.'
      if (this.$store.getters.getUnit === 'F')
        units = ' mmHg'
      return Math.round(parseInt(this.$store.getters.getWeather.main.pressure) * 0.75) + units;
    },
    humidityValue(){
      return parseInt(this.$store.getters.getWeather.main.humidity) + ' %';
    }
  }
}
</script>

<style scoped>
.additional-info-box{
  height: 75px;
}
.additional-info{
  display: inline-flex;
  width: 100%;
  box-sizing: border-box;
}
.additional-info_row{
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.additional-info_row_item{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
}
@media only screen and (max-width: 800px){
  .additional-info-box{
    height: 115px;
  }
  .additional-info{
    display: block;
  }
  .additional-info_row{
    width: 100%;
  }
  .additional-info_row:first-child {
    margin-bottom: 35px;
  }
  .additional-info_row_item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 35px;
    width: 50%;
  }
}
</style>