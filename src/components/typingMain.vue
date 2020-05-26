<template>
   <div id="bubbles">
  <div id='typingMain'>
    <div id='typingMain-contents'>
      <div id="kanji">
          <div class='yomiganaBox'>
            <p id='yomigana'>ルールせつめい</P>
          </div>
          <h1 id='subject'></h1>
          <div id='result'></div>
          <div id="judgeIcon" v-if="jIcon"><font-awesome-icon :icon= "['far','circle']" class=”judgeicon” /></div>
          <div id="judgeIcon" v-else-if="jIconFalse"><font-awesome-icon icon='times' class="judgeicon" /></div>
          <div id="judgeIcon" v-else></div>
          <div id="explanation">
            <p>・１問１０秒以内に回答してください。</p>
            <p>・ひらがなでの入力をお願いします。</p>
            <p>・よみがな入力後はEnterキーを押してください。</p>
            <p>・時間切れ または ミスを３回するとゲーム終了です。</p>
          </div>
      </div>
      <!-- フォーム部分 -->
      <div class="formItems" v-if="formbtn.start">
        <div id="judge"></div>
        <div class="mainform">
          <div id="startbtn" @click="typeCountdown()">スタート</div>
        </div>
        <div id="mainExplanation"></div>
      </div>
      <div class="formItems" v-else-if="formbtn.reset">
        <div id="judge"></div>
        <div class="mainform">
          <div id="startbtn" @click="pageReset()">再挑戦！！</div>
        </div>
        <div id="mainExplanation"></div>
      </div>
      <div class="formItems" v-else>
        <div id="judge">
          <font-awesome-icon icon='heart' class="icon" id="heart1" />
          <font-awesome-icon icon='heart' class="icon" id="heart2" />
          <font-awesome-icon icon='heart' class="icon" id="heart3" />
        </div>
        <form name='typing' @submit.prevent='check()' class="mainform">
          <span class="inputGroup">
            <input name='input' type='text' autofocus  style="ime-mode:active" maxlength="10" placeholder="ひらがなで入力" />
            <!-- <input name='btn' type='submit' value='送信' /> -->
          </span>
        </form>
        <div id="mainExplanation">▲　Press the Enter key　▲</div>
      </div>
    </div>
    <!-- タイマーのビュー -->
    <transition mode="out-in" name="fade">
      <div id="countTimer" v-show="timeview">
        <div class="timer-items">
          <p id='timer'>{{SETTIME}}</p>
          <span class="circle1"></span>
        </div>
      </div>
    </transition>
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
      formbtn: {start: true, reset: false,},
      timeview: false,
      question: "？　？　？　？",
      judge: 3,
      viewChange: true,
      target: {name: "", yomi: ""},
      state: true,
      form: null,
      subject: null,
      yomigana: null,
      explanation: null,
      result: null,
      judgeIcon: null,
      heartIcon: null,
      jIcon: false,
      jIconFalse: false,
      rightCount: 0,
      countdown: 0,
      SETTIME: 20,
      TIME: 0
    }
  },
  mounted:function() {
    this.createBubles();
  },
  methods: {
    pageReset() {
      // vue-routerのrouter.goメソッド
      // currentRoute.path=>現在のページパス
      // これを渡すことで、リロード処理をしてくれる
      this.$router.go({path: this.$router.currentRoute.path, force: true})
    },
    typeCountdown() {
      this.subject = document.getElementById('subject');
      this.explanation = document.getElementById('explanation');
      this.yomigana = document.getElementById('yomigana');
      this.result = document.getElementById('result');
      this.judgeIcon = document.getElementById('judgeIcon');

      this.fadeOut(300, this.yomigana, 1);
      this.fadeOut(300, this.explanation, 1);
      setTimeout(this.startCountdown, 800);

      this.timeview = true
      this.formbtn.start = false
    },
    startCountdown() {
     let count = 3;
      var begin = new Date() - 0;
        var set = setInterval(function() {
          var current = new Date() - begin;
          this.subject.innerHTML = count;
          if (count == 0) {
            clearInterval(set);
            this.startTyping();
          }
          count--
        }.bind(this), 1000);
    },

    startTyping() {
      this.form = document.forms.typing;
      const timer = document.getElementById('timer');
      this.TIME = this.SETTIME;

      this.countdown = setInterval(function() {
        timer.textContent =  --this.TIME;
        if(this.TIME <= 0) {
          timer.textContent =  this.SETTIME;
          this.yomigana.textContent = this.target.yomi;
          this.jIconFalse = true;
          setTimeout( function() {
            this.jIconFalse = false;
            this.finish(this.rightCount);
          }.bind(this), 1000);
        };
      }.bind(this), 1000);

      // 問題をランダムで表示する処理呼び出し
      this.init(this.subject, this.form);

    },
    // 問題をrandomで選択
    init(subject, form) {
      let i = this.kanken3.length;
      this.yomigana.textContent = this.question;
      this.rnd = Math.floor(Math.random() * i);
      this.$set(this.target, 'name', this.kanken3[this.rnd].name);
      this.$set(this.target, 'yomi', this.kanken3[this.rnd].yomi);
      subject.textContent = this.target.name
      form.input.value = '';
      form.input.focus();
    },
    // 入力文字をチェック
    check() {
      if(!this.state) return;

      var begin = new Date() - 0;
      let myTime = 800;
      let falseTime = 1000;
      // 正解処理
      this.yomigana.textContent = this.target.yomi;
      if(this.form.input.value === this.target.yomi) {
        this.rightCount++;
        this.jIcon = true;

        // フェードアウト
        var set = setInterval(function() {
          var current = new Date() - begin;
          if (current > myTime) {
            clearInterval(set);
            this.jIcon = false;
            this.init(this.subject, this.form);
            this.TIME = this.SETTIME + 1;
          };
        }.bind(this), 10);

      // 間違った時の処理
      } else {
        this.jIconFalse = true;
        // フェードアウトとアイコンの表示（ハート)
        let set = setInterval(function() {
          let heartIcon = document.getElementById('heart' + this.judge);
          heartIcon.style.opacity = 1;
          var current = new Date() - begin;
          if (current > falseTime) {
            clearInterval(set);
            heartIcon.style.opacity = 0;
            this.TIME = this.SETTIME + 1;
            this.jIconFalse = false;
            this.judge--
            // ハートがなくなったら終了
            if (this.judge == 0) {
              this.finish(this.rightCount);
            } else {
              this.init(this.subject, this.form);
            };
          };
          heartIcon.style.opacity -= 0.9 * (current /falseTime);
          heartIcon.style.paddingTop = 10 * (current /falseTime) + "px";
        }.bind(this), 10);
      }
    },
    //処理終了の処理
    finish(rightCount) {
      clearInterval(this.countdown);
      this.yomigana.textContent = rightCount + "問せいかい";
      this.subject.textContent = "";
      if(rightCount == 0) {
        this.result.textContent = '努力あるのみ';
      } else {
        this.result.textContent = "よく頑張りました";
      }

      this.formbtn.reset = true;
      this.state = false;
    },
    changeView() {
      this.viewChange = false;
    },
    // 泡アニメーション
    createBubles() {
      let bubles = document.getElementById('bubbles');
      var bArray = [];
      var sArray = [20,25,30,40,50, 80, 100];
      var myTime = 1000;
      let cnt = 0
  
      // Push the header width values to bArray
      for (var i = 0; i < bubles.clientWidth; i++) {
          bArray.push(i);
      }
 
      // setInterval function used to create new bubble every 350 milliseconds
      
      let bubleId = setInterval(function(){
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
            backgroundColor: 'rgba(126, 210, 243, 0.492)',
            boxShadow: '0px 0px 10px 5px rgb(247, 247, 130) ',
            zIndex: 0
          }

          // typing以外のページに遷移した場合、処理をとめる
          if (this.$route.path !== '/typing') {
            clearInterval(bubleId);
          }

          // individualbubbleの作成
          let individualbubble = document.createElement("div");
          for(var prop in myStyle) {
            individualbubble.style[prop] = myStyle[prop];
          }

          bubbles.appendChild(individualbubble)

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
    fadeOut(myTime, target, h){
      var begin = new Date() - 0;
      target.style.opacity = 1;
      // フェードアウト
      var set = setInterval(function() {
        var current = new Date() - begin;
        if (current > myTime) {
          clearInterval(set);
          if(h==1) {
            this.fadeIn(300, this.yomigana);
          }
        }
        target.style.opacity -= 0.7 * (current / myTime);
      }.bind(this), 100);
    },
    fadeIn(myTime, target){
      var begin = new Date() - 0;
      target.style.opacity = 0
      target.innerHTML = this.question;
      // フェードイン
      var inId = setInterval(function() {
        var current = new Date() - begin;
        if (current > myTime) {
          clearInterval(inId);
        }
        target.style.opacity = 1 * (current / myTime);
      }, 100);
    },
  },
};
</script>

<style scoped lang="scss">
#bubbles {
  height: 100%;
  width: 100%;
  background: rgba(104, 102, 102, 0.537);
  background-image: -webkit-radial-gradient(rgba(218, 214, 214, 0.323),(82, 81, 81), rgba(44, 42, 42, 0.651));
  background-image: radial-gradient(rgba(218, 214, 214, 0.323), rgba(44, 42, 42, 0.651));
  overflow: hidden;
}
  #typingMain {
    margin-top: 80px;
    text-align: center;
    height: 100%;
    position: relative;
    z-index: 1;
  }

/* スタートボタン */
  #startbtn {
    margin: 30px auto;
    font-family: "nicoMoji";
    position: relative;
  z-index: 2;
  width: 200px;
  background-color: rgb(95, 93, 93);
  border: 2px solid rgba(161, 159, 159, 0.541);
  color: #fff;
  font-size: 2em;
  cursor: pointer;
  padding: 5px 0;
}

#startbtn:hover {
  background-color: #fff;
  border-color: #59b1eb;
  color: #59b1eb;
}

  #startbtn::before,
  #startbtn::after {
  position: absolute;
  z-index: -1;
  display: block;
  content: '';
}
  #startbtn,
  #startbtn::before,
  #startbtn::after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all .3s;
  transition: all .3s;
}

  #startbtn::before,
  #startbtn::after {
  top: 0;
  width: 50%;
  height: 100%;
}
  #startbtn::before {
  right: 0;
}
  #startbtn::after {
  left: 0;
}
  #startbtn:hover::before,
  #startbtn:hover::after {
  width: 0;
  background-color: #59b1eb;
}

#bubbles {
display: inline-block;
font-family: arial;
position: relative;
}

.yomiganaBox {
  background: rgb(252, 255, 217);
  position: absolute;
  top: -30px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 3;
  height: 45px;
}

#yomigana {
  font-family: "nicoMoji";
  color: gray;
  line-height: 45px;
}

  #kanji {
    padding: 20px 10px;
    background: rgba(245, 243, 243, 0.842);
    position: relative;
    height: 180px;
  }

#subject {
  margin-top: 20px;
  font-family: 'Noto Serif JP', serif;
  z-index: 5;
  font-size: 6em;
  position: relative;
}

#judgeIcon {
  position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  font-size: 9em;
  color:rgba(255, 76, 45, 0.392);
}

#result {
  // font-size: 4em;
  font-family: "nicoMoji";
  font-weight: bold;
  color: rgb(255, 189, 7);
  text-shadow: 3px 1px rgb(113, 204, 247);
  line-height: 100px;
}

#explanation {
  text-align: left;
  line-height: 1;
}

.formItems {
  margin-top: 20px;
  width: 100%;
  box-shadow: 1px 1px 5px 5px gray;
}

/* 正解不正解の要素 */
#judge {
  height: 50px;
  padding: 10px;
  background: rgba(13, 63, 138, 0.747);
}

#judge > .icon {
  font-size: 2em;
  margin: 0 10px;
  color: rgba(255, 76, 45, 0.692);
}

#heart1 {
  animation: purupuru 1s infinite;
}

#heart2 {
  animation: purupuru 1s 0.2s infinite;
}

#heart3 {
  animation: purupuru 1s 0.4s infinite;
}

@keyframes purupuru {
	0% {
		transform: translate(0px, 0px);
	}
	50% {
		transform: translate(0px, 4px);
	}
}


.mainform {
  background: rgba(255, 255, 255, 0.822);
  height: 150px;
  padding: 10px;
}

.inputGroup {
  margin: 0 auto;
  width: 100%;
}

input[type="text"] {
	width:350px;
  margin-top: 30px;
  text-align: center;
  font-size: 2em;
    padding: 0;
    border: none;
    border-bottom: 2px solid rgb(122, 119, 119);
    border-radius: 0;
    outline: none;
    background: none; 
}

/* input[type="submit"] {
	min-width:100px;
  font-size: 2em;
    padding: 0;
    border: none;
    border: 1px solid black;
    border-radius: 0;
    outline: none;
    background: white; 
} */

