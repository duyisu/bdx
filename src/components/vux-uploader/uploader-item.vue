<template>
  <li class="weui-uploader__file" :style="style">
      <slot></slot>
  </li>
</template>

<script>
export default {
  props: {
    backgroundImage: {
      type: String,
      default: ''
    }
  },
  computed: {
    style () {
      return {
        backgroundImage: `url(${this.backgroundImage})`
      }
    }
  }
}
</script>
