import { Component, OnInit } from '@angular/core';
import { IItem } from './item';
import { filter } from 'rxjs';
//import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { itemService } from './items.service';

@Component({
  selector: 'app-items-component',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent implements OnInit {
  viewTitle: string = 'Table';
  displayImage: boolean = true;
  items: IItem[] = [];
  //constructor(private _http: HttpClient, private _router:Router) { }
  constructor(private _router: Router,
    private _itemService: itemService) { }
  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter:', value);
    this.filteredItems = this.performFilter(value);
  }
  /*getItems(): void {
    this._http.get<IItem[]>("api/item/").subscribe(data => {
      console.log('All', JSON.stringify(data));
      this.items = data;
      this.filteredItems = this.items;
    });*/
  deleteItem(item: IItem): void {
    const confirmDelete = confirm(`Are you sure you want to delete the "${item.Category}"?`);
    if (confirmDelete) {
      this._itemService.deleteItem(item.ItemId).subscribe(
        (response) => {
          if (response.success) {
            console.log(response.message);
            this.filteredItems = this.filteredItems.filter(i => i !== item);
          }
        },
        (error) => {
          console.error('Error deletig item:', error);
        }
      )
    }
  }

  getItems(): void {
    this._itemService.getItems()
      .subscribe(data => {
      console.log('All', JSON.stringify(data));
      this.items = data;
      this.filteredItems = this.items;
    });
  }

 /* items: IItem[] = */
  filteredItems: IItem[] = this.items;

  performFilter(filterBy: string): IItem[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.items.filter((item: IItem) =>
      item.Category.toLowerCase().includes(filterBy) ||
      item.Location.toLowerCase().includes(filterBy)
    );
  }

  toggleImage(): void {
    this.displayImage = !this.displayImage;
  }
  navigateToItemform() {
    this._router.navigate(['/itemform']);
  }
  ngOnInit(): void{
    this.getItems();
  }
}
