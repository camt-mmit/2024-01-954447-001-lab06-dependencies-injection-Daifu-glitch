import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicInputComponent } from '../dynamic-input/dynamic-input.component';

@Component({
  selector: 'app-dynamic-section',
  standalone: true,
  imports: [CommonModule, DynamicInputComponent],
  templateUrl: './dynamic-section.component.html',
  styleUrl: './dynamic-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicSectionComponent {
  @Input() sections: number[][] = [];
  @Output() sectionsChange = new EventEmitter<number[][]>();

  addSection(): void {
    this.sections.push([0]);
    this.emitChange();
  }

  removeSection(index: number): void {
    if (this.sections.length > 1) {
      this.sections.splice(index, 1);
      this.emitChange();
    }
  }

  updateInputs(sectionIndex: number, updatedInputs: number[]): void {
    const currentSection = this.sections[sectionIndex];

    // Empty the array first to avoid modifying the reference
    currentSection.splice(0, currentSection.length);

    // Add the updated values
    updatedInputs.forEach(value => currentSection.push(value));

    // Emit the updated sections with a new reference
    this.emitChange();
  }


  emitChange(): void {
    this.sectionsChange.emit([...this.sections]); // Ensure a new reference is emitted
  }

}
