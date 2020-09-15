<template>
  <v-container fluid class="px-12 container">
    <h1 class="text-center head">欢迎进入雪中控制台</h1>
    <v-row>
      <v-col cols="3">
        <v-card flat :loading="loading">
          <v-card-title>栏目管理</v-card-title>
          <v-card-text class="pa-0">
            <div id="chart1"></div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card flat :loading="loading">
          <v-card-title>栏目柱状信息</v-card-title>
          <v-card-text class="pa-0">
            <div id="chart2"></div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card flat :loading="loading">
          <v-card-title>词云</v-card-title>
          <v-card-text class="pa-0">
            <div id="chart3" class="my-word-box"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-btn @click="render">test</v-btn> -->
  </v-container>
</template>
<script>
import { getAllColumnCount } from "@api";
import { View } from "@antv/data-set";
import { words } from "@/plugins/static.js";
import { Chart, registerShape, Util } from "@antv/g2"; //或者只引入需要用到的G2组件，我要用Chart
export default {
  name: "index",
  data: () => ({
    columnData: [],
    loading: true,
    chart1: null,
    chart2: null,
    chart3: null,
  }),
  async mounted() {
    let that = this;
    await that.getColumnCount();
  },
  methods: {
    render() {
      let that = this;
      // that.chart1.render();
    },
    async getColumnCount() {
      let that = this;
      try {
        let res = await getAllColumnCount();
        that.columnData = res.data;
        setTimeout(() => {
          that.initLineChart();
          that.initPillarChart();
          that.words();
          that.loading = false;
        }, 500);
      } catch (e) {
        console.log(e);
        return that.$hint({
          msg: "获取栏目信息失败",
          type: "error",
        });
      }
    },
    initLineChart() {
      let that = this;
      console.log(that.columnData);
      const chart = (that.chart1 = new Chart({
        container: "chart1",
        autoFit: true,
        height: 150,
        appendPadding: 20,
      }));

      chart.data(that.columnData);
      chart.scale({
        num: {
          min: 10,
          nice: true,
        },
        name: {
          range: [0, 1],
        },
      });
      chart.tooltip({
        showCrosshairs: true,
        shared: true,
      });

      chart.axis("num", {
        label: {
          formatter: (val) => {
            return val;
          },
        },
      });
      chart.area().position("name*num").shape("smooth");
      chart.line().position("name*num").shape("smooth");
      chart.point().position("name*num").color("#0094ff").shape("circle");
      chart.render();
    },
    initPillarChart() {
      let that = this;
      const chart = (that.chart2 = new Chart({
        container: "chart2",
        autoFit: true,
        height: 150,
        appendPadding: 20,
      }));
      chart.data(that.columnData);
      chart.scale("num", {
        nice: true,
      });
      chart.axis("name", {
        tickLine: null,
      });

      chart.axis("num", function (val) {
        return val;
      });

      chart.tooltip({
        showMarkers: false,
      });
      chart.interaction("element-active");

      chart.legend(false);
      chart
        .interval()
        .position("name*num")
        .label("num", function (val) {
          return val;
        })
        .color("name", ["#063d8a", "#1770d6", "#47abfc", "#38c060", "#0094ff"]);
      chart.render();
    },
    words() {
      // 给point注册一个词云的shape
      let that = this;
      registerShape("point", "cloud", {
        draw(cfg, container) {
          const attrs = that.getTextAttrs(cfg);
          const textShape = container.addShape("text", {
            attrs: {
              ...attrs,
              x: cfg.x,
              y: cfg.y,
            },
          });
          if (cfg.data.rotate) {
            Util.rotate(textShape, (cfg.data.rotate * Math.PI) / 180);
          }
          return textShape;
        },
      });
      let _w = that.$(".my-word-box").offsetWidth;
      const dv = new View().source(words);
      const range = dv.range("value");
      const min = range[0];
      const max = range[1];
      dv.transform({
        type: "tag-cloud",
        fields: ["x", "value"],
        size: [_w, 150],
        font: "Verdana",
        padding: 0,
        timeInterval: 5000, // max execute time
        rotate() {
          let random = ~~(Math.random() * 4) % 4;
          if (random === 2) {
            random = 0;
          }
          return random * 90;
        },
        fontSize(d) {
          if (d.value) {
            return ((d.value - min) / (max - min)) * (80 - 24) + 24;
          }
          return 0;
        },
      });
      const chart = (that.chart3 = new Chart({
        container: "chart3",
        autoFit: true,
        width: _w,
        height: 150,
        padding: 0,
      }));
      chart.data(dv.rows);
      chart.scale({
        x: { nice: false },
        y: { nice: false },
      });
      chart.legend(false);
      chart.axis(false);
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
      });
      chart.coordinate().reflect();
      chart.point().position("x*y").shape("cloud").tooltip("category");
      chart.interaction("element-active");
      chart.render();
    },
    getTextAttrs(cfg) {
      return {
        fontSize: cfg.data.size,
        text: cfg.data.text,
        textAlign: "center",
        fontFamily: cfg.data.font,
        fill: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )},${Math.floor(Math.random() * 255)})`,
        textBaseline: "Alphabetic",
      };
    },
  },
};
</script>
<style lang="scss" scoped>
#chart1，#chart2,
#chart3 {
  background-color: #fff;
}
.head {
  margin-bottom: 50px;
}
</style>