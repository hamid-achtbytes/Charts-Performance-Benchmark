import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChartjsLinearChartComponent } from './chart.js/linear-chart/linear-chart.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'cahrtjs-linear-chart', component: ChartjsLinearChartComponent },
];
