import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-zip-code-dialog',
  templateUrl: './zip-code-dialog.component.html',
  styleUrl: './zip-code-dialog.component.sass'
})
export class ZipCodeDialogComponent {
  readonly zipcodeForm = new FormGroup({
    zipcode: new FormControl("", {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/\d{5}$/)
      ]
    })
  });

  constructor(public dialogRef: MatDialogRef<ZipCodeDialogComponent, string>) {
  }

  onSubmit(): void {
    const enteredZipcode: string | undefined = this.zipcodeForm.valid ?
      this.zipcodeForm.controls.zipcode.value : undefined;

    this.dialogRef.close(enteredZipcode);
  }

  onCancel(): void {
    this.dialogRef.close(undefined);
  }
}
