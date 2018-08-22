import Scene from "./components/Scene.js";
import Spoke2 from "./components/Spoke2.js";
import Spinner from "./components/Spinner.js";

const LoopSquare = {
  props: ['count', 'n', 'size'],
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
}

const LoopHorse = {
  props: ["count", "n", "size"],
  template: `
      <g opacity="0.7">
        <image :width="size" :href="'./images/horse/horse' + String(n % 15 + 1).padStart(3,'0') + '.png'" />
     </g>
  `
};

const LoopHammer = {
  props: ['count', 'n', 'size'],
  template: `
      <g opacity="0.7">
        <image :width="size" :href="'./images/hammer/hammer00' + [n % 20] + '.png'" />
     </g>
  `
}

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
      { title: "Metropolis", component: LoopMetropolis },
      { title: "Hammer", component: LoopHammer },
      { title: "Horse", component: LoopHorse },
      { title: "Square", component: LoopSquare }
    ],
    loopIndex: 0,
    count: 60,
    size: 25,
    sceneSize: 600,
    speed: 1000
  }),
  template: `
    <div style="height: 100vh">
      <header>
        <div>
          <a href="https://designstem.github.io/homepage">Home</a>
          → Vinyl Frequency
        </div>
      </header>
      <div style="display: flex; height: 100%">
        <div style="width: 400px; padding: 2rem; border-right: 3px solid var(--color-gray-dark)">
          <h3>Image</h3>
          <div
            v-for="(loop,i) in loops"
            class="button_tertiary"
            :style="{background: i == loopIndex ? 'var(--color-gray-light)' : '', marginRight: '0.5rem'}"
            @click="loopIndex = i"
          >{{ loop.title }}</div>
          <br><br>
          <label>Image size <code>{{size}}px</code></label>
          <input type="range" v-model="size" />
          
          <h3>Speed</h3>
          <label>Speed <code>{{speed / 1000}} min</code> per rotation</label>
          
          <input type="range" v-model="speed" max="2000" />
          <div
            v-for="s in [0.5,1,1.5,2]"
            class="button_tertiary"
            @click="speed = s * 1000"
            style="margin-right: 0.5rem"
          >{{s}} min</div>
          
          <br><br>
          <h3>Count</h3>
          
          <label>Element count <code>{{count}}</code></label>
          <input type="range" v-model="count" />

          <div
            v-for="c in [15,30,45,60,120]"
            class="button_tertiary"
            @click="count = c"
            style="margin-right: 0.5rem"
          >{{c}}</div>

        </div>
        <div style="padding: 2rem; flex:1">
          <Scene :size="sceneSize">
            <Spinner :speed="speed">
            <g v-for="(_,n) in Array.from({length: 100}).slice(0,count)" :transform="r(360 / count * n)"> 
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
