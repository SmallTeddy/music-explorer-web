<script lang='ts' setup>
import { getLrc } from '@/api/musicApi'
import musicUrl from '@/assets/music/夜曲.mp3'

const { proxy } = getCurrentInstance()
const lrcData = ref()
const lrcLines = ref([])

const getMusicLrc = () => {
  getLrc().then(async lrc => {
    const { data } = await lrc
    lrcData.value = data
    parseLrc()
  })
}

const parseLrc = (): void => {
  const lines = lrcData.value.split('\n');
  lrcLines.value = []
  lines.map(item => {
    const parts = item.split(']')
    const timeStr = parts[0].substring(1);
    const obj = {
      time: parseTime(timeStr),
      words: parts[1],
    };
    lrcLines.value.push(obj)
  })
}

const parseTime = (timeStr: string): number => {
  const parts = timeStr.split(':');
  return +parts[0] * 60 + +parts[1];
}

const audioDom = ref(null)
const ulDom = ref(null)
const containerDom = ref(null)
const canvasDom = ref(null)

const containerHeight = computed(() => {
  return containerDom.value?.clientHeight
})
const liHeight = computed(() => {
  return ulDom.value.children[0]?.clientHeight
})
const maxOffset = computed(() => {
  return ulDom.value?.clientHeight - containerHeight.value
})

const findIndex = () => {
  const curTime = audioDom.value.currentTime;
  for (let i = 0; i < lrcLines.value.length; i++) {
    if (curTime < lrcLines.value[i].time) {
      return i - 1;
    }
  }
  return lrcLines.value.length - 1;
}

const setOffset = () => {
  const index = findIndex();
  let offset = liHeight.value * index + liHeight.value / 2 - containerHeight.value / 2;
  offset = offset < 0 ? 0 : offset;
  offset = offset > maxOffset.value ? maxOffset.value : offset;
  ulDom.value.style.transform = `translateY(-${offset}px)`;
  // 去掉之前的 active 样式
  let li = ulDom.value.querySelector('.active');
  if (li) {
    li.classList.remove('active');
  }

  li = ulDom.value.children[index];
  if (li) {
    li.classList.add('active');
  }
}

onMounted(() => {
  getMusicLrc()

  audioDom.value = proxy.$refs.audioRef as HTMLAudioElement
  ulDom.value = proxy.$refs.ulRef as HTMLUListElement
  containerDom.value = proxy.$refs.containerRef as HTMLDivElement
  canvasDom.value = proxy.$refs.canvasRef as HTMLDivElement

  const ctx = canvasDom.value.getContext('2d')

  const initCanvas = () => {
    canvasDom.value.width = window.innerWidth * devicePixelRatio
    canvasDom.value.height = 300
  }
  initCanvas()
  let isInit = false
  let analyser, dataSource
  audioDom.value.onplay = () => {
    if (isInit) {
      return
    }
    const audCtx = new AudioContext() // 音频上下文
    const source = audCtx.createMediaElementSource(audioDom.value) // 音频源节点
    analyser = audCtx.createAnalyser()
    analyser.fftSize = 512
    dataSource = new Uint8Array(analyser.frequencyBinCount)
    source.connect(analyser)
    analyser.connect(audCtx.destination)


    isInit = true
  }

  // 柱状
  const drawColumnar = () => {
    requestAnimationFrame(drawColumnar)
    const { width, height } = canvasDom.value
    ctx.clearRect(0, 0, width, height)
    if (!isInit) {
      return
    }
    analyser.getByteFrequencyData(dataSource)

    const len = dataSource.length
    const barWidth = width / len
    ctx.fillStyle = 'skyblue'
    dataSource.forEach((v, i) => {
      const barHeight = v / 255 * height
      const x = i * barWidth
      const y = height - barHeight
      ctx.fillRect(x, y, barWidth, barHeight)
    })
  }

  // 波浪
  const drawWavy = () => {
    requestAnimationFrame(drawWavy);
    const { width, height } = canvasDom.value;
    ctx.clearRect(0, 0, width, height);
    if (!isInit) {
      return;
    }
    analyser.getByteFrequencyData(dataSource);

    const len = dataSource.length;
    const sliceWidth = width * 1.0 / len;
    let x = 0;

    ctx.beginPath();
    ctx.fillStyle = 'skyblue';
    dataSource.forEach((v, i) => {
      const vNormalized = v / 255;
      const y = vNormalized * height / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    });

    ctx.lineTo(width, height / 2);
    ctx.stroke();
  };

  drawWavy()

  audioDom.value.addEventListener('timeupdate', setOffset);
})
</script>

<template>
  <div class="music-container flex flex-column flex-align">

    <div class="audio-container flex-align">
      <img src="../../assets/十一月的肖邦.png" alt="十一月的肖邦" style="width: 5.2rem;">
      <div class="flex-column" style="margin-left: 0.5rem;">
        <div style="font-size: 1.6rem; color: #999; margin-bottom: 0.2rem;">夜曲</div>
        <div style="font-size: 1.2rem; color: #999;">周杰伦 - 夜曲</div>
      </div>
      <div class="mp3Box">
        <audio ref="audioRef" controls :src="musicUrl"></audio>
      </div>
      <!-- <div>
        <el-button style="background: transparent;">change mode</el-button>
      </div> -->
    </div>
    <div ref="containerRef" class="lrc-container">
      <ul ref="ulRef" class="lrc-list">
        <li v-for="lrcItem in lrcLines" :key="lrcItem.time">
          {{ lrcItem.words }}
        </li>
      </ul>
    </div>
    <div class="cvs-container">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>

<style scoped lang="scss">
.music-container {
  height: calc(100vh - 60px);
  background: #1b1d1d;

  audio {
    width: 450px;
    margin: 0 1.2rem;
    background: #303233;
    border-radius: 54px;
  }

  audio::-webkit-media-controls-panel {
    background-image: initial;
    background-color: #777;
    transition: none;
  }

  audio::-webkit-media-controls-current-time-display,
  audio::-webkit-media-controls-time-remaining-display {
    background: #777;
    text-shadow: none;
  }

  .audio-container {
    height: 5.2rem;
    // border: 1px solid #777;
  }

  .lrc-container {
    width: 100%;
    padding-top: 30px;
    flex: 1;
    height: 220px;
    text-align: center;
    overflow: hidden;
    position: relative;

    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      height: 100px;
      background: linear-gradient(to bottom, rgba(27, 29, 29, 1), rgba(255, 255, 255, 0));
      pointer-events: none;
    }

    &::before {
      top: 0;
    }

    &::after {
      bottom: 0;
      transform: rotate(180deg);
    }

    ul {
      transition: 0.6s;
      list-style: none;
      color: #ffffff70;

      li {
        height: 30px;
        line-height: 30px;
        transition: 0.2s;

        &.active {
          font-weight: 700;
          color: #fff;
          transform: scale(1.2);
        }
      }
    }
  }

  .cvs-container {
    padding-top: 10px;
  }
}
</style>

