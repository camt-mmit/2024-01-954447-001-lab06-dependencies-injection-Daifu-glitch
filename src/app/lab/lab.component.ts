import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicSectionComponent } from './components/dynamic-section/dynamic-section.component';

@Component({
  selector: 'app-lab',
  standalone: true,
  imports: [CommonModule, DynamicSectionComponent],
  templateUrl: './lab.component.html',
  styleUrl: './lab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabComponent implements OnInit {
  sections: number[][] = [];

  ngOnInit(): void {
    this.loadData();
  }

  saveData(): void {
    localStorage.setItem('sectionsData', JSON.stringify(this.sections));
  }

  loadData(): void {
    const savedData = localStorage.getItem('sectionsData');
    this.sections = savedData ? JSON.parse(savedData) : [[0]];
  }

  updateSections(updatedSections: number[][]): void {
    this.sections = updatedSections;
    this.saveData();
  }
}
