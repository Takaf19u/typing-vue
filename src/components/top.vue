<template>
  <div Id="topPage">
    <div class="topPage-title">
      <div class="topPage-title--items">
        <p id="title1">KANKEN</p>
        <p id="title2">YOJIJUKU</p>
        <p id="title3">-- よみがなタイピング --</p>
      </div>
    </div>
    <div class="font" id="group1">
      <p v-for="(kanji, index) in this.kanji1" :key="`G1id${index}`">
        {{ kanji.name }}
      </P>
    </div>
    <div class="font" id="group2">
      <p v-for="(kanji, index) in this.kanji2" :key="`G2id${index}`">
        {{ kanji.name }}
      </P>
    </div>
    <div class="font" id="group3">
      <p v-for="(kanji, index) in this.kanji3" :key="`G3id${index}`">
        {{ kanji.name }}
      </P>
    </div>
  </div>
</template>


<script>
  export default {
    props: ['kanken3'],
    data() {
      return {
        kanji1: [],
        kanji2: [],
        kanji3: [],
      }
    },
    created:function() {
      this.randomIndex();
    },
    methods: {
      randomIndex() {
        let i = 0;
        let cnt = 0;
        let rands = [];
        // randomで値を１５個選定
        while (cnt <= 15) {
          i = Math.floor( Math.random() * this.kanken3.length );
          rands.push(this.kanken3[i]);
          cnt++;
        };

        // 表示用の配列へ格納
        i = 0;
        cnt = 0;
        while (cnt < 15) {
          this.kanji1.push(rands[cnt]);
          this.kanji2.push(rands[cnt+1]);
          this.kanji3.push(rands[cnt+2]);
          cnt= cnt + 3;
　　　　　};
      },
    }
  }
</script>

<style scoped>

#topPage {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: rgba(104, 102, 102, 0.537);
  background-image: -webkit-radial-gradient(rgba(218, 214, 214, 0.323),(82, 81, 81), rgba(44, 42, 42, 0.651));
  background-image: radial-gradient(rgba(218, 214, 214, 0.323), rgba(44, 42, 42, 0.651));
}

.topPage-title--items {
  position: relative;
  font-family: 'Chelsea Market', cursive;
}

.font {
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: calc(112.5% + 0.5vw);
}

#group1 > p {
  margin-bottom: 20px;
}

#group2 {
  height: 150%;
}

#group3 > p {
  margin-top:  30px;
}


.font > p {
  font-family: 'Noto Serif JP', serif;
  overflow: hidden;
  margin: 0;
}

/* グループ１の設定（横重ねる） */
#group1 p:nth-child(1) {
  animation: loop 20s -5s linear infinite;
  font-size: calc(2em + 0.5vw);
}
#group1 p:nth-child(2) {
  animation: loop 15s -10s linear infinite;
  font-size: calc(3em + 0.5vw);
}

#group1 p:nth-child(3) {
  animation: loop 20s 0s linear infinite;
  font-size: calc(1em + 0.5vw);
}

#group1 p:nth-child(4) {
  animation: loop 40s 0s linear infinite;
  font-size: calc(3em + 0.5vw);
}

#group1 p:nth-child(5) {
  animation: loop 20s 0s linear infinite;
  font-size: calc(4em + 0.5vw);
}

/* グループ2の設定（縦） */
#group2 p:nth-child(1) {
  position: absolute;
   right: 0;
   top: -80%;
   bottom: 0;
  -ms-writing-mode: tb-rl;
  writing-mode: vertical-rl;
  /* -webkit-text-orientation: upright;
  text-orientation: upright; */
  -webkit-text-orientation: sideways;
  text-orientation: sideways;
  /* -webkit-text-orientation: mixed;
  text-orientation: mixed; */
  animation: loop3 40s -1s linear infinite;
  font-size: calc(7em + 0.8vw);
}
#group2 p:nth-child(2) {
  position: absolute;
   left: 30%;
   top: -50%;
   bottom: 0;
  -ms-writing-mode: tb-rl;
  writing-mode: vertical-rl;
  -webkit-text-orientation: upright;
  text-orientation: upright;
  animation: loop3 20s -1s linear infinite;
  font-size: calc(2.5em + 0.5vw);
}

