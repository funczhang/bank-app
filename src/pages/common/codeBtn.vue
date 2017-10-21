<template lang="pug">
  button(class="btn-send-code" :id="id" @click="send('textLogin')" slot="right") 发送验证码
</template>
<script>
export default {
  parops: ['id'],
  methods: {
    send (id) {
      document.getElementById(id).style.color = '#999'
      document.getElementById(id).style.border = '1px solid #999'
      document.getElementById(id).disabled = true
      this.setTime(id)
    },
    setTime (id) {
      // alert('1111')
      let self = this
      let setTime = setInterval(() => {
        if (self.time > 0) {
          self.time --
          document.getElementById(id).innerHTML = self.time
        } else {
          self.time = 60
          document.getElementById(id).innerHTML = '发送验证码'
          document.getElementById(id).style.color = '#1f76e2'
          document.getElementById(id).style.border = '1px solid #1f76e2'
          document.getElementById(id).disabled = false
          window.clearInterval(setTime)
        }
      }, 1000)
    }
  }
}
</script>
<style>
.btn-send-code{
  width:4rem;
  height:1.25rem;
  border:1px solid #1f76e2;
  border-radius: 0.75rem;
  font-size:0.6rem;
  color:#1f76e2;
  line-height: 1.2rem;
  text-align: center;
  }
</style>
