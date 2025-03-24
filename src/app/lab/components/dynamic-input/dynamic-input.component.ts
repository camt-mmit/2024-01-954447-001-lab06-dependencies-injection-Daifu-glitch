import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-input',
  imports: [CommonModule],
  templateUrl: './dynamic-input.component.html',
  styleUrl: './dynamic-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicInputComponent {
  @Input() inputs: number[] = [];
  @Output() inputsChange = new EventEmitter<number[]>();

  constructor(private cdr: ChangeDetectorRef) {}


  updateValue(index: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const newInputs = [...this.inputs]; // Copy array เพื่อป้องกัน reference ปัญหา
    newInputs[index] = inputElement.valueAsNumber || 0;
    this.inputs = newInputs;
    this.emitChange();
    this.cdr.markForCheck();
}


  addInput(): void {
    this.inputs.push(0);
    this.emitChange();
  }

  removeInput(index: number): void {
    if (this.inputs.length > 1) {
      this.inputs.splice(index, 1);
      this.emitChange();
    }
  }

  emitChange(): void {
    this.inputsChange.emit([...this.inputs]);
  }

  getTotal(): number {
    return this.inputs.reduce((sum, num) => sum + num, 0);
  }

}
