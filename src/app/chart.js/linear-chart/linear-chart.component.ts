import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoryScale, Chart, ChartConfiguration, Decimation, Filler, Legend, LineController, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import { tap, timer } from 'rxjs';
import { IChartDataConfig } from '../../shared/models/chart-data-config';
import { chartConfiguration } from './models/chart-configuration';
import { LinearChartDataService } from './services/linear-chart-data.service';
import { ChartConfiguratorComponent } from '../../shared/components/chart-configurator/chart-configurator.component';

@Component({
    selector: 'app-linear-chart',
    standalone: true,
    imports: [CommonModule, ChartConfiguratorComponent],
    providers: [LinearChartDataService],
    templateUrl: './linear-chart.component.html',
    styleUrl: './linear-chart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartjsLinearChartComponent {
    @ViewChild('chart', { static: true }) private chartElement: ElementRef = null!;

    private linearChartDataService = inject(LinearChartDataService);
    private chart?: Chart;
    private destroyRef = inject(DestroyRef);

    public timeTakenToGenerate = signal(0);
    public inProgress = signal(false);
    public totalDataPoints = signal(0);

    constructor() {
        Chart.register(CategoryScale, LineController, LinearScale, PointElement, LineElement, Decimation, Filler, Legend, Title, Tooltip);
    }

    public displayChart(chartDataConfig: IChartDataConfig): void {
        const { seriesCount, dataPointsCount } = chartDataConfig;

        this.inProgress.set(true);
        const start = performance.now();

        this.chart?.destroy();

        timer(50)
            .pipe(
                tap(() => {
                    const config = { ...chartConfiguration, data: this.linearChartDataService.getChartData(seriesCount, dataPointsCount) } as ChartConfiguration;
                    const canvas = this.chartElement.nativeElement as HTMLCanvasElement;
                    const context = canvas.getContext('2d');
                    this.chart = new Chart(context!, config);

                    this.inProgress.set(false);
                    this.totalDataPoints.set(seriesCount! * dataPointsCount!);
                    this.timeTakenToGenerate.set(performance.now() - start);
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
    }
}
