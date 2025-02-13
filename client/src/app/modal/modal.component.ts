import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
    <dialog #customModal (click)="closeModalOnClickOutside($event)">
      <header>
        <h1>{{ title() }}</h1>
        <button (click)="closeModal()">X</button>
      </header>
      <ng-content />
    </dialog>
  `,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  title = "hola"
  @ViewChild('customModal', { static: true })
  dialog!: ElementRef<HTMLDialogElement>

  open() {
    this.dialog.nativeElement.showModal()
  }

  close() {
    this.dialog.nativeElement.close()
  }

  closeModalOnClickOutside(e: MouseEvent) {
    const dialog = this.dialog.nativeElement
    const dialogDimensions = dialog.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close()
    }
  }
}