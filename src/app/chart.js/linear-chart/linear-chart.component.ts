import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, ChartConfiguration, Decimation, Filler, Legend, LineController, LineElement, LinearScale, PointElement, Scale, Title, Tooltip } from 'chart.js';
import { LinearChartDataService } from './services/linear-chart-data.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-linear-chart',
    standalone: true,
    imports: [ReactiveFormsModule],
    providers: [LinearChartDataService],
    templateUrl: './linear-chart.component.html',
    styleUrl: './linear-chart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartjsLinearChartComponent implements AfterViewInit {
    @ViewChild('chart', { static: true }) private chartElement: ElementRef = null!;

    private linearChartDataService = inject(LinearChartDataService);
    private chart?: Chart;

    public formGroup = new FormGroup({
        seriesCount: new FormControl<number>(10, [Validators.required, Validators.min(1), Validators.max(100)]),
        dataPointsCount: new FormControl<number>(100, [Validators.required, Validators.min(1), Validators.max(100000)]),
    });

    private config: Partial<ChartConfiguration> = {
        type: 'line',
        options: {
            elements: { point: { radius: 0 } },
            responsive: true,
            animation: false,
            line: { datasets: { showLine: false } },
            plugins: {
                title: {
                    display: true,
                    text: 'Chart.js Line Chart',
                },
                decimation: { enabled: true, algorithm: 'min-max', threshold: 1 },
            },
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                    },
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Value',
                    },
                    suggestedMin: 0,
                    suggestedMax: 200,
                },
            },
        },
    };

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
        console.time('Chart render time');

        this.chart?.destroy();

        const { seriesCount, dataPointsCount } = this.formGroup.value;

        const config = { ...this.config, data: this.linearChartDataService.getChartData(seriesCount!, dataPointsCount!) } as ChartConfiguration;
        const canvas = this.chartElement.nativeElement as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        this.chart = new Chart(context!, config);

        console.timeEnd('Chart render time');
    }
}
