<script lang='ts' setup>
// import { getLrc } from '@/api/musicApi'
import musicUrl from '@/assets/music/夜曲.mp3'

const { proxy } = getCurrentInstance()
const lrcData = ref()
const lrcLines = ref([])

const audioDom = ref(null)
const ulDom = ref(null)
const containerDom = ref(null)
const canvasDom = ref(null)
const ctx = ref(null)
const isInit = ref(false)
const analyser = ref(null)
const dataSource = ref(null)
const mode = ref('Wavy')

const getMusicLrc = () => {
  // getLrc().then(async lrc => {
    // const { data } = await lrc
    // lrcData.value = data
    lrcData.value = `[00:00.000]夜曲 - 周杰伦 (Jay Chou)
[00:04.990]词：方文山
[00:09.980]曲：周杰伦
[00:14.970]编曲：林迈可
[00:19.970]制作人：周杰伦
[00:24.960]一群嗜血的蚂蚁 被腐肉所吸引
[00:27.960]我面无表情 看孤独的风景
[00:30.980]失去你 爱恨开始分明
[00:33.470]失去你 还有什么事好关心
[00:36.430]当鸽子不再象征和平
[00:38.310]我终于被提醒
[00:39.680]广场上喂食的是秃鹰
[00:41.990]我用漂亮的押韵
[00:43.170]形容被掠夺一空的爱情
[00:45.500]
[00:46.950]啊 乌云开始遮蔽 夜色不干净
[00:49.640]公园里 葬礼的回音 在漫天飞行
[00:52.400]送你的白色玫瑰
[00:54.010]在纯黑的环境凋零
[00:55.550]乌鸦在树枝上诡异的很安静
[00:57.890]静静听 我黑色的大衣
[01:00.340]想温暖你日渐冰冷的回忆
[01:02.390]走过的走过的生命
[01:03.970]啊 四周弥漫雾气
[01:05.180]啊 我在空旷的墓地
[01:06.570]老去后还爱你
[01:08.040]
[01:08.980]为你弹奏肖邦的夜曲
[01:12.080]纪念我死去的爱情
[01:14.370]
[01:14.890]跟夜风一样的声音
[01:17.560]心碎的很好听
[01:20.380]手在键盘敲很轻
[01:23.120]我给的思念很小心
[01:25.890]你埋葬的地方叫幽冥
[01:29.590]
[01:30.100]为你弹奏肖邦的夜曲
[01:34.160]纪念我死去的爱情
[01:36.970]而我为你隐姓埋名
[01:39.660]在月光下弹琴
[01:42.480]对你心跳的感应
[01:45.200]还是如此温热亲近
[01:47.920]怀念你那鲜红的唇印
[01:52.050]
[02:15.190]那些断翅的蜻蜓 散落在这森林
[02:18.340]而我的眼睛 没有丝毫同情
[02:21.420]失去你 泪水混浊不清
[02:23.810]失去你 我连笑容都有阴影
[02:26.900]风在长满青苔的屋顶
[02:28.670]嘲笑我的伤心
[02:30.060]像一口没有水的枯井
[02:32.300]我用凄美的字型
[02:33.370]描绘后悔莫及的那爱情
[02:36.220]
[02:37.280]为你弹奏肖邦的夜曲
[02:40.330]纪念我死去的爱情
[02:43.100]跟夜风一样的声音
[02:45.820]心碎的很好听
[02:48.740]手在键盘敲很轻
[02:51.360]我给的思念很小心
[02:54.150]你埋葬的地方叫幽冥
[02:57.660]
[02:58.500]为你弹奏肖邦的夜曲
[03:02.390]纪念我死去的爱情
[03:05.210]而我为你隐姓埋名
[03:07.920]在月光下弹琴
[03:10.760]对你心跳的感应
[03:13.420]还是如此温热亲近
[03:16.240]怀念你那鲜红的唇印
[03:20.370]
[03:21.370]一群嗜血的蚂蚁 被腐肉所吸引
[03:24.490]我面无表情 看孤独的风景
[03:27.520]失去你 爱恨开始分明
[03:29.990]失去你 还有什么事好关心
[03:32.980]当鸽子不再象征和平
[03:34.810]我终于被提醒
[03:36.240]广场上喂食的是秃鹰
[03:38.470]我用漂亮的押韵
[03:39.680]形容被掠夺一空的爱情`
    parseLrc()
  // })
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

const initCanvas = () => {
  canvasDom.value.width = window.innerWidth * devicePixelRatio
  canvasDom.value.height = 300
}

const audioPlay = () => {
  audioDom.value.onplay = () => {
    if (isInit.value) return
    const audCtx = new AudioContext() // 音频上下文
    const source = audCtx.createMediaElementSource(audioDom.value) // 音频源节点
    analyser.value = audCtx.createAnalyser()
    analyser.value.fftSize = 512
    dataSource.value = new Uint8Array(analyser.value.frequencyBinCount)
    source.connect(analyser.value)
    analyser.value.connect(audCtx.destination)

    isInit.value = true
  }
}

// 柱状
const drawColumnar = () => {
  requestAnimationFrame(drawColumnar)
  const { width, height } = canvasDom.value
  ctx.value.clearRect(0, 0, width, height)
  if (!isInit.value) return
  if (dataSource.value) {
    analyser.value && analyser.value.getByteFrequencyData(dataSource.value)

    const len = dataSource.value.length
    const barWidth = width / len
    ctx.value.fillStyle = 'skyblue'
    dataSource.value.forEach((v, i) => {
      const barHeight = v / 255 * height
      const x = i * barWidth
      const y = height - barHeight
      ctx.value.fillRect(x, y, barWidth, barHeight)
    })
  }
}

// 波浪
const drawWavy = () => {
  requestAnimationFrame(drawWavy);
  const { width, height } = canvasDom.value
  ctx.value.clearRect(0, 0, width, height)
  if (!isInit.value) return
  if (dataSource.value) {
    analyser.value && analyser.value.getByteFrequencyData(dataSource.value)

    const len = dataSource.value.length
    const sliceWidth = width * 1.0 / len
    let x = 0

    ctx.value.beginPath();
    ctx.value.strokeStyle = 'skyblue'
    dataSource.value.forEach((v, i) => {
      const vNormalized = v / 255
      const y = vNormalized * height / 2

      if (i === 0) {
        ctx.value.moveTo(x, y)
      } else {
        ctx.value.lineTo(x, y)
      }

      x += sliceWidth
    });

    ctx.value.lineTo(width, height / 2);
    ctx.value.stroke();
  }
};

const changeMode = () => {
  mode.value = mode.value === 'Columnar' ? 'Wavy' : 'Columnar'
  mode.value == 'Columnar' ? drawColumnar() : drawWavy()
}

onMounted(() => {
  getMusicLrc()

  audioDom.value = proxy.$refs.audioRef as HTMLAudioElement
  ulDom.value = proxy.$refs.ulRef as HTMLUListElement
  containerDom.value = proxy.$refs.containerRef as HTMLDivElement
  canvasDom.value = proxy.$refs.canvasRef as HTMLDivElement
  ctx.value = canvasDom.value.getContext('2d')

  audioPlay()

  initCanvas()

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
      <div style="width: 60px; text-align: center;">
        <el-button link @click="changeMode">{{ mode }}</el-button>
      </div>
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

