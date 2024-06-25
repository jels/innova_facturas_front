import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {}
