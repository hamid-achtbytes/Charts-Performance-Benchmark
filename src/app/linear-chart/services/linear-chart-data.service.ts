import { ChartData } from 'chart.js';
import { COLOR_SCHEME } from '../models/utils';

export class LinearChartDataService {
    public getChartData(seriesCount: number, dataPointsCount: number): ChartData {
        const chartData: any = { datasets: [] };

        for (let index = 0; index < seriesCount; index++) {
            const data = [];

            for (let j = 0; j < dataPointsCount; j++) {
                data.push({
                    y: this.random(10, 200),
                    x: j.toString(),
                });
            }

            chartData.datasets!.push({
                label: `Dataset ${index + 1}`,
                data,
                borderColor: COLOR_SCHEME[index],
                backgroundColor: COLOR_SCHEME[index],
            });
        }

        return chartData;
    }

    private random(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
