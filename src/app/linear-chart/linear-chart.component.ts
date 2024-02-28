import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, ChartConfiguration, Decimation, Filler, Legend, LineController, LineElement, LinearScale, PointElement, Scale, Title, Tooltip } from 'chart.js';
import { LinearChartDataService } from './services/linear-chart-data.service';

@Component({
    selector: 'app-linear-chart',
    standalone: true,
    imports: [],
    providers: [LinearChartDataService],
    templateUrl: './linear-chart.component.html',
    styleUrl: './linear-chart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinearChartComponent implements AfterViewInit {
    @ViewChild('chart', { static: true }) private chartElement: ElementRef = null!;

    private linearChartDataService = inject(LinearChartDataService);

    private config: ChartConfiguration = {
        type: 'line',
        data: this.linearChartDataService.getChartData(10, 100),
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
        console.time('Chart render time');

        const context = this.chartElement.nativeElement.getContext('2d');
        const _ = new Chart(context, this.config);

        console.timeEnd('Chart render time');

        // Activate web worker, but chart will not be responsive anymore
        // if (typeof Worker !== 'undefined') {
        //     const canvas = this.chartElement.nativeElement as HTMLCanvasElement;
        //     const offscreenCanvas = canvas.transferControlToOffscreen();
        //     const worker = new Worker(new URL('./linear-chart.worker.ts', import.meta.url));
        //     worker.postMessage({ canvas: offscreenCanvas, config: this.config }, [offscreenCanvas]);
        // }
    }
}