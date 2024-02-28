import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LinearChartComponent } from './linear-chart/linear-chart.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'linear-chart', component: LinearChartComponent },
];
