<template>
  <div  class="search-city">
    <input type="text" id="city-input" name="city" class="input-city" v-model="city" placeholder="Введите город" autocomplete="off">
    <div class="ok-button" @click="searchDone()">
      OK
    </div>
    <ul class="cities-list">
      <li class="cities-list_item" v-for="(elem, index) in citiesList" :key="index" @click="openCity(elem.city)">{{ elem.city }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SearchCity",
  data: ()=>({
    city: ''
  }),
  methods:{
    searchDone(){
      if (this.city.trim().length > 0){
        this.$store.dispatch('getWeatherByCity', this.city)
        this.$emit('search-done', this.city)
      }
      else{
        this.$emit('search-done', this.$store.getters.getCity)
      }
    },
    openCity(city){
      this.city = city;
      this.searchDone();
    }
  },
  computed:{
    citiesList(){
      if (this.city.trim().length > 0){
        const cities = this.$store.getters.getCities
        return cities.filter(item => {return item.city.toLowerCase().includes(this.city.toLowerCase())})
      }
      else
        return null
    }
  },
}
</script>

<style scoped>
  .search-city{
    box-sizing: border-box;
    width: 579px;
    height: 53px;
    position: relative;
  }
  .input-city{
    width: 579px;
    height: 100%;
    background: #FFFFFF;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: none;
    border-radius: 4px;
    font-family: Lato,sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    padding-left: 18px;
  }
  .ok-button{
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translate(-35px, -50%);
    font-family: Lato,sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    color: #1086FF;
    cursor: pointer;
  }
  .cities-list{
    position: absolute;
    width: 600px;
    box-sizing: border-box;
    color: #000;
    background-color: #FFFFFF;
    list-style: none;
    padding: 0;
    margin-top: 20px;
    max-height: 380px;
    overflow-y: auto;
    z-index: 3;
  }
  .cities-list_item{
    height: 20px;
    color: rgba(0, 0, 0, 0.65);
    text-align: left;
    border-radius: 4px;
    font-family: Lato,sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    padding: 18px;
    cursor: pointer;
  }
  @media only screen and (max-width: 800px){
    .search-city{
      box-sizing: border-box;
      width: 100%;
      height: 53px;
      position: relative;
    }
    .input-city{
      width: calc(100% - 18px);
      height: 100%;
      background: #FFFFFF;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      border: none;
      border-radius: 4px;
      font-family: Lato,sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 18px;
      padding-left: 18px;
    }
    .ok-button{
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translate(-35px, -50%);
      font-family: Lato,sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 18px;
      color: #1086FF;
      cursor: pointer;
    }
    .cities-list{
      width: 100%;
    }
  }
</style>