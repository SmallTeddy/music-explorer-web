import{d as P,r as s,c as b,o as V,a as j,b as C,e as n,u as R,f as O,w as J,F as Y,g as G,h as K,i as S,j as Q,t as H,p as X,k as Z,_ as ee}from"./index-0f544bdb.js";const te=""+new URL("十一月的肖邦-5bd2859e.png",import.meta.url).href,ae=""+new URL("夜曲-e1816606.mp3",import.meta.url).href,I=m=>(X("data-v-9b53faef"),m=m(),Z(),m),ne={class:"music-container flex flex-column flex-align"},le={class:"audio-container flex-align"},se=I(()=>n("img",{src:te,alt:"十一月的肖邦",style:{width:"5.2rem"}},null,-1)),oe=I(()=>n("div",{class:"flex-column",style:{"margin-left":"0.5rem"}},[n("div",{style:{"font-size":"1.6rem",color:"#999","margin-bottom":"0.2rem"}},"夜曲"),n("div",{style:{"font-size":"1.2rem",color:"#999"}},"周杰伦 - 夜曲")],-1)),ce={class:"mp3Box"},ie=["src"],ue={style:{width:"60px","text-align":"center"}},re={ref:"containerRef",class:"lrc-container"},ve={ref:"ulRef",class:"lrc-list"},de={class:"cvs-container"},fe={ref:"canvasRef"},me=P({__name:"index",setup(m){const{proxy:_}=K(),k=s(),r=s([]),f=s(null),v=s(null),L=s(null),d=s(null),l=s(null),h=s(!1),o=s(null),c=s(null),p=s("Wavy"),W=()=>{k.value=`[00:00.000]夜曲 - 周杰伦 (Jay Chou)
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
[03:39.680]形容被掠夺一空的爱情`,z()},z=()=>{const e=k.value.split(`
`);r.value=[],e.map(t=>{const a=t.split("]"),i=a[0].substring(1),u={time:A(i),words:a[1]};r.value.push(u)})},A=e=>{const t=e.split(":");return+t[0]*60+ +t[1]},D=b(()=>{var e;return(e=L.value)==null?void 0:e.clientHeight}),B=b(()=>{var e;return(e=v.value.children[0])==null?void 0:e.clientHeight}),T=b(()=>{var e;return((e=v.value)==null?void 0:e.clientHeight)-D.value}),E=()=>{const e=f.value.currentTime;for(let t=0;t<r.value.length;t++)if(e<r.value[t].time)return t-1;return r.value.length-1},N=()=>{const e=E();let t=B.value*e+B.value/2-D.value/2;t=t<0?0:t,t=t>T.value?T.value:t,v.value.style.transform=`translateY(-${t}px)`;let a=v.value.querySelector(".active");a&&a.classList.remove("active"),a=v.value.children[e],a&&a.classList.add("active")},$=()=>{d.value.width=window.innerWidth*devicePixelRatio,d.value.height=300},M=()=>{f.value.onplay=()=>{if(h.value)return;const e=new AudioContext,t=e.createMediaElementSource(f.value);o.value=e.createAnalyser(),o.value.fftSize=512,c.value=new Uint8Array(o.value.frequencyBinCount),t.connect(o.value),o.value.connect(e.destination),h.value=!0}},q=()=>{requestAnimationFrame(q);const{width:e,height:t}=d.value;if(l.value.clearRect(0,0,e,t),!!h.value&&c.value){o.value&&o.value.getByteFrequencyData(c.value);const a=c.value.length,i=e/a;l.value.fillStyle="skyblue",c.value.forEach((u,w)=>{const g=u/255*t,F=w*i,y=t-g;l.value.fillRect(F,y,i,g)})}},x=()=>{requestAnimationFrame(x);const{width:e,height:t}=d.value;if(l.value.clearRect(0,0,e,t),!!h.value&&c.value){o.value&&o.value.getByteFrequencyData(c.value);const a=c.value.length,i=e*1/a;let u=0;l.value.beginPath(),l.value.strokeStyle="skyblue",c.value.forEach((w,g)=>{const y=w/255*t/2;g===0?l.value.moveTo(u,y):l.value.lineTo(u,y),u+=i}),l.value.lineTo(e,t/2),l.value.stroke()}},U=()=>{p.value=p.value==="Columnar"?"Wavy":"Columnar",p.value=="Columnar"?q():x()};return V(()=>{W(),f.value=_.$refs.audioRef,v.value=_.$refs.ulRef,L.value=_.$refs.containerRef,d.value=_.$refs.canvasRef,l.value=d.value.getContext("2d"),M(),$(),x(),f.value.addEventListener("timeupdate",N)}),(e,t)=>{const a=j("el-button");return S(),C("div",ne,[n("div",le,[se,oe,n("div",ce,[n("audio",{ref:"audioRef",controls:"",src:R(ae)},null,8,ie)]),n("div",ue,[O(a,{link:"",onClick:U},{default:J(()=>[Q(H(R(p)),1)]),_:1})])]),n("div",re,[n("ul",ve,[(S(!0),C(Y,null,G(R(r),i=>(S(),C("li",{key:i.time},H(i.words),1))),128))],512)],512),n("div",de,[n("canvas",fe,null,512)])])}}});const he=ee(me,[["__scopeId","data-v-9b53faef"]]);export{he as default};
