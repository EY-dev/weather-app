<template>
  <div class="settings">
    <div class="settings_row">
        <div class="settings_row_item">
          <div class="city-title" v-if="!showSearch">
            {{ $store.getters.getCity }}
          </div>
          <search-city v-else @search-done="showSearch = false" class="search-city__active"/>
        </div>
        <div class="settings_row_item">
          <unit-settings/>
        </div>
      </div>
    <div class="settings_row" v-if="!showSearch">
        <div class="settings_row_item">
          <div class="city-subtitle" @click="showSearch = true">
            Сменить город
          </div>
        </div>
        <div class="settings_row_item" @click="getMyPosition()">
          <div class="city-subtitle my-position">
          <span>
            <img src="../assets/arrow.svg" alt="">
          </span> Мое местоположение
          </div>
        </div>
      </div>

  </div>
</template>

<script>
import UnitSettings from "@/components/UnitSettings";
import SearchCity from "@/components/SearchCity";
export default {
  name: "Settings",
  components: {SearchCity, UnitSettings},
  data: ()=>({
    showSearch: false,
  }),
  methods: {
    getMyPosition(){
      this.$store.dispatch('getWeatherByCurrentLocation')
    }
  }

}
</script>

<style scoped>
.settings{
  height: 116px;
  padding: 19px;
  box-sizing: border-box;
}
.settings_row{
  margin-bottom: 18px;
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.settings>*:first-child{
  height: 36px;
}
.settings_row_item{
  height: 100%;
  color: #fff;
}
.city-title{
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 36px;
}
.city-subtitle{
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  mix-blend-mode: normal;
  opacity: 0.6;
  cursor: pointer;
  letter-spacing: 1px;
}
.city-subtitle span{
  position: relative;
  margin-left: 15px;
}
.city-subtitle span img{
  position: absolute;
  left: -30px;
  top: -3px;
}
.my-position{
  min-width: 154px;
}

  @media only screen and (max-width: 800px){
    .search-city__active{
      position: absolute;
      left:19px;
      top: 19px;
      width: calc(100% - 38px);
      z-index: 2;
    }
  }
</style>