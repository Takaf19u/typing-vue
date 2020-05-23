<template>
  <div class='hello'>
    <p>{{ kanken3[0].name }}</p>
    <h1 id='subject'></h1>
    <form name='typing' @submit.prevent='check()'>
      <input name='input' type='text' />
      <input name='btn' type='submit' value='送信' />
    </form>
    <p></p>
    <p id='timer'>制限時間：5秒</p>
  </div>
</template>

<script>
export default {
  name: 'typeingMain',
  props: ['kanken3'],
  data() {
    return {
      rnd: 0,
      target: {name: "", yomi: ""},
      state: true,
      form: null,
      subject: null,
      count: 0,
      countdown: 0,
    }
  },
  mounted:function() {
      this.test();
  },
  methods: {
    test() {
      const timer = document.getElementById('timer');
      this.subject = document.getElementById('subject');
      this.form = document.forms.typing;
      
      let TIME = 5;
      
      this.countdown = setInterval(function() {
        timer.textContent = '制限時間：' + --TIME + '秒';
        if(TIME <= 0) {
          this.finish(this.count);
        };
      }.bind(this), 1000);

      // 問題をランダムで表示する処理呼び出し
      this.init(this.subject, this.form);

    },
    //処理終了の処理
    finish(count) {
      clearInterval(this.countdown);
      this.subject.textContent = '正解数は' + count + '個でした！';
      this.state = false;
    },
    init(subject, form) {
      let i = this.kanken3.length
      this.rnd = Math.floor(Math.random() * i);
      this.$set(this.target, 'name', this.kanken3[this.rnd].name);
      this.$set(this.target, 'yomi', this.kanken3[this.rnd].yomi);
      subject.textContent = this.target.name
      form.input.value = '';
      form.input.focus();
    },
    check() {
      if(!this.state) return;
      if(this.form.input.value === this.target.yomi) {
        this.count++;
        this.init(this.subject, this.form);
      } else {
        this.subject.textContent = '間違いです！';
        this.finish(this.count);
      }
    },
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
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
