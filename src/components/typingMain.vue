<template>
   <div id="bubbles">
  <div id='typingMain'>
    <div id='typingMain-contents'>
      <div id="kanji">
          <div class='yomiganaBox'>
            <p id='yomigana'>{{yomiValue[0]}}</P>
          </div>
          <h1 id='subject'></h1>
          <div id='result'></div>
          <div id="judgeIcon" v-if="jIcon"><font-awesome-icon :icon= "['far','circle']" class=”judgeicon” /></div>
          <div id="judgeIcon" v-else-if="jIconFalse"><font-awesome-icon icon='times' class="judgeicon" /></div>
          <div id="judgeIcon" v-else></div>
          <div id="explanation">
            <p>・１問20秒以内に回答してください。</p>
            <p>・ひらがなでの入力をお願いします。</p>
            <p>・入力後はEnterキーを押してください。</p>
            <p>・時間切れ、ミスを３回するとゲームオーバーです。</p>
          </div>
      </div>
      <!-- フォーム部分 -->
      <div class="formItems" v-if="formbtn.start">
        <div id="judge"></div>
        <div class="mainform">
          <div id="formbtn">
            <div class="formbtnitm" id="50mon" @click="typeCountdown(selectbtn[0])">10問</div>
            <div class="formbtnitm" id="50mon" @click="typeCountdown(selectbtn[1])">50問</div>
            <div class="formbtnitm" id="zenmon" @click="typeCountdown(selectbtn[2])">全問挑戦</div>
          </div>
        </div>
        <div id="mainExplanation"></div>
      </div>
      <div class="formItems" v-else-if="formbtn.reset">
        <div id="judge"></div>
        <div class="mainform">
          <div class="formbtnitm" id="restartbtn" @click="reset();shuffleArry()">再挑戦！！</div>
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
            <input type='text' name="dummypass" style="top: -100px; left: -100px;　position: fixed;" />
            <input name='input' type='text' autofocus  style="ime-mode:active" maxlength="15" placeholder="ひらがなで入力"  autocomplete="off"/>
            <input name='btn' type='submit' value='送信' />
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
  props: ['kankenList'],
  data() {
    return this.initialState();
  },
  watch: {
    '$route' (to, from) {
      clearInterval(this.countdown);
      this.reset();
    }
  },
  methods: {
    // data初期値
    initialState() {
      let id = this.$route.params['id'];
      // 名前判定
      let name = "";
      if ( id == 1) {
        name = "３級 " + this.kankenList.length + "問";
      } else if (id == 2){
        name = "準２級 " + this.kankenList.length + "問";
      } else if (id == 3){
        name = "２級 " + this.kankenList.length + "問";
      } else if (id == 4){
        name = "準１級 " + this.kankenList.length + "問";
      } else if (id == 5){
        name = "１級 " + this.kankenList.length + "問";
      };
      
      return {
        yomiValue: [name, "？　？　？　？"],
        selectbtn: ["10","50", "全問"],
        kankenLength: this.kankenList.length,
        formbtn: {start: true, reset: false},
        timeview: false,
        judge: 3,
        state: true,
        viewChange: true,
        yomi: "",
        form: null,
        subject:  null,
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
        TIME: 0,
        kanken_index: 0,
      }
    },
    getEl() {
      this.subject = document.getElementById('subject');
      this.yomigana = document.getElementById('yomigana');
      this.explanation = document.getElementById('explanation');
      this.judgeIcon = document.getElementById('judgeIcon');
      this.result =  document.getElementById('result');
    },
	  // dataおよび画面を元の状態にもどす
    reset() {
      // リセット時は`$data`にアサイン
      Object.assign(this.$data, this.initialState());
      this.getEl();

      this.subject.textContent = "";
      this.result.textContent = "";
      this.fadeIn(300, this.yomigana, this.yomiValue[0], 1);
      this.fadeIn(300, this.explanation, this.yomiValue[0], 0);
    },
    pageReset() {
      // vue-routerのrouter.goメソッド
      // currentRoute.path=>現在のページパス
      // これを渡すことで、リロード処理をしてくれる
      this.$router.go({path: this.$router.currentRoute.path, force: true})
    },
    typeCountdown(select) {
      this.getEl();
      const timer = document.getElementById('timer');
      timer.textContent = this.SETTIME;

      if(select == this.selectbtn[0]) {
        this.kankenLength = 10;
      } else if(select == this.selectbtn[1]) {
        this.kankenLength = 50;
      }

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
          this.yomigana.textContent = this.yomi;
          this.jIconFalse = true;
          setTimeout( function() {
            this.jIconFalse = false;
            this.finish(this.rightCount);
          }.bind(this), 1000);
        };
      }.bind(this), 1000);

      this.init(this.subject, this.form);

    },
    // 問題をビューにセットする処理
    init(subject, form) {
      if (this.kankenLength == this.kanken_index) {
        this.jIconFalse = false;
        this.finish(this.rightCount);
        return false;
      }
      this.yomigana.textContent = this.yomiValue[1];
      this.yomi = this.kankenList[this.kanken_index].yomi
      subject.textContent = this.kankenList[this.kanken_index].name
      form.input.value = '';
      this.kanken_index++
      form.input.focus();
    },
    // 入力文字をチェック
    check() {
      if(!this.state || this.form === null) return;

      var begin = new Date() - 0;
      let myTime = 800;
      let falseTime = 1000;

      // 正解処理
      this.yomigana.textContent = this.yomi;
      if(this.form.input.value === this.yomi) {
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
          var current = new Date() - begin;
          let heartIcon = document.getElementById('heart' + this.judge);
          if (heartIcon == null) { 
            clearInterval(set);
            return false;
          };
          if (current > falseTime) {
            clearInterval(set);
            this.TIME = this.SETTIME + 1;
            this.jIconFalse = false;
            this.judge--
            // ハートがなくなったら終了
            if (this.judge <= 0) {
              this.finish(this.rightCount);
            } else {
              this.init(this.subject, this.form);
            };
          };
          heartIcon.style.opacity = 1;
          heartIcon.style.opacity -= 0.9 * (current /falseTime);
          heartIcon.style.paddingTop = 10 * (current /falseTime) + "px";
        }.bind(this), 10);
      }
    },
    //処理終了の処理
    finish(rightCount) {
      clearInterval(this.countdown);
      this.subject.textContent = "";

      if(rightCount == this.kankenLength) {
        this.yomigana.textContent = "全問せいかい";
        this.result.textContent = '素晴らしい！！';
      } else if(rightCount == 0) {
        this.yomigana.textContent = rightCount + "問せいかい";
        this.result.textContent = '努力あるのみ';
      } else {
        this.yomigana.textContent = rightCount + "問せいかい";
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
            this.fadeIn(300, this.yomigana, this.yomiValue[1], 1);
          }
        }
        target.style.opacity -= 0.7 * (current / myTime);
      }.bind(this), 100);
    },
    fadeIn(myTime, target, value, id){
      var begin = new Date() - 0;
      target.style.opacity = 0
      if (id == 1) {target.innerHTML = value};
      // フェードイン
      var inId = setInterval(function() {
        var current = new Date() - begin;
        if (current > myTime) {
          clearInterval(inId);
        }
        target.style.opacity = 1 * (current / myTime);
      }, 100);
    },
    // 配列の中身をシャッフルして返す
    shuffleArry() {
      let kanken = this.kankenList;
      for(var i = kanken.length - 1; i > 0; i--){
        var r = Math.floor(Math.random() * (i + 1));
        var tmp = kanken[i];
        kanken[i] = kanken[r];
        kanken[r] = tmp;
      }
      Object.assign(this.kankenList, kanken);
    }
  },
};
</script>

<style scoped lang="scss">
#bubbles {
  height: 100vh;
  width: 100%;
  background: rgba(104, 102, 102, 0.537);
  background-image: -webkit-radial-gradient(rgba(218, 214, 214, 0.323),(82, 81, 81), rgba(44, 42, 42, 0.651));
  background-image: radial-gradient(rgba(218, 214, 214, 0.323), rgba(44, 42, 42, 0.651));
}
  #typingMain {
    height: 100%;
    padding: 80px 0;
    text-align: center;
    position: relative;
  }

  #formbtn {
    font-size: 1.5em;
    display: flex;
    justify-content: center;
  }

  #restartbtn {
    width: 150px;
    font-size: 1.8em;
    margin: 0 auto;
  }

/* スタートボタン */
.formbtnitm {
  width: 120px;
    margin: 0 auto;
    font-family: "nicoMoji";
    position: relative;
  z-index: 2;
  line-height: 1;
  background-color: rgb(95, 93, 93);
  border: 2px solid rgba(161, 159, 159, 0.541);
  color: #fff;
  cursor: pointer;
  padding: 10px 0;
  margin: 0 2px;
}

.formbtnitm:hover {
  background-color: #fff;
  border-color: #59b1eb;
  color: #59b1eb;
}

.formbtnitm::before,
.formbtnitm::after {
  position: absolute;
  z-index: -1;
  display: block;
  content: '';
}
.formbtnitm,
.formbtnitm::before,
.formbtnitm::after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all .3s;
  transition: all .3s;
}

