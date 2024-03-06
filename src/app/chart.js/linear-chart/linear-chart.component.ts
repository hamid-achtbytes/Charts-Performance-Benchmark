import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, ChartConfiguration, Decimation, Filler, Legend, LineController, LineElement, LinearScale, PointElement, Scale, Title, Tooltip } from 'chart.js';
import { LinearChartDataService } from './services/linear-chart-data.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { delay, tap, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { chartConfiguration } from './models/chart-configuration';

@Component({
    selector: 'app-linear-chart',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    providers: [LinearChartDataService],
    templateUrl: './linear-chart.component.html',
    styleUrl: './linear-chart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartjsLinearChartComponent implements AfterViewInit {
    public formGroup = new FormGroup({
        seriesCount: new FormControl<number>(10, [Validators.required, Validators.min(1), Validators.max(100)]),
        dataPointsCount: new FormControl<number>(100, [Validators.required, Validators.min(1), Validators.max(1000000)]),
    });

    public timeTakenToGenerate = signal(0);
    public inProgress = signal(false);
    public totalDataPoints = signal(0);

    @ViewChild('chart', { static: true }) private chartElement: ElementRef = null!;

    private linearChartDataService = inject(LinearChartDataService);
    private chart?: Chart;
    private destroyRef = inject(DestroyRef);

    constructor() {
        Chart.register(BarElement, BarController, CategoryScale, LineController, LinearScale, PointElement, LineElement, Decimation, Filler, Legend, Title, Tooltip);
    }

    public ngAfterViewInit(): void {
        // Activate web worker, but chart will not be responsive anymore
        // if (typeof Worker !== 'undefined') {
        //     const canvas = this.chartElement.nativeElement as HTMLCanvasElement;
        //     const offscreenCanvas = canvas.transferControlToOffscreen();
        //     const worker = new Worker(new URL('./linear-chart.worker.ts', import.meta.url));
        //     worker.postMessage({ canvas: offscreenCanvas, config: this.config }, [offscreenCanvas]);
        // }
    }

    public displayChart(): void {
        this.inProgress.set(true);
        const start = performance.now();

        this.chart?.destroy();

        timer(10)
            .pipe(
                tap(() => {
                    const { seriesCount, dataPointsCount } = this.formGroup.value;

                    const config = { ...chartConfiguration, data: this.linearChartDataService.getChartData(seriesCount!, dataPointsCount!) } as ChartConfiguration;
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
