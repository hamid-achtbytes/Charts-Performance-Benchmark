import echarts, { BarSeriesOption, DatasetComponentOption, GridComponentOption, LineSeriesOption, TitleComponentOption, TooltipComponentOption } from 'echarts';

export type ECOption = echarts.ComposeOption<BarSeriesOption | LineSeriesOption | TitleComponentOption | TooltipComponentOption | GridComponentOption | DatasetComponentOption>;

export const chartConfiguration: ECOption = {
    title: {
        text: 'ECharts Line Chart',
    },
    tooltip: {
        trigger: 'axis',
    },
    legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
        type: 'value',
    },
    series: [],
};
