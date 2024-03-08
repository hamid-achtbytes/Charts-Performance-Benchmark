import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, HostListener, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LineChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { tap, timer } from 'rxjs';
import { LinearChartConfiguratorComponent } from '../shared/components/linear-chart-configurator/linear-chart-configurator.component';
import { IChartConfig } from '../shared/models/chart-config';
import { EChartsLinearChartDataService } from './services/echarts-linear-chart-data.service';

@Component({
    selector: 'app-echarts-linear-chart',
    standalone: true,
    imports: [LinearChartConfiguratorComponent],
    providers: [EChartsLinearChartDataService],
    templateUrl: './echarts-linear-chart.component.html',
    styleUrl: './echarts-linear-chart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EChartsLinearChartComponent implements OnDestroy {
    @ViewChild('chartContainer', { static: true }) chartContainer: ElementRef = null!;

    private linearChartDataService = inject(EChartsLinearChartDataService);
    private chart?: echarts.ECharts;
    private destroyRef = inject(DestroyRef);

    public timeTakenToGenerate = signal(0);
    public inProgress = signal(false);
    public totalDataPoints = signal(0);

    constructor() {
        echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, LabelLayout, CanvasRenderer]);
    }

    public ngOnDestroy(): void {
        this.chart?.dispose();
    }

    @HostListener('window:resize')
    private onResize(): void {
        this.chart?.resize();
    }

    public displayChart(chartConfig: IChartConfig): void {
        this.inProgress.set(true);
        const start = performance.now();

        this.chart?.dispose();

        timer(50)
            .pipe(
                tap(() => {
                    const chartContainer = this.chartContainer.nativeElement as HTMLDivElement;
                    this.chart = echarts.init(chartContainer, null, { renderer: 'canvas', useDirtyRect: false });

                    const chartOption = this.linearChartDataService.getChartOption(chartConfig);

                    this.chart.setOption(chartOption);

                    this.chart?.on('finished', () => {
                        if (!this.inProgress()) {
                            return;
                        }

                        this.inProgress.set(false);
                        this.totalDataPoints.set(chartConfig!.seriesCount * chartConfig!.dataPointsCount);
                        this.timeTakenToGenerate.set(performance.now() - start);
                    });
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
    }
}
