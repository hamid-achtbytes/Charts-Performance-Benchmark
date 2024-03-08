import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoryScale, Chart, ChartConfiguration, Decimation, Filler, Legend, LineController, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import { tap, timer } from 'rxjs';
import { LinearChartConfiguratorComponent } from '../shared/components/linear-chart-configurator/linear-chart-configurator.component';
import { IChartConfig } from '../shared/models/chart-config';
import { chartjsLinearchartConfiguration } from './models/chartjs-configuration';
import { ChartjsLinearChartDataService } from './services/chartjs-linear-chart-data.service';

@Component({
    selector: 'app-chartjs-linear-chart',
    standalone: true,
    imports: [CommonModule, LinearChartConfiguratorComponent],
    providers: [ChartjsLinearChartDataService],
    templateUrl: './chartjs-linear-chart.component.html',
    styleUrl: './chartjs-linear-chart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartjsLinearChartComponent implements OnDestroy {
    @ViewChild('chart', { static: true }) private chartElement: ElementRef = null!;

    private linearChartDataService = inject(ChartjsLinearChartDataService);
    private chart?: Chart;
    private destroyRef = inject(DestroyRef);

    public timeTakenToGenerate = signal(0);
    public inProgress = signal(false);
    public totalDataPoints = signal(0);

    constructor() {
        Chart.register(CategoryScale, LineController, LinearScale, PointElement, LineElement, Decimation, Filler, Legend, Title, Tooltip);
    }

    public ngOnDestroy(): void {
        this.chart?.destroy();
    }

    public displayChart(chartConfig: IChartConfig): void {
        this.inProgress.set(true);
        const start = performance.now();

        this.chart?.destroy();

        timer(50)
            .pipe(
                tap(() => {
                    const config = {
                        ...chartjsLinearchartConfiguration,
                        options: {
                            ...chartjsLinearchartConfiguration.options,
                            animation: {
                                duration: 1,
                                onComplete: (chart) => {
                                    if (!chart.initial || !this.inProgress()) {
                                        return;
                                    }

                                    this.inProgress.set(false);
                                    this.totalDataPoints.set(chartConfig!.seriesCount * chartConfig!.dataPointsCount!);
                                    this.timeTakenToGenerate.set(performance.now() - start);
                                },
                            },
                        },
                        data: this.linearChartDataService.getChartData(chartConfig),
                    } as ChartConfiguration;

                    const canvas = this.chartElement.nativeElement as HTMLCanvasElement;
                    const context = canvas.getContext('2d');
                    this.chart = new Chart(context!, config);
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
    }
}
