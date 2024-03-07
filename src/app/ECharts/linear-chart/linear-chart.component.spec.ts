import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EChartsLinearChartComponent } from './linear-chart.component';

describe('LinearChartComponent', () => {
    let component: EChartsLinearChartComponent;
    let fixture: ComponentFixture<EChartsLinearChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EChartsLinearChartComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(EChartsLinearChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
