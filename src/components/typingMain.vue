<template>
  <div class="hello">
    <h1 id="subject"></h1>
    <form name="typing" onsubmit="return false">
      <input name="input" type="text" />
      <input name="btn" type="submit" value="送信" />
    </form>
    <p></p>
    <p id="timer">制限時間：10秒</p>
  </div>
</template>

<script>
export default {
  name: "typeingMain",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    window:onload = function () {
      const subject = document.getElementById('subject');
      const timer = document.getElementById('timer');
      const form = document.forms.typing;
      const textList = [
        '君をわすれない',
        '曲がりくねった道をゆく',
        '生まれたての太陽と',
        '夢を焦がす黄色い砂',
        'Welcome'
      ];
      
      let TIME = 20;
      let count = 0;
      let state = true;
      
      const countdown = setInterval(function() {
        timer.textContent = '制限時間：' + --TIME + '秒';
        if(TIME <= 0) finish();
      }, 1000);
      
      form.addEventListener('submit', function(e) {
        if(!state) return;
        if(form.input.value === subject.textContent) {
          count++;
          init();
        } else {
          subject.textContent = '間違いです！';
          TIME = 1;
          state = false;
        }
      });
      
      init();
      
      function init() {
        const rnd = Math.floor(Math.random() * textList.length);
        subject.textContent = textList[rnd];
        form.input.value = '';
        form.input.focus();
      }
      
      function finish() {
        clearInterval(countdown);
        subject.textContent = '正解数は' + count + '個でした！';
        state = false;
      }

    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
