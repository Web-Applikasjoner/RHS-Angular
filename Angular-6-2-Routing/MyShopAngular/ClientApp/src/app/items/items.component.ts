import { Component, OnInit } from '@angular/core';
import { IItem } from './item';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items-component',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent implements OnInit {
  viewTitle: string = 'Table';
  displayImage: boolean = true;
  items: IItem[] = [];

  constructor(private _http: HttpClient, private _router: Router) { }

  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter:', value);
    this.filteredItems = this.performFilter(value);
  }

  getItems(): void {
    this._http.get<IItem[]>("api/item/")
      .subscribe(data => {
        console.log('All', JSON.stringify(data));
        this.items = data;
        this.filteredItems = this.items;
        }
      );
  }

  filteredItems: IItem[] = this.items;

  performFilter(filterBy: string): IItem[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.items.filter((item: IItem) =>
      item.Name.toLocaleLowerCase().includes(filterBy));
  }

  toggleImage(): void {
    this.displayImage = !this.displayImage;
  }

  navigateToItemform() {
    this._router.navigate(['/itemform']);
  }

  ngOnInit(): void {
    console.log('ItemsComponent created');
  }
}
