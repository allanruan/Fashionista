import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../models/product';
import {ProductService} from './ProductService'
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  notify:string;
  counter=1;
  searchId:number;
  formData:any = {};
  productForm:FormGroup;
  products:Product[];
  errors:any = [];
  constructor(private productService:ProductService, private fb:FormBuilder, private router:Router,private route:ActivatedRoute) { }
  flag:number=0;
  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe((params) => {
      const key1 = 'saved';
      const key2 = 'deleted';
      const key3 = 'updated';
      if (params[key1] === 'success') {
        this.notify = 'Product saved';
      }
      if (params[key2] === 'success') {
        this.notify = 'Product deleted';
      }
      if (params[key3] === 'success') {
        this.notify = 'Product updated';
      }
    });
  }

  initForm(): void {
    this.productForm = this.fb.group({
      _id: ['', [Validators.required]],
	  name: ['', [Validators.required]],
	  price: ['', [Validators.required]]
    });
  }
  isValidInput(fieldName): boolean {
    return this.productForm.controls[fieldName].invalid &&
      (this.productForm.controls[fieldName].dirty || this.productForm.controls[fieldName].touched);
  }

  getProduct():void{
    
    this.productService.getProducts().subscribe(result => {
      this.products = result;
      console.log(this.products);
      this.flag=1;
    })
  }

  getForm():void{
    this.flag=2;
  }
  updateForm(id,name, price, image, description){
    this.formData._id=id;
	this.formData.name=name;
	this.formData.price=price;
    this.formData.image=image;
    this.formData.description=description;
    this.flag=3;
  }

  addProduct():void{
    console.log(this.formData)
    this.productService.addProduct(this.formData)
      .subscribe(() => {
        this.router.navigate(['/product'], { queryParams: { saved: 'success' } });
      },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
		});
	this.formData = {};
    }
  getProductById():void{
    // console.log(this.searchId)
    this.productService.getProductById(this.searchId).subscribe(result => {
      this.products = [result];
      console.log(this.products);
      this.flag=1;
    });
  }
  updateProductById(id):void{
    this.productService.updateProductById(this.formData,this.formData._id).subscribe(() => {
      this.router.navigate(['/product'], { queryParams: { updated: 'success' } });
    },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
	  });
	this.formData={};
  }

  deleteProductById(id):void{
    // console.log(id);
    this.flag=0;
    this.productService.deleteProductById(id).subscribe(() => {
      this.router.navigate(['/product'], { queryParams: { deleted: 'success' } });
    },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      });
  }

}
