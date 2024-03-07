import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { LineChart } from 'echarts/charts';
import { DatasetComponentOption, GridComponent, GridComponentOption, LegendComponent, TitleComponent, TitleComponentOption, TooltipComponent, TooltipComponentOption } from 'echarts/components';
import * as echarts from 'echarts/core';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { BarSeriesOption, LineSeriesOption } from 'echarts/types/dist/shared';
import { chartConfiguration } from './models/chart-configuration';

@Component({
    selector: 'app-linear-chart',
    standalone: true,
    imports: [],
    templateUrl: './linear-chart.component.html',
    styleUrl: './linear-chart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EChartsLinearChartComponent implements AfterViewInit {
    @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

    private chart?: echarts.ECharts;

    public ngAfterViewInit(): void {
        echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, LabelLayout, CanvasRenderer]);

        // Create the echarts instance
        const chartContainer = this.chartContainer.nativeElement as HTMLDivElement;
        this.chart = echarts.init(chartContainer, null, { renderer: 'canvas', useDirtyRect: false });

        const config = {
            ...chartConfiguration,
            series: [
                {
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    smooth: true,
                    name: 'Email',
                },
                {
                    data: [620, 732, 701, 734, 1090, 1130, 1120],
                    type: 'line',
                    smooth: true,
                    name: 'Union Ads',
                },
                {
                    data: [320, 432, 401, 434, 590, 630, 620],
                    type: 'line',
                    smooth: true,
                    name: 'Video Ads',
                },
                {
                    data: [120, 232, 201, 234, 290, 330, 320],
                    type: 'line',
                    smooth: true,
                    name: 'Direct',
                },
                {
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    smooth: true,
                    name: 'Search Engine',
                },
            ],
        };

        // Draw the chart
        this.chart.setOption(config);
    }

    @HostListener('window:resize')
    private onResize(): void {
        this.chart?.resize();
    }
}
