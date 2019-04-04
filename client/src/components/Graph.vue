
<template>
  <div class="mygraph" ref="chartdiv">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { post } from "axios";

am4core.useTheme(am4themes_animated);

export default {
  name: "graph",
  props: ["propData"],
   data() {
    return {
      data: []
    }
  },

  async mounted() {
    let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

    chart.paddingRight = 20;

    const { data } = await post("http://localhost:5000/stat-get", {
      name: "king of taste"
    });

    this.data = data

    chart.data = this.data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "likes";

    series.tooltipText = "{valueY}";
    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    this.chart = chart;
  },
    watch: {
    propData: async function(val) {
      const { data } = await post("http://localhost:5000/stat-get", {
        name: "king of taste",
        time: val
      });
      console.log('from server', data)

    this.data = data  
    let chart = this.chart
    chart.data = this.data;
  

      
      }
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mygraph {
  width: 100%;
  height: 500px;
}
</style>