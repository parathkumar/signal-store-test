import { ChangeDetectionStrategy, Component, ElementRef, input, viewChild } from '@angular/core';

@Component({
  selector: 'st-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent {
  dialogElement = viewChild.required<ElementRef<HTMLDialogElement>>('detailsModal');
  heading = input.required<string>();
  openDialog() {
    this.dialogElement().nativeElement.showModal();
  }
  closeDialog(){
    this.dialogElement().nativeElement.close();
  }
}
