import { ChartData, ChartDataset } from 'chart.js';
import { IChartConfig } from '../../shared/models/chart-config';
import { COLOR_SCHEME, random } from '../../shared/models/utils';

export class ChartjsLinearChartDataService {
    public getChartData({ seriesCount, dataPointsCount }: IChartConfig): ChartData {
        const chartData: ChartData = { datasets: [] as ChartDataset[] };

        for (let index = 0; index < seriesCount; index++) {
            const data: any = [];

            for (let j = 0; j < dataPointsCount; j++) {
                data.push({
                    y: random(10, 200),
                    x: j.toString(),
                });
            }

            chartData.datasets!.push({
                label: `Dataset ${index + 1}`,
                data,
                borderColor: COLOR_SCHEME[index],
                backgroundColor: COLOR_SCHEME[index],
                cubicInterpolationMode: 'monotone',
            });
        }

        return chartData;
    }
}
