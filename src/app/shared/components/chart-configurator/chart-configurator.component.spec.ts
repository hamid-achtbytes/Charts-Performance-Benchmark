import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartConfiguratorComponent } from './chart-configurator.component';

describe('ChartDataConfiguratorComponent', () => {
    let component: ChartConfiguratorComponent;
    let fixture: ComponentFixture<ChartConfiguratorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChartConfiguratorComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChartConfiguratorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
