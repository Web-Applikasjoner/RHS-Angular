import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from './items.service';

@Component({
  selector: "app-items-itemform",
  templateUrl: "./itemform.component.html"
})
export class ItemformComponent {
  itemForm: FormGroup;

  constructor(
    private _formbuilder: FormBuilder,
    private _router: Router,
    private _itemService: ItemService
  ) {
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
    const newItem = this.itemForm.value;
    this._itemService.createItem(newItem)
      .subscribe(response => {
        if (response.success) {
          console.log(response.message);
          this._router.navigate(['/items']);
        }
        else {
          console.log('Item creation failed');
        }
      });
  }

  backToItems() {
    this._router.navigate(['/items']);
  }
}

