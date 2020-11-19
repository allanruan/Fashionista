import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Item } from '../models/Item';
import { Product } from '../models/product';
import { ProductService } from '../product/ProductService';

@Component({
	templateUrl: 'cart.component.html'
})

export class CartComponent implements OnInit {

	items: Item[] = [];
	total: number = 0;
	product:Product;
	constructor(
		private activatedRoute: ActivatedRoute,
		private productService: ProductService
	) { }

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			var id = params['_id'];
			this.productService.getProductById(id).subscribe(result => {
				this.product = result;console.log(this.product);
				if (id) {
					var item: Item = {
						product: this.product,
						quantity: 1
					};
	
					if (localStorage.getItem('cart') == null) {
						let cart: any = [];
						cart.push(JSON.stringify(item));
						localStorage.setItem('cart', JSON.stringify(cart));
					} else {
						let cart: any = JSON.parse(localStorage.getItem('cart'));
						let index: number = -1;
						for (var i = 0; i < cart.length; i++) {
							let item: Item = JSON.parse(cart[i]);
							if (item.product._id == id) {
								index = i;
								break;
							}
						}
						if (index == -1) {
							cart.push(JSON.stringify(item));
							localStorage.setItem('cart', JSON.stringify(cart));
						} else {
							let item: Item = JSON.parse(cart[index]);
							item.quantity += 1;
							cart[index] = JSON.stringify(item);
							localStorage.setItem("cart", JSON.stringify(cart));
						}
					}
					this.loadCart();
				} else {
					this.loadCart();
				}
			});
		});
	}

	loadCart(): void {
		this.total = 0;
		this.items = [];
		let cart = JSON.parse(localStorage.getItem('cart'));
		for (var i = 0; i < cart.length; i++) {
			let item = JSON.parse(cart[i]);
			this.items.push({
				product: item.product,
				quantity: item.quantity
			});
			this.total += item.product.price * item.quantity;
		}
	}

	remove(id: number): void {
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		let index: number = -1;
		for (var i = 0; i < cart.length; i++) {
			let item: Item = JSON.parse(cart[i]);
			if (item.product._id == id) {
				cart.splice(i, 1);
				break;
			}
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		this.loadCart();
	}
	cartInfo:any;
	checkOut() {
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		this.cartInfo= cart;
		console.log(cart);
	}

}