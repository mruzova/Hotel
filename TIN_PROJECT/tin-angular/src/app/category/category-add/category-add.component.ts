import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/token.service';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  categoryForm: FormGroup;
  numberOfBeds: number;
  roomType: string;
  sizeType: string;
  imagePlanUrl: string;
 
  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  

}
  onSubmit() {
    this.numberOfBeds= this.categoryForm.value.numberOfBeds;
    this.roomType = this.categoryForm.value.roomType;
    this.sizeType = this.categoryForm.value.sizeType
    this.imagePlanUrl = this.categoryForm.value.imagePlanUrl;
  
    this.categoryService
      .storeCategory(
        this.numberOfBeds,
        this.roomType,
        this.sizeType,
        this.imagePlanUrl
      )
      .subscribe((res) => {
        console.log(res);
        alert('new room added at the end of the list:)')
        
      });
  }
  private initForm() {
    this.categoryForm = new FormGroup({
      numberOfBeds: new FormControl(null, [
        Validators.required,
        this.positive
      ]),
      roomType: new FormControl(null, [
        Validators.required,
        Validators.maxLength(300),
      ]),
      sizeType: new FormControl(null, [
        Validators.required,
        Validators.maxLength(40),
      ]),
      imagePlanUrl: new FormControl(null, [
        Validators.required,
        Validators.pattern('(https?:\/\/.*\.(?:png|jpg|jpeg|gif))'),
        Validators.maxLength(15000),
      ])
    });
  }
private positive(control:FormControl):{ [key: string]: any; } {
  if (Number(control.value) <= 0) {
    return {nonZero: true};
  } else {
    return null;
  }
}
}
