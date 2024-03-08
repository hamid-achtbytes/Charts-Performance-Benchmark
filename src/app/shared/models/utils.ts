export const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
};

export const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
};

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const COLOR_SCHEME: string[] = [
    'rgba(225,10,24,0.7)',
    'rgba(2, 203, 194, 0.75)',
    'rgba(97, 58, 131, 0.5)',
    'rgba(000, 143, 057, 0.60)',
    'rgba(16, 0, 105, 0.50)',
    'rgba(144, 144, 144, 0.70)',
    'rgba(218, 106, 146, 0.75)',
    'rgba(87, 106, 82, 0.7)',
    'rgba(237, 118, 014, 0.65)',
    'rgba(0, 89, 49, 0.6)',
    'rgba(194, 153, 255, 0.6)',
    'rgba(99, 100, 96, 0.7)',
    'rgba(39, 52, 108, 0.7)',
    'rgba(188, 171, 203, 0.7)',
    'rgba(151, 0, 32, 0.5)',
    'rgba(194, 176, 120, 0.75)',
    'rgba(20, 95, 109, 0.5)',
    'rgba(110, 028, 052, 0.60)',
    'rgba(0, 45, 55, 0.5)',
    'rgba(1, 106, 159, 0.5)',
];
