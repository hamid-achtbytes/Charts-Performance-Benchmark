import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IChartDataConfig } from '../../models/chart-data-config';

@Component({
    selector: 'app-chart-configurator',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './chart-configurator.component.html',
    styleUrl: './chart-configurator.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartConfiguratorComponent {
    public formGroup = new FormGroup({
        seriesCount: new FormControl<number>(10, [Validators.required, Validators.min(1), Validators.max(100)]),
        dataPointsCount: new FormControl<number>(100, [Validators.required, Validators.min(1), Validators.max(1000000)]),
    });

    @Input({ required: true }) public inProgress!: boolean;
    @Input({ required: true }) public timeTakenToGenerate!: number;
    @Input({ required: true }) public totalDataPoints!: number;

    @Output() public chartDataChange = new EventEmitter<IChartDataConfig>();

    public onChartDataChange(): void {
        if (this.formGroup.invalid) {
            return;
        }

        const { seriesCount, dataPointsCount } = this.formGroup.value;

        this.chartDataChange.emit({
            seriesCount: seriesCount ?? 1,
            dataPointsCount: dataPointsCount ?? 1,
        });
    }
}
