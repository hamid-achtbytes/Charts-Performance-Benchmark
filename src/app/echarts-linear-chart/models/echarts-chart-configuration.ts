import { EChartsOption } from 'echarts';

export const CHART_CONFIGURATION: EChartsOption = {
    title: {
        text: 'ECharts Line Chart',
    },
    tooltip: {
        trigger: 'axis',
    },
    animationDuration: 1,
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
    },
    yAxis: {
        type: 'value',
    },
};