.formbtnitm::before,
.formbtnitm::after {
  top: 0;
  width: 50%;
  height: 100%;
}
.formbtnitm::before {
  right: 0;
}
.formbtnitm::after {
  left: 0;
}
.formbtnitm:hover::before,
.formbtnitm:hover::after {
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
}

#explanation {
  text-align: left;
  line-height: 1;
}

.formItems {
  margin: 20px 0px;
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
  max-height: 150px;
  padding: 10% 10px;
}

.inputGroup {
  margin: 0 auto;
  width: 100%;
}

input[type="text"] {
	width:350px;
  text-align: center;
  font-size: 2em;
    padding: 0;
    border: none;
    border-bottom: 2px solid rgb(122, 119, 119);
    border-radius: 0;
    outline: none;
    background: none; 
}

input[type="submit"] {
  display: none;
} 

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
      bottom: -250px;
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
  #typingMain {
    text-align: center;
    position: relative;
    z-index: 1;
  }

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

  #countTimer {
    position: absolute;
      bottom: -130px;
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

  #typingMain {
    padding: 60px 0;
    text-align: center;
    position: relative;
    z-index: 1;
  }

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

  #kanji {
    padding: 20px 5px;
    background: rgba(245, 243, 243, 0.842);
    position: relative;
    height: 120px;
  }

  #kanji::after{
    content:"";
    position: absolute;
      top: -8px;
      bottom: -6px;
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

  #explanation > p {
   margin-bottom: 5px;
  }

  #typingMain-contents {
  width: 100%;
  min-width: 380px;
  height: 100%;
  margin: 0 auto;
  padding: 60px 5px;
  }

  #subject {
    margin-top: 10px;
    font-size: 3.5em;
  }

  #result {
  font-size: 3em;
  }

  .formItems {
    width: 100%;
    height: 30%;
    box-shadow: 1px 1px 5px 5px gray;
  }

  .mainform {
    height: 100px;
    padding: 20px 10px;
  }

  #judgeIcon {
  position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  font-size: 5em;
  color:rgba(255, 76, 45, 0.392);
}

/* 正解不正解の要素 */
#judge {
  height: 30px;
  padding: 5px;
  background: rgba(13, 63, 138, 0.747);
}

#judge > .icon {
  font-size: 1.2em;
  margin: 0 10px;
  color: rgba(255, 76, 45, 0.692);
}

  .inputGroup {
    display: flex;
    padding: 0 10px 0 0px;
    margin-top: 10px;
  }

  // 力技ですが、font-size: 16px; はしておきつつ、
  // transform:scale() で縮小表示すると、iOS側には「16pxですよ」と示しつつ、
  // 見た目はコンパクト、ということが実現できます。
  input[type=text] {
    font-size: 16px;
    transform: scale(0.9);
  }

  input[type="text"] {
    text-align: left;
    width: 100%;
    font-size: 1.2em;
  }


  input[type="submit"] {
    font-family: "nicoMoji";
    height: 30px;
    color: gray;
    padding: 0px 15px;
    font-size: 0.9em;
    border-radius: 15px;
    display: inline-block;
      border: 3px solid gray;;
      outline: none;
      background: white; 
  } 

  #mainExplanation {
    font-size: 1em;
    height: 30px;
    line-height: 30px;
  }


  #countTimer {
    position: absolute;
      bottom: -60px;
      right: 0px;
      left: 0px;
      margin: auto;
  }



  .timer-items {
    width:120px;
    height:120px;
    margin: 0 auto;
    position: relative;
    z-index: 5;
  }

  #timer {
    font-family: 'Chelsea Market', cursive;
    font-size: 3em;
    background: white;
    line-height: 70px;
    text-align: center;
    width:120px;
    height:120px;
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

</style>