#group2 p:nth-child(3) {
  position: absolute;
   left: 20%;
   top: -50%;
   bottom: 0;
  -ms-writing-mode: tb-rl;
  writing-mode: vertical-rl;
  -webkit-text-orientation: sideways;
  text-orientation: sideways;
  animation: loop3 15s 3s linear infinite;
  font-size: calc(1em + 0.5vw);
}

#group2 p:nth-child(4) {
  position: absolute;
   left: 0%;
   top: -50%;
   bottom: 0;
  -ms-writing-mode: tb-rl;
  writing-mode: vertical-rl;
  -webkit-text-orientation: upright;
  text-orientation: upright;
  animation: loop3 30s -5s linear infinite;
  font-size: calc(4em + 0.5vw);
}

#group2 p:nth-child(5) {
  position: absolute;
   right: 20%;
   top: -50%;
   bottom: 0;
  -ms-writing-mode: tb-rl;
  writing-mode: vertical-rl;
  -webkit-text-orientation: upright;
  text-orientation: upright;
  animation: loop3 15s -2s linear infinite;
  font-size: calc(2em + 0.5vw);
}

/* グループ3の設定（横かさねる） */
#group3 p:nth-child(1) {
  animation: loop 12s -5s linear infinite;
  font-size: calc(1em + 0.5vw);
}
#group3 p:nth-child(2) {
  animation: loop 10s -10s linear infinite;
  font-size: calc(1.2em + 0.5vw);
}

#group3 p:nth-child(3) {
  animation: loop 11s -10s linear infinite;
  font-size: calc(0.8em + 0.5vw);
}

#group3 p:nth-child(4) {
  animation: loop 20s -8s linear infinite;
  font-size: calc(2em + 0.5vw);
}

#group3 p:nth-child(5) {
  animation: loop 10s 0s linear infinite;
  font-size: calc(2em + 0.5vw);
}

@keyframes loop {
  0% {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(100%);
  }
}

/* 縦 */
@keyframes loop3 {
  0% {
    transform:translateY( 0%);
  }
  to {
    transform:translateY(100%);
  }
}

@keyframes loop4 {
  0% {
    transform: translateY(0%);
  }
  to {
    transform: translateY(0%);
  }
}

/* 480px以上に適用 */
@media screen and ( min-width:480px ){
  .topPage-title {
    position: absolute;
      top: 100px;
      bottom: 100px;
      right: 0;
      left: 0;
      margin: auto;
    z-index: 1;
    width: 480px;
    height: 350px;
    background: rgba(255, 255, 255, 0.9);
  }

  .topPage-title--items {
    height: 100%;
    width: 100%;
    text-align: center;
    padding: 5px;
  }

  .topPage-title--items > p {
    font-size: 6.2em;
    margin: 0;
  }

  #title2 {
    position: absolute;
      top: 38%;
      left: 0;
      right: 0;
      margin: auto;
  }

  #title3 {
    font-family: 'M PLUS 1p', sans-serif;
    position: absolute;
      bottom: 10%;
      left: 0;
      right: 0;
    font-size: 2em;
  }
}

/* スマホだけに適用するCSS */
@media screen and ( max-width:479px ){
  .topPage-title {
    position: absolute;
      top: 100px;
      bottom: 100px;
      right: 0;
      left: 0;
      margin: auto;
    z-index: 1;
    width: 100%;
    height: 350px;
    background: rgba(255, 255, 255, 0.9);
  }
  .topPage-title--items {
    height: 100%;
    width: 100%;
    text-align: center;
    padding: 30px 5px;
  }

  .topPage-title--items > p {
    font-size: calc(500% + 0.5vw);
    margin: 0;
  }

  #title2 {
    position: absolute;
      top: 40%;
      left: 0;
      right: 0;
      margin: auto;
  }

  #title3 {
    font-family: 'M PLUS 1p', sans-serif;
    position: absolute;
      bottom: 15%;
      left: 0;
      right: 0;
    font-size: calc(120% + 1vw);
  }
}

</style>