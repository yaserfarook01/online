import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: any = { name: '', description: '', quantity: 0, price: 0 };
  editMode: boolean = false;
  productId: number | null = null;
  successMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.productId = this.route.snapshot.params['id'];
    if (this.productId) {
      this.editMode = true;
      try {
        this.product = await this.productService.getProduct(this.productId).toPromise();
      } catch (error) {
        //console.error('Error loading product:', error);
      }
    }
  }

  async saveProduct(form: NgForm): Promise<void> {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    try {
      if (this.editMode) {
        await this.productService.updateProduct(this.productId!, this.product).toPromise();
        this.successMessage = 'Item Updated Successfully';
      } else {
        await this.productService.createProduct(this.product).toPromise();
        this.successMessage = 'Item Added Successfully';
      }

      setTimeout(() => {
        this.successMessage = null;
        this.router.navigate(['/product-list']); // Navigate to the product list page
      }, 2000); // Delay navigation to show the success message

    } catch (error) {
      //console.error('Error saving product:', error);
    }

    // Reset the form or do other necessary actions
    form.resetForm();
    this.product = {}; // Clear the product object
  }
}