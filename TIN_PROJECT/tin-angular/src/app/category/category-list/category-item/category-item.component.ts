import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TokenService } from 'src/app/token.service';
import { Category } from '../../category.model';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css'],
})
export class CategoryItemComponent implements OnInit {
  @Input() index: number;
  @Input() category: Category;
  numberOfBeds: number;
  roomType: string;
  sizeType: string;
  imageUrl: string;
  @Output() oldCategory = new EventEmitter<Category>();
  constructor(
    public tokenService: TokenService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.numberOfBeds = this.category.numberOfBeds;
    this.roomType = this.category.roomType;
    this.sizeType = this.category.sizeType;
    this.imageUrl = this.category.imagePlanUrl;
  }
  onDelete() {
    this.categoryService.deleteCategory(this.category.idCategory).subscribe((res) => {
      this.oldCategory.emit(res);
    });
  }
}
