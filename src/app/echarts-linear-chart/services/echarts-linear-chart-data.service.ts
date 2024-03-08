import { ChartData } from 'chart.js';
import { random } from '../../shared/models/utils';

export class EChartsLinearChartDataService {
    public getChartData(seriesCount: number, dataPointsCount: number): ChartData {
        const chartData: any = { datasets: [] };

        for (let index = 0; index < seriesCount; index++) {
            const data = [];

            for (let j = 0; j < dataPointsCount; j++) {
                data.push({
                    y: random(10, 200),
                    x: j.toString(),
                });
            }

            // chartData.datasets!.push({
            //     label: `Dataset ${index + 1}`,
            //     data,
            //     borderColor: COLOR_SCHEME[index],
            //     backgroundColor: COLOR_SCHEME[index],
            //     cubicInterpolationMode: 'monotone',
            // });
        }

        return chartData;
    }
}
