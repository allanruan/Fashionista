import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import {ProductService} from '../product/ProductService'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:Product[];
  notify: string;

  constructor(private router: Router, private route: ActivatedRoute,private productService:ProductService) { }

  ngOnInit(): void {
    this.getProduct();
    this.route.queryParams.subscribe((params) => {
      const key1 = 'loggedin';
      if (params[key1] === 'success') {
        this.notify = 'You have been successfully loggedin. Welcome home';
      }
    });
  }

  getProduct():void{
    
    this.productService.getProducts().subscribe(result => {
      this.products = result;
    })
  }

}
