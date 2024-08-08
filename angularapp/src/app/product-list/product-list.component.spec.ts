import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts', 'deleteProduct']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should load products on initialization', fakeAsync(() => {
    const mockProducts: Product[] = [
      { name: 'Product 1', description: 'Description 1', quantity: 10, price: 100 },
      { name: 'Product 2', description: 'Description 2', quantity: 20, price: 200 }
    ];
    productService.getProducts.and.returnValue(of(mockProducts));
    
    component.loadProducts();
    tick(); // Simulate passage of time

    fixture.detectChanges(); // Trigger change detection

    expect(productService.getProducts).toHaveBeenCalled();
    expect(component.products.length).toBe(2);
  }));

  fit('should handle error on load products', fakeAsync(() => {
    productService.getProducts.and.returnValue(throwError('Error'));

    spyOn(window, 'alert'); // Assuming you have an alert or similar notification
    component.loadProducts();
    tick(); // Simulate passage of time

    fixture.detectChanges(); // Trigger change detection
    expect(component.products.length).toBe(0);
  }));

  fit('should navigate to edit page on edit', () => {
    component.editProduct(1);
    expect(router.navigate).toHaveBeenCalledWith(['/product-form/1']);
  });

  fit('should handle error on delete product', fakeAsync(() => {
    productService.deleteProduct.and.returnValue(throwError('Error'));

    spyOn(window, 'alert'); // Assuming you have an alert or similar notification
    component.deleteProduct(1);
    tick(); // Simulate passage of time

    fixture.detectChanges(); // Trigger change detection
  }));

  fit('should navigate to home page', () => {
    component.goToHome();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});