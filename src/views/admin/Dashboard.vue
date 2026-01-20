<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts/core';
import { PieChart, BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { reqAllProducts } from "@/api/admin/product";
import { announcement } from '@/data/anouncement';

import type {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
} from 'echarts/components';
import type { ComposeOption } from 'echarts/core';
import type { AllProductData, ProductData } from '@/types/admin/product';

type ECOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

echarts.use([
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent,
]);

const pieChart = ref<HTMLElement | null>(null);
const barChart = ref<HTMLElement | null>(null);
const donutChart = ref<HTMLElement | null>(null);
const allProductData = ref<AllProductData>({});
const pieData = ref<ProductData[]>([]);
const barData = ref<ProductData[]>([]);
const donutData = ref<ProductData[]>([]);
const loading = ref(false);

const getAllProducts = async () => {
  loading.value = true;
  try {
    const result = await reqAllProducts();
    if (result.data.success) {
      allProductData.value = result.data.products;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}; 

const processPieData = () => {
  pieData.value = Object.values(allProductData.value)
  const pieStatus = pieData.value.reduce((acc, cur) => {
    const category = cur.category
    if(acc[category]) {
      acc[category]++
    } else {
      acc[category] = 1
    }
    return acc
  }, {} as Record<string, number>)

  return Object.keys(pieStatus).map(key => ({
    name: key,
    value: pieStatus[key]
  }));
}

const renderPieChart = () => {
  const myChart = echarts.init(pieChart.value);
  const option: ECOption = {
    title: {
      text: '產品分類佔比'
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '產品分類',
        type: 'pie',
        radius: '50%', 
        data: processPieData(),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  myChart.setOption(option);
}

const processBarData = () => {
    barData.value = Object.values(allProductData.value)
    const title = barData.value.map(item => item.title)
    const originPrice = barData.value.map(item => item.origin_price)
    const price = barData.value.map(item => item.price)
    return { title, originPrice, price }
}

const renderBarChart = () => {
  const myChart = echarts.init(barChart.value);
  const option: ECOption = {
    title: {
      text: '產品定價顯示'
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: { data: ['原價', '特價'] },
    xAxis: {
      type: 'category',
      data: processBarData().title,
      axisLabel: { 
        interval: 0, 
        rotate: 60,
        fontSize: 10
      }
    },
    yAxis: { type: 'value', name: 'NTD' },
    series: [
      {
        name: '原價',
        type: 'bar',
        data: processBarData().originPrice,
        itemStyle: { color: '#D3D3D3' },
        barGap: '1%'
      },
      {
        name: '特價',
        type: 'bar',
        data: processBarData().price,
        itemStyle: { color: '#4A90E2' },
      }
    ]
  }
  myChart.setOption(option);
}

const processDonutData = () => {
    donutData.value = Object.values(allProductData.value)
    const donutStatus = donutData.value.reduce((acc, cur) => {
      const isEnabled = cur.is_enabled? "已上架" : "未上架"
      if(acc[isEnabled]) {
        acc[isEnabled]++
      } else {
        acc[isEnabled] = 1
      }
      return acc
    }, {} as Record<string, number>)

    return Object.keys(donutStatus).map(key => ({
      name: key,
      value: donutStatus[key]
    }));
}

const renderDountData = () => {
  const myChart = echarts.init(donutChart.value);
  const totalProducts = donutData.value.length;

  const option: ECOption = {
    title: {
      text: '產品上架狀態',
      subtext: `總計 ${totalProducts} 件`,
      left: 'center',
      top: '43%',
      textStyle: { fontSize: 18, fontWeight: 'bold' },
      subtextStyle: { fontSize: 14 }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} 件 ({d}%)'
    },
    legend: { data: ['已上架', '未上架'] },
    series: [
      {
        name: '產品上架狀態',
        type: 'pie',
        radius: ['45%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: false
          }
        },
        data: processDonutData()
      }
    ]
  }
  myChart.setOption(option);
}

onMounted(async () => {
  await getAllProducts();
  renderPieChart();
  renderBarChart();
  renderDountData();
})

</script>

<template>
  <h3>Dashboard</h3>
  <div class="dashboard-container">
    <div class="notice-board">
      <div class="notice-header">
        <h4>最新公告</h4>
        <i><font-awesome-icon icon="fa-solid fa-bullhorn" /></i>
      </div>
      <div class="notice-content">
        <div class="notice-item" v-for="(item, index) in announcement" :key="index">
          <h5>{{ item.title }}</h5>
          <p>{{ item.content }}</p>
          <ElDivider v-if="index !== announcement.length - 1"/>
        </div>
      </div>
    </div>
    <div class="chart-container">
      <div ref="pieChart"></div>
      <div ref="donutChart"></div>
      <div ref="barChart"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
h3 {
    margin-bottom: 1rem;
  }


.dashboard-container {
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 25% 75%;
  grid-gap: 1rem;

  .notice-board {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 100%;
    min-height: 400px;
    max-height: 750px;

    .notice-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h4,i {
        padding: 0.5rem 1rem;
      }
    }

    .notice-content {
      gap: 1rem;
      border-top: 1px solid #ccc;
      padding: 5px 10px;
      flex: 1;
      overflow-y: auto;
      min-height: 0;
      
      .notice-item {
        padding: 5px
      }
    }
  }


  .chart-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 1rem;

    div {
      min-height: 350px;
      max-height: 450px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    div:nth-child(3) {
      grid-column: span 2;
    }
  }
}



  
</style>
