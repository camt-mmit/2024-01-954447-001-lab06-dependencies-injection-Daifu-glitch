import { Routes } from '@angular/router';
import { LabComponent } from './lab/lab.component';

export const routes: Routes = [
  { path: '', redirectTo: 'example', pathMatch: 'full' },

  { path: 'example', loadChildren: () => import('./example/routes') },
  { path: 'lab', component:LabComponent }
];