#mainExplanation {
  font-family: 'Chelsea Market', cursive;
  background: rgba(13, 63, 138, 0.747);
  color: rgb(249, 249, 252);
  text-shadow: 1px 3px rgb(51, 50, 50);
  font-size: 1.2em;
  height: 50px;
  line-height: 50px;
}


@keyframes rotation{
  0%{ transform:rotate(0);}
  100%{ transform:rotate(360deg); }
}


/* フェードイン */
/* はじめ */
.fade-enter {
  /* 最初は表示して欲しくないので 0 */
  opacity: 0;
}
/* transition している間 */
.fade-enter-active {
  transition: opacity 1s
}
/* おわり */
.fade-enter-to {
  /* 終わったら表示して欲しいので 1 */
  opacity: 1;
}


/* フェードアウト */
/* はじめ */
.fadeout-enter {
  /* 最初は表示して欲しくないので 0 */
  opacity: 1;
}
/* transition している間 */
.fadeout-enter-active {
  transition: opacity 1s
}
/* おわり */
.fadeout-enter-to {
  /* 終わったら表示して欲しいので 0 */
  opacity: 0;
}


/* 650px以上に適用 */
@media screen and ( min-width:650px ){

  #countTimer {
    position: absolute;
      bottom: -160px;
      right: -220px;
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
    font-size: 7em;
    background: white;
    line-height: 200px;
    text-align: left;
    padding-left: 60px;
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
}

@media screen and ( min-width:480px ){
  .yomiganaBox {
    width: 385px;
  }
  .yomiganaBox::after {
    content:"";
    border: rgba(13, 63, 138, 0.747) 8px double;
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
  #yomigana {
    font-size: 1.8em;
  }

  #kanji::after{
    content:"";
    position: absolute;
      top: -10px;
      bottom: -10px;
      left: -10px;
      right: -10px;
    border: rgba(13, 63, 138, 0.747) 10px double;
  }

  #bubbles {
  padding: 0 10px;
  }

  #typingMain-contents {
  width: 480px;
  height: 100%;
  margin: 0 auto;
  padding: 60px 0px;
  }

  #subject {
    font-size: 6em;
  }
  #result {
    font-size: 4em;
  }
}

@media screen and ( max-width:649px ){

  #result {
  font-size: 3em;
  }

  #countTimer {
    position: absolute;
      bottom: -50px;
      right: 0px;
      left: 0px;
      margin: auto;
  }

  .timer-items {
    width:200px;
    height:200px;
    margin: 0 auto;
    position: relative;
    z-index: 5;
  }

  #timer {
    font-family: 'Chelsea Market', cursive;
    font-size: 4em;
    background: white;
    line-height: 80px;
    text-align: center;
    width:200px;
    height:200px;
    border-radius:100%;
    color: rgba(83, 82, 82, 0.712);
    position: relative;
  }

  .circle1{
    position: absolute;
      top: -20px;
      bottom: -20px;
      left: -20px;
      right: -20px;
      z-index: -1;
    display:inline-block;
    border-radius:100%;
    border:10px double gold;
    background: linear-gradient(-90deg, #FF00A1, #F6FF00);
    animation:5s linear infinite rotation;
  }
}

/* スマホだけに適用するCSS */
@media screen and ( max-width:479px ){
  .yomiganaBox {
    width: 360px;
  }
  .yomiganaBox::after {
    content:"";
    border: rgba(13, 63, 138, 0.747) 8px double;
    border-radius: 5px;
    position: absolute;
    top: -9px;
    left: -9px;
    right: -9px;
    margin: auto;
    z-index: 4;
    height: 60px;
  }
  #yomigana {
    font-size: 1.4em;
  }

  #kanji::after{
    content:"";
    position: absolute;
      top: -8px;
      bottom: -8px;
      left: -5px;
      right: -5px;
    border: rgba(13, 63, 138, 0.747) 3px solid;
  }
  #bubbles {
  padding: 0;
  }

  #explanation {
   font-size: 0.85em;
  }

  #typingMain-contents {
  width: 100%;
  min-width: 380px;
  height: 100%;
  margin: 0 auto;
  padding: 60px 5px;
  }

  #subject {
    font-size: 5em;
  }

  #result {
  font-size: 3em;
  }

}

</style>
