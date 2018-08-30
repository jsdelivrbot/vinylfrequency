import Scene from "./components/Scene.js";
import Spoke2 from "./components/Spoke2.js";
import Spinner from "./components/Spinner.js";

const LoopSquare = {
  props: ["count", "n", "size"],
  methods: {
    t(x, y, r = 0) {
      return `translate(${x},${y})`;
    },
    r(angle) {
      return `rotate(${angle})`;
    }
  },
  template: `
    <g :transform="r(360 / count * n)" opacity="0.5">
      <rect :x="size / -2" :y="size / -2" :width="size" :height="size" fill="var(--color-purple)" />
      <rect :x="size / -2" :y="size / -2" :width="size / 2" :height="size / 2" fill="var(--color-yellow)" />
    </g>
  `
};

const LoopColor = {
  props: ["count", "n", "size"],
  template: `
      <g>
        <rect :x="size / -2" :y="size / -2" :width="size" :height="size" :fill="['#ff0000','#00ff00','#0000ff'][n % 3]" />
     </g>
  `
};

const LoopLine = {
  props: ["count", "n", "size"],
  template: `
      <g>
        <rect :x="size / -2" :y="size / -2" :width="10" :height="size" fill="var(--color-purple)" />
     </g>
  `
};

const LoopHorse = {
  props: ["count", "n", "size"],
  template: `
      <g opacity="0.7">
        <image :width="size" :href="'./images/horse/horse' + String(n % 15 + 1).padStart(3,'0') + '.png'" />
     </g>
  `
};

const LoopHammer = {
  props: ["count", "n", "size"],
  template: `
      <g opacity="0.7">
        <image :width="size" :href="'./images/hammer/hammer00' + [n % 20] + '.png'" />
     </g>
  `
};

const LoopMetropolis = {
  props: ["count", "n", "size"],
  template: `
      <g opacity="1">
        <image :width="size" :href="'./images/metropolis/metropolis' + String(n * 2 + 1).padStart(3,'0') + '.png'" />
     </g>
  `
};

new Vue({
  el: "#app",
  components: {
    Scene,
    Spoke2,
    Spinner,
    LoopLine,
    LoopSquare,
    LoopHammer,
    LoopMetropolis,
    LoopHorse
  },
  methods: {
    t(x, y, r = 0) {
      return `translate(${x},${y})`;
    },
    r(angle) {
      return `rotate(${angle})`;
    },
    path(points) {
      return points.map(p => p.join(",")).join(",");
    }
  },
  data: () => ({
    loops: [
      { title: "Line", component: LoopLine },
      { title: "Metropolis", component: LoopMetropolis },
      { title: "Hammer", component: LoopHammer },
      { title: "Horse", component: LoopHorse },
      { title: "Square", component: LoopSquare },
      { title: "Color", component: LoopColor }
    ],
    loopIndex: 0,
    count: 60,
    size: 25,
    sceneSize: 700,
    speed: 1000
  }),
  template: `
    <div style="height: 100vh">
      <header style="background: var(--color-yellow)">
        <div>
          <a href="https://designstem.github.io/homepage">Home</a>
          → Frequency & Movement
        </div>
      </header>
      <!--header>
        <div>
          <div>Steps:&nbsp;&nbsp;<div class="bullet">1</div></div>
        </div>
      </header-->
      <div style="display: flex; height: 100%">
        <div style="padding: 2rem; border-right: 3px solid var(--color-gray-dark)">
          
          <h2><div class="bullet">1</div>Make it Stop</h2>
          <h3>Adjust the wheel speed so it stops</h3>
          <div class="text">
            <p>Rotation speed is <code>{{speed }}</code> <i>milliseconds</i> per rotation. 
          This is roughly <code>{{ speed / 1000}}</code> <i>seconds</i>
            <p>
          </div>
          <br>
          <input type="range" v-model="speed" step="2" min="0" max="2000" />
          
          <template v-if="speed == 0">
            <div class="text">Hey, this is cheating! The wheel has to have <i>some</i> speed :)</div>
          </template>

          <template v-if="speed == 1000">
          <div class="text">
            <p>Great! You found that magical point, so it takes exactly <code>1&nbsp;second</code> to make the wheel stop. <i>Why</i>?</p>
            <p>Lets move to next step to figure this out.</p>
          </div>
          <br>
            <a href="./index.html" class="button_secondary">←</a> <a href="./step2.html" class="button_primary">Go to Step 2 →</a>
          </template>

        </div>
        <div style="padding: 2rem; flex:1">
          <Scene :size="sceneSize">
            <Spinner :speed="speed">
            <g v-for="(_,n) in Array.from({length: 120}).slice(0,count)" :transform="r(360 / count * n)"> 
            <g :transform="t(0,(sceneSize / 2 - size) * -1 * 0.9)"> 
              <component :is="loops[loopIndex].component" :count="count" :n="n" :size="size" />
            </g>        
            </g>
          </Spinner>
          </Scene>
        </div>
      </div>
    </div>
    `
});
