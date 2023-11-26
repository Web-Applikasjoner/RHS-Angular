import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: "app-items-itemform",
  templateUrl: "./itemform.component.html"
})
export class ItemformComponent {

  itemForm: FormGroup;

  constructor(private _formbuilder: FormBuilder, private _router: Router) {
    this.itemForm = _formbuilder.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: [''],
      imageUrl: ['']
    });
  }

  onSubmit() {
    console.log("ItemCreate form submitted:");
    console.log(this.itemForm);
    console.log('The item ' + this.itemForm.value.name + ' is created.');
    console.log(this.itemForm.touched);
  }

  backToItems() {
    this._router.navigate(['/items']);
  }
}

