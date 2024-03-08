import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearChartConfiguratorComponent } from './linear-chart-configurator.component';

describe('LinearChartConfiguratorComponent', () => {
    let component: LinearChartConfiguratorComponent;
    let fixture: ComponentFixture<LinearChartConfiguratorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LinearChartConfiguratorComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LinearChartConfiguratorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
