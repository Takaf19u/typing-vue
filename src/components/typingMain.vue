<template>
  <div id='typingMain'>
    <div id='typingMain-contents'>
      <div id="kanji">
        <div id="bubbles">
          <p id='yomigana'></P>
          <h1 id='subject'>百科事典</h1>
        </div>
      </div>
      <div id="judge">CLEAR!!</div>
      <form name='typing' @submit.prevent='check()'>
        <span class="inputGroup">
          <input name='input' type='text' autofocus inputmode="kana" />
          <!-- <input name='btn' type='submit' value='送信' /> -->
        </span>
      </form>
      <div id="mainExplanation">▲　press enter　▲</div>
    </div>
    
    <div id="countTimer">
      <div class="timer-items">
        <p id='timer'>10</p>
        <span class="circle1"></span>
      </div>
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
  mounted:function() {
    this.createBubles();
  },
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
      debugger
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
    },
    // 泡アニメーション
    createBubles() {
      let bubles = document.getElementById('bubbles');
      var bArray = [];
      var sArray = [20,25,30, 40];
      var myTime = 1500;
      let cnt = 0
  
      // Push the header width values to bArray
      for (var i = 0; i < bubles.clientWidth; i++) {
          bArray.push(i);
      }
 
      // setInterval function used to create new bubble every 350 milliseconds
      setInterval(function(){
          var size = this.randomValue(sArray);
          var begin = new Date() - 0;
          var myStyle = {
            left: this.randomValue(bArray) + 'px',
            width: size + 'px',
            height: size + 'px',
            opacity: 1,
            position: 'absolute',
            borderRadius: '100%',
            bottom: '20px',
            backgroundColor: 'rgba(120, 214, 252, 0.774)',
            zIndex: 1
          }

          // individualbubbleの作成
          let individualbubble = document.createElement("div");
          for(var prop in myStyle) {
            individualbubble.style[prop] = myStyle[prop];
          }
          bubbles.appendChild(individualbubble);

          // 泡を動かす処理
          var id = setInterval(function() {
              var current = new Date() - begin;
              if (current > myTime) {
                  clearInterval(id);
                  current = myTime;
                  individualbubble.remove();
              }
              individualbubble.style.opacity -= 0.4 * (current / myTime);
              individualbubble.style.bottom = 100 * (current / myTime) + "%";
          }, 150);
      }.bind(this), 500);
    },
    randomValue(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
  },
};
</script>

<style scoped>
  #typingMain {
    margin-top: 50px;
    text-align: center;
    height: 100%;
    position: relative;
    background: rgba(104, 102, 102, 0.537);
    background-image: -webkit-radial-gradient(rgba(218, 214, 214, 0.323),(82, 81, 81), rgba(44, 42, 42, 0.651));
    background-image: radial-gradient(rgba(218, 214, 214, 0.323), rgba(44, 42, 42, 0.651));
  }

#typingMain-contents {
  /* background: white; */
  width: 480px;
  height: 100%;
  margin: 0 auto;
  padding: 80px 0px;
}

#kanji {
  padding: 20px 10px;
  background: rgba(245, 243, 243, 0.842);
  position: relative;
}
#kanji::after{
  content:"";
  position: absolute;
    top: -10px;
    bottom: -10px;
    left: -10px;
    right: -10px;
  border: lightseagreen 10px double;
}

#bubbles {
display: inline-block;
font-family: arial;
position: relative;
padding: 0 10px;
}

#yomigana {
  position: absolute;
  top: -45px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 3;
  background: rgb(252, 255, 217);
  height: 45px;
  width: 385px;
  font-size: 2em;
}

#yomigana::after {
  content:"";
  border: lightseagreen 8px double;
  border-radius: 5px;
  position: absolute;
  top: -9px;
  left: -9px;
  right: 0;
  margin: auto;
  z-index: 4;
  height: 60px;
  width: 400px;
}

#subject {
  margin-top: 20px;
  font-family: 'Noto Serif JP', serif;
  z-index: 5;
  font-size: 6em;
}

/* 正解不正解の要素 */
#judge {
  margin-top: 15px;
  line-height: 1;
  font-family: 'Chelsea Market', cursive;
  color: rgba(255, 76, 45, 0.692);
  font-size: 3em;
  text-shadow: 2px 2px rgba(245, 169, 169, 0.747);
  background: lightseagreen;
  width: 100%;
}


form {
  display: flex;
  align-items: center;
  background: lime;
}

.inputGroup {
  margin: 0 auto;
  width: 100%;
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

input[type="submit"] {
	min-width:100px;
  font-size: 2em;
    padding: 0;
    border: none;
    border: 1px solid black;
    border-radius: 0;
    outline: none;
    background: white; 
}

#countTimer {
  position: absolute;
    bottom: -200px;
    right: -180px;
}

.timer-items {
  width:400px;
  height:400px;
  line-height: 400px;
  margin: 0 auto;
  position: relative;
  z-index: 5;
}




#timer {
  font-family: 'Chelsea Market', cursive;
  font-size: 7.5em;
  background: white;
  line-height: 180px;
  text-align: left;
  padding-left: 100px;
  width:400px;
  height:400px;
  border-radius:100%;
  color: rgba(83, 82, 82, 0.712);
  position: relative;
}

#timer::before {
  position: absolute;
  width:400px;
  height:400px;
  line-height: 400px;
  background: white;
  line-height: 100px;
  border-radius:100%;
}

.circle1{
  position: absolute;
    top: -30px;
    bottom: -30px;
    left: -30px;
    right: -30px;
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
