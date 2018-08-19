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
        <image :width="size" :href="'./images/hammer00' + [n % 20] + '.png'" />
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
  components: { Scene, Spoke2, Spinner, LoopSquare, LoopHammer, LoopMetropolis, LoopHorse },
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
  data: () => ({ count: 30, size: 25, sceneSize: 800, speed: 1000 }),
  template: `
    <div style="height: 100vh">
      <header>
        <div>
          <a href="https://designstem.github.io/homepage">Home</a>
          → Vinyl Frequency III
        </div>
      </header>
      <div>
        <label>Speed <code>{{speed / 1000}}</code></label>
        <input type="range" v-model="speed" max="2000" />
        <label>Element count <code>{{count}}</code></label>
        <input type="range" v-model="count" />
        <label>Element size <code>{{size}}</code></label>
        <input type="range" v-model="size" />
        <Scene :size="sceneSize">
          <Spinner :speed="speed">
          <g v-for="(_,n) in Array.from({length: 100}).slice(0,count)" :transform="r(360 / count * n)"> 
          <g :transform="t(0,(sceneSize / 2 - size) * -1 * 0.9)"> 
            <LoopHorse :count="count" :n="n" :size="size" />
          </g>        
          </g>
        </Spinner>
        </Scene>
      </div>
    </div>
    `
});
