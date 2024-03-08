import { ChartConfiguration } from 'chart.js';

export const chartjsLinearchartConfiguration: Partial<ChartConfiguration> = {
    type: 'line',
    options: {
        elements: { point: { radius: 0 } },
        responsive: true,
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
