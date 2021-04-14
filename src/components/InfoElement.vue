<template>
  <div class="info-block">
    <div class="info-block_info-title">
      {{ title }}
    </div>
    <div class="info-block_info-value">
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoElement",
  props: ['title', 'value']
}
</script>

<style scoped>
  .info-block{
    color: #FFFFFF;
    font-family: Lato,sans-serif;
  }
  .info-block_info-title{
    font-family: Lato,sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    mix-blend-mode: normal;
    opacity: 0.6;
    text-align: left;
  }
  .info-block_info-value{
    font-family: Lato,sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    text-align: left;
  }
</style>