// item-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { itemService } from './items.service'; // Corrected import statement

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-details.component.html'
})
export class ItemDetailComponent implements OnInit {
  item: any;

  constructor(private route: ActivatedRoute, private itemService: itemService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const itemId = params['id'];
      this.itemService.getItemById(itemId).subscribe((item) => {
        this.item = item;
      });
    });
  }
}
