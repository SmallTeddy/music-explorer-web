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

  const draw = () => {
    requestAnimationFrame(draw)
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

  draw()

  audioDom.value.addEventListener('timeupdate', setOffset);
})
</script>

<template>
  <div class="music-container flex flex-column flex-align">
    <audio ref="audioRef" controls :src="musicUrl"></audio>
    <div ref="containerRef" class="container">
      <ul ref="ulRef" class="lrc-list">
        <li v-for="lrcItem in lrcLines" :key="lrcItem.time">
          {{ lrcItem.words }}
        </li>
      </ul>
    </div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style scoped lang="scss">
.music-container {
  height: calc(100vh - 60px);
}

audio {
  width: 450px;
  margin: 30px 0;
}

.container {
  flex: 1;
  height: 220px;
  text-align: center;
  overflow: hidden;
}

.container ul {
  transition: 0.6s;
  list-style: none;
}

.container li {
  height: 30px;
  line-height: 30px;
  transition: 0.2s;
}

.container li.active {
  color: skyblue;
  transform: scale(1.2);
}
</style>

