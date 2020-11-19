import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from "../models/product";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // URL to web api
  private productUrl = 'http://localhost:5000/api/products';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  getProductById(id: any): Observable<Product> {
    return this.http.get<Product>(`${this.productUrl}/${id}`);
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post<any>(this.productUrl, product, httpOptions);
  }

  updateProductById(product: Product, id: any): Observable<Product> {
    return this.http.put<Product>(`${this.productUrl}/${id}`, product, httpOptions);
  }

  deleteProductById(id: any): Observable<Product> {
    return this.http.delete<Product>(`${this.productUrl}/${id}`);
  }

}
