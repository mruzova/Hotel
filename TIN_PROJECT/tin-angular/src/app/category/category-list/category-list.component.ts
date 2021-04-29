import { Component, Input, OnInit } from '@angular/core';
import { TokenService } from 'src/app/token.service';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories: Category[];
  index: number;
  currentPage: number=1;
  
  pages: number[] = [];

  constructor(private categoryService: CategoryService, public tokenService:TokenService) {}

  ngOnInit(): void {
    this.onGetCategories(this.currentPage);
    if(parseInt(this.tokenService.getIsAdmin())===1){
      this.tokenService.is_admin = true;
       }
   
  }
  onGetCategories(page?:number) {
    this.currentPage = page;
    this.categoryService.getCategories(page).subscribe(
      (categories) => {
        this.categories = categories.categories;
        this.pages.length = Math.ceil(categories.count.total_rows/5); //5 because 5 elements of the list must be on one page 
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteCategory(category: Category) {
    this.categories.splice(this.categories.indexOf(category), 1);
  }
}
