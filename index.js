import Scene from "./components/Scene.js";
import Spinner from './components/Spinner.js'
import Box from "./components/Box.js";
import Spoke from "./components/Spoke.js";
import Spiral from "./components/Spiral.js";
import Shutter from "./components/Shutter.js";
import Flower from "./components/Flower.js";

new Vue({
  el: "#app",
    components: { Scene, Spinner, Box, Spoke, Spiral, Shutter, Flower },
  data: () => ({
    size: 200,
    speed: 1800,
    speed2: 120,
    count: 108,
    radius: 5,
    divide: 104
  }),
  template: `
        <div>
            <h5>Size: {{size}} px</h5>
            <input type="range" v-model="size" max="1000" />
            
            <h5>Speed: {{speed}} ms {{speed/1000}} s</h5>
            <input v-model="speed" min="0.1" max="5000" step="0.01" />
            <input type="range" v-model="speed" min="0.1" max="5000" step="0.01" />
            
            <button @click="speed = 1800; count = 108">33⅓ RPM</button>
            <button @click="speed = 1333; count = 80">45 RPM</button>

            <h5>Spoke count: {{count}}, degrees: {{360 / count}} </h5>
            <input v-model="count" max="360" />
            <input type="range" v-model="count" max="360" />
            
            <h5>Radius: {{radius}}</h5>
            <input type="range" v-model="radius" max="720" />

            <h5>Flower divide: {{divide}}</h5>
            <input type="range" v-model="divide" min="1" :max="count" />
            
            <Scene :size="size">
                <Spinner :speed="speed" direction="">
                    <Box :size="size / 2" fill="none" />
                </Spinner>
            </Scene>

            <Scene :size="size">
                <Spinner :speed="speed">
                    <Spoke :size="size / 2" :count="count" />
                </Spinner>
            </Scene>

            <Scene :size="size">
                <Spinner :speed="speed">
                    <Flower :size="size / 2" :count="count" :divide="divide"/>
                </Spinner>
            </Scene>

        </div>
    `
});