import { Routes } from '@angular/router';
import { ChartjsLinearChartComponent } from './chartjs-linear-chart/chartjs-linear-chart.component';
import { EChartsLinearChartComponent } from './echarts-linear-chart/echarts-linear-chart.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'cahrtjs-linear-chart', component: ChartjsLinearChartComponent },
    { path: 'echarts-linear-chart', component: EChartsLinearChartComponent },
];
