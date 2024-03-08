import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartjsLinearChartComponent } from './chartjs-linear-chart.component';

describe('ChartjsLinearChartComponent', () => {
    let component: ChartjsLinearChartComponent;
    let fixture: ComponentFixture<ChartjsLinearChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChartjsLinearChartComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChartjsLinearChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
