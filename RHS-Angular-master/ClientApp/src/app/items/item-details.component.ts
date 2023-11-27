// item-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { itemService } from './items.service'; 
import { IItem } from './item';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-details.component.html'
})
export class ItemDetailComponent implements OnInit {
  item: any;

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private itemService: itemService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const itemId = params['id'];
      this.itemService.getItemById(itemId).subscribe((item) => {
        this.item = item;
      });
    });
  }
  canUpdateItem(item: IItem): boolean {
    if (this.authService.isAuthenticated() && this.authService.isAdmin()) {
      return true;
    } else {      
      return false;
    }
  }
  onUpdateClick(item: IItem): void {
    if (this.canUpdateItem(item)) {
      this._router.navigate(['/itemform', 'edit', item.ItemId]);
    } else {
      alert('You do not have permission to update this item.');
    }
  }
}
