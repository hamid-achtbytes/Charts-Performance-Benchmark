/// <reference lib="webworker" />

import { BarController, BarElement, CategoryScale, Chart, ChartConfiguration, Decimation, Filler, Legend, LineController, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';

addEventListener('message', (event) => {
    Chart.register(BarElement, BarController, CategoryScale, LineController, LinearScale, PointElement, LineElement, Decimation, Filler, Legend, Title, Tooltip);

    const { canvas, config } = event.data as { canvas: OffscreenCanvas; config: ChartConfiguration };
    const context = canvas.getContext('2d') as unknown as CanvasRenderingContext2D;
    const chart = new Chart(context, config);

    // Resizing the chart must be done manually, since OffscreenCanvas does not include event listeners.
    canvas.width = 1000;
    canvas.height = 1000;
    chart.resize();
});
