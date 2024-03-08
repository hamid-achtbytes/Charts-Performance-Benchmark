import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IChartConfig } from '../../models/chart-config';

@Component({
    selector: 'app-linear-chart-configurator',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './linear-chart-configurator.component.html',
    styleUrl: './linear-chart-configurator.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinearChartConfiguratorComponent {
    public formGroup = new FormGroup({
        seriesCount: new FormControl<number>(10, [Validators.required, Validators.min(1), Validators.max(100)]),
        dataPointsCount: new FormControl<number>(100, [Validators.required, Validators.min(1), Validators.max(1000000)]),
    });

    @Input({ required: true }) public inProgress!: boolean;
    @Input({ required: true }) public timeTakenToGenerate!: number;
    @Input({ required: true }) public totalDataPoints!: number;

    @Output() public chartDataChange = new EventEmitter<IChartConfig>();

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
