import { EChartsOption, SeriesOption } from 'echarts';
import { IChartConfig } from '../../shared/models/chart-config';
import { random } from '../../shared/models/utils';
import { CHART_CONFIGURATION } from '../models/echarts-chart-configuration';

export class EChartsLinearChartDataService {
    public getChartOption({ seriesCount, dataPointsCount }: IChartConfig): EChartsOption {
        const chartConfiguration: EChartsOption = CHART_CONFIGURATION;
        const legendData: string[] = [];
        const xAxisData: string[] = [];
        const series: SeriesOption[] = [];

        for (let index = 0; index < seriesCount; index++) {
            const seriesData: number[] = [];
            const seriesName = `Dataset ${index + 1}`;
            legendData.push(seriesName);

            for (let j = 0; j < dataPointsCount; j++) {
                seriesData.push(random(10, 200));
                if (xAxisData.length > dataPointsCount) {
                    continue;
                }

                xAxisData.push(j.toString());
            }

            series.push({ data: seriesData, type: 'line', smooth: true, name: seriesName });
        }

        return {
            ...chartConfiguration,
            legend: { data: legendData },
            xAxis: { type: 'category', data: xAxisData },
            series,
        };
    }
}
