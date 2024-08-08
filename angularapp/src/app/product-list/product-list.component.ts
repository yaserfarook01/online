import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  successMessage: string | null = null;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts() {
    try {
      this.products = await this.productService.getProducts().toPromise();
    } catch (error) {
      //console.error('Failed to load products', error);
      // Handle the error appropriately, e.g., show an error message to the user
    }
  }

  async deleteProduct(id: number) {
    try {
      await this.productService.deleteProduct(id).toPromise();
      await this.loadProducts(); // Reload the product list
      this.successMessage = 'Item Deleted Successfully';
      setTimeout(() => {
        this.successMessage = null;
      }, 2000);
    } catch (error) {
      //console.error('Failed to delete product', error);
      // Handle the error appropriately, e.g., show an error message to the user
    }
  }

  editProduct(id: number) {
    this.router.navigate([`/product-form/${id}`]);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}