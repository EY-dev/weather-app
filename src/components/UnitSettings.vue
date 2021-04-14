<template>
  <div class="unit-block">
    <div class="unit-block_left unit-block_item__active" @click="newUnit('C')">
      <div class="unit-title">C</div>
    </div>
    <div class="unit-block_right" @click="newUnit('F')">
      <div class="unit-title">F</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UnitSettings",
  data: () => ({
    currentUnit : null
  }),
  methods:{
    newUnit(value){
      if (value !== this.currentUnit){
        const elF = document.querySelector('.unit-block_right');
        const elC = document.querySelector('.unit-block_left');
        this.currentUnit = value;
        if (value === 'F'){
          elC.classList.remove('unit-block_item__active')
          elF.classList.add('unit-block_item__active')
        }
        else {
          elF.classList.remove('unit-block_item__active')
          elC.classList.add('unit-block_item__active')
        }
        this.$store.dispatch('setUnit', value);
      }
    }
  },
  created() {
    this.currentUnit = this.$store.getters.getUnit;
  },
  mounted() {
    const elF = document.querySelector('.unit-block_right');
    const elC = document.querySelector('.unit-block_left');
    if (this.currentUnit === 'F'){
      elC.classList.remove('unit-block_item__active')
      elF.classList.add('unit-block_item__active')
    }
    else {
      elF.classList.remove('unit-block_item__active')
      elC.classList.add('unit-block_item__active')
    }
  }
}
</script>

<style scoped>
  .unit-block{
    mix-blend-mode: normal;
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    min-width: 77px;
    min-height: 29px;
    position: relative;
    cursor: pointer;
  }
  .unit-block::before{
    content: 'º';
    opacity: 0.4;
    position: absolute;
    height: 24px;
    left: -20px;
    font-family: PT Sans,sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 23px;
  }
  .unit-block_left, .unit-block_right{
    font-family: Lato,sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    flex: 1;
    position: relative;
    opacity: 0.4;
  }
  .unit-block_left{
    border-radius: 8px 0 0 8px;
  }
  .unit-block_right{
    border-radius: 0 8px 8px 0;
  }
  .unit-block_item__active{
    opacity: 1;
    background: rgba(255, 255, 255, 0.2);
  }
  .unit-title{
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
  }
</style>