import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './category.model';
import { Router } from '@angular/router';
const url = 'http://localhost:8888/api/categories';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  getCategories(page: number): Observable<any> {
    this.router.navigate(['home'], { queryParams: { page: page } });
    return this.httpClient.get<Category[]>(url + '?page=' + page);
  }
  storeCategory(numberOfBeds,
    roomType,
    sizeType,
    imagePlanUrl) {
    return this.httpClient.post<Category>(url, {
      numberOfBeds: numberOfBeds,
      roomType: roomType,
      sizeType: sizeType,
      imagePlanUrl: imagePlanUrl,
    });
  }
  updateCategory(
    idCategory: number,
    numberOfBeds,
    roomType,
    sizeType,
    imagePlanUrl
  ) {
    return this.httpClient.put<Category>(url + '/' + idCategory, {
      numberOfBeds: numberOfBeds,
      roomType: roomType,
      sizeType: sizeType,
      imagePlanUrl: imagePlanUrl,
    });
  }
  deleteCategory(idCategory: number) {
    return this.httpClient.delete<Category>(url + '/' + idCategory);
  }
}
