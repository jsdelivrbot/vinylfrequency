import Scene from "./components/Scene.js";
import Spoke2 from "./components/Spoke2.js";
import Spinner from "./components/Spinner.js";

new Vue({
  el: "#app",
  components: { Scene, Spoke2, Spinner },
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
            <g :transform="r(360 / count * n)" opacity="0.5">
              <rect :x="size / -2" :y="size / -2" :width="size" :height="size" fill="var(--color-purple)" />
              <rect :x="size / -2" :y="size / -2" :width="size / 2" :height="size / 2" fill="var(--color-yellow)" />
            </g>
          </g>        
          </g>
        </Spinner>
        </Scene>
      </div>
    </div>
    `
});
