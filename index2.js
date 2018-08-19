import Scene from "./components/Scene.js";
import Spoke2 from "./components/Spoke2.js";
import Spinner from "./components/Spinner.js";

new Vue({
  el: "#app",
  components: { Scene, Spoke2, Spinner },
  data: () => ({}),
  template: `
    <div style="height: 100vh">
      <header>
        <div>
          <a href="https://designstem.github.io/homepage">Home</a>
          → Vinyl Frequency II
        </div>
      </header>
      <div>
        <Scene size="800">
          <g transform="translate(-250,-250)">
            <Spinner speed="1000">
            <g transform="rotate(-180)">
              <Spoke2 count="15" start="0" stop="15" />
            </g>
            </Spinner>
            <!--Spinner speed="1000">
              <circle cx="0" cy="-100" r="10" fill="var(--color-blue)" />
              <line x1="0" y1="0" x2="0" y2="-100" stroke="var(--color-blue)" stroke-width="3" />
            </Spinner-->
          </g>
          <g transform="translate(0,-250)">
            <Spinner speed="1000">
            <g transform="rotate(180)">
              <Spoke2 count="30" start="0" stop="30" color="#bbb" />
            </g>
            </Spinner>
            <!--g transform="rotate(0)">
              <Spoke2 count="30" start="0" stop="15" />
            </g>
            <Spinner speed="2000">
              <circle cx="0" cy="-100" r="10" fill="var(--color-blue)" />
              <line x1="0" y1="0" x2="0" y2="-100" stroke="var(--color-blue)" stroke-width="3" />
            </Spinner-->
          </g>
          <g transform="translate(250,-250)">
            <Spinner speed="1000">
            <g transform="rotate(-270)">
              <Spoke2 count="60" start="0" stop="60" color="#bbb" />
            </g>
            </Spinner>
            <!--g transform="rotate(0)">
              <Spoke2 count="60" start="0" stop="15" />
            </g>
            <Spinner speed="4000">
              <circle cx="0" cy="-100" r="10" fill="var(--color-blue)" />
              <line x1="0" y1="0" x2="0" y2="-100" stroke="var(--color-blue)" stroke-width="3" />
            </Spinner-->
          </g>
        </Scene>
      </div>
    </div>
    `
});