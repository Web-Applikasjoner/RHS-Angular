import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { HttpClient } from '@angular/common/http';
import { itemService } from './items.service';
@Component({
  selector: "app-items-itemform",
  templateUrl: "./itemform.component.html"
})
export class ItemformComponent {
  itemForm: FormGroup;
  isEditMode: boolean = false;
  itemId: number = -1;
  //constructor(private _formbuilder: FormBuilder, private _router: Router, private _http: HttpClient)
  constructor(
    private _formbuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _itemService: itemService)
  {
    this.itemForm = _formbuilder.group({
      category: ['', Validators.required],
      location: ['', Validators.required],
      rooms: [1, Validators.required],
      area: ['', Validators.required],
      renting: ['', Validators.required],
      description: [''],
      imageUrl: ['']
    });
  }
  onSubmit() {
    console.log("ItemCreate form submitted");
    console.log(this.itemForm);
    const newItem = this.itemForm.value;

    /*const createUrl = "api/item/create";
    this._http.post<any>(createUrl, newItem).subscribe(response => {
      if (response.success) {
        console.log(response.message);
        alert('Item created successfully');
        this._router.navigate(['/items']);
      } else {
        console.log('Item creation failed')
      }
    });*/
    if (this.isEditMode) {
      this._itemService.updateItem(this.itemId, newItem)
        .subscribe(response => {
          if (response.success) {
            console.log(response.message);
            alert('Item updated successfully');
            this._router.navigate(['/items']);
          } else {
            console.log('Item update failed')
          }
        });

    }
    else {
      this._itemService.createItem(newItem)
        .subscribe(response => {
          if (response.success) {
            console.log(response.message);
            alert('Item created successfully');
            this._router.navigate(['/items']);
          } else {
            console.log('Item creation failed')
          }
        });
    }
  
  }
  backToItems() {
    this._router.navigate(['/items']);
  }
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      if (params['mode'] === 'create') {
        this.isEditMode = false;
      }
      else if (params['mode'] === 'edit') {
        this.isEditMode = true;
        this.itemId = +params['id'];
        this.loadItemForEdit(this.itemId);

      }
    });
  }
  loadItemForEdit(itemId: number) {
    this._itemService.getItemById(itemId).subscribe(
        (item: any) => {
          console.log('retrived item: ', item);
        this.itemForm.patchValue({
          category: item.Category,
          location: item.Location,
          rooms: item.Rooms,
          area: item.Area,
          renting: item.Renting,
          description: item.Description,
          imageUrl: item.ImageUrl
        });
        },
        (error: any) => {
          console.error('Error loading item for edit:', error);
        }
      );
  }
}
