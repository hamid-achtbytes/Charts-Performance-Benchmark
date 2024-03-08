import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, HostListener, ViewChild, inject, signal } from '@angular/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timer, tap } from 'rxjs';
import { LinearChartConfiguratorComponent } from '../shared/components/linear-chart-configurator/linear-chart-configurator.component';
import { IChartConfig } from '../shared/models/chart-config';
import { chartConfiguration } from './models/echarts-chart-configuration';

@Component({
    selector: 'app-echarts-linear-chart',
    standalone: true,
    imports: [LinearChartConfiguratorComponent],
    templateUrl: './echarts-linear-chart.component.html',
    styleUrl: './echarts-linear-chart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EChartsLinearChartComponent {
    @ViewChild('chartContainer', { static: true }) chartContainer: ElementRef = null!;

    private chart?: echarts.ECharts;
    private destroyRef = inject(DestroyRef);

    public timeTakenToGenerate = signal(0);
    public inProgress = signal(false);
    public totalDataPoints = signal(0);

    constructor() {
        echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, LabelLayout, CanvasRenderer]);
    }

    @HostListener('window:resize')
    private onResize(): void {
        this.chart?.resize();
    }

    public displayChart(chartConfig: IChartConfig): void {
        const { seriesCount, dataPointsCount } = chartConfig;

        this.inProgress.set(true);
        const start = performance.now();

        this.chart?.dispose();

        timer(50)
            .pipe(
                tap(() => {
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

                    this.inProgress.set(false);
                    this.totalDataPoints.set(seriesCount! * dataPointsCount!);
                    this.timeTakenToGenerate.set(performance.now() - start);
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
    }
}
