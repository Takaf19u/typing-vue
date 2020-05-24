<template>
  <div id='typingMain'>
    <div id="kanji">
      <p id='yomigana'>ひゃっかじてん</P>
      <P id='subject'>百科事典</P>
    </div>
    <form name='typing' @submit.prevent='check()'>
      <span class="inputGroup">
        <input name='input' type='text' autofocus inputmode="kana" />
        <br>
        <input name='btn' type='submit' value='送信' />
      </span>
    </form>
    <p></p>
    <div class="timer-items">
      <p id='timer'>10</p>
      <span class="circle1"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'typeingMain',
  props: ['kanken3'],
  data() {
    return {
      rnd: 0,
      viewChange: true,
      target: {name: "", yomi: ""},
      state: true,
      form: null,
      subject: null,
      count: 0,
      countdown: 0,
    }
  },
  // mounted:function() {

  // },
  methods: {
    typeCountdown() {
      this.subject = document.getElementById('subject');
      this.form = document.forms.typing;

      this.test();
    },
    test() {
      const timer = document.getElementById('timer');
      let TIME = 10;
      
      this.countdown = setInterval(function() {
        timer.textContent =  --TIME;
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
    changeView() {
      this.viewChange = false;
    }
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  #typingMain {
    text-align: center;
    height: 100%;
  }

#kanji {
  height: 50%;
  background: blue;
  display: inline-block;
}

#kanji > P {
  line-height: 1;
  margin: 10px;
}

#yomigana {
  background: cornsilk;
  font-size: 2em;
  margin: auto;
}

#subject {
  background: cornsilk;
  font-size: 6em;
  margin: auto;
}


form {
  height: 50%;
  background: red;
  display: flex;
  align-items: center;
}

.inputGroup {
  margin: 0 auto;
}


input[type="text"] {
	min-width:100px;
  font-size: 2em;
    padding: 0;
    border: none;
    border-bottom: 1px solid black;
    border-radius: 0;
    outline: none;
    background: none;
   
}


.timer-items {
  width:80px;
  height:80px;
  border-radius:100%;
  line-height: 80px;
  margin: 0 auto;
  position: relative;
  background: white;
}



#timer {
  font-family: 'Chelsea Market', cursive;
  font-size: 3em;
  color: rgb(83, 82, 82);
}

.circle1{
  position: absolute;
    top: -10px;
    bottom: -10px;
    left: -10px;
    right: -10px;
    z-index: -1;
  display:inline-block;
  border-radius:100%;
  border:10px double gold;
  background: linear-gradient(-90deg, #FF00A1, #F6FF00);
  animation:5s linear infinite rotation;
}

@keyframes rotation{
  0%{ transform:rotate(0);}
  100%{ transform:rotate(360deg); }
}
</style>
