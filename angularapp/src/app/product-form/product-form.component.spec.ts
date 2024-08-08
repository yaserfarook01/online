// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { of } from 'rxjs';
// import { ProductFormComponent } from './product-form.component';
// import { ProductService } from '../services/product.service';
// import { ActivatedRoute } from '@angular/router';

// describe('ProductFormComponent', () => {
//   let component: ProductFormComponent;
//   let fixture: ComponentFixture<ProductFormComponent>;
//   let productService: jasmine.SpyObj<ProductService>;
//   let router: jasmine.SpyObj<Router>;

//   beforeEach(async () => {
//     const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProduct', 'updateProduct', 'createProduct']);
//     const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
//     const activatedRouteStub = { snapshot: { params: {} } };

//     await TestBed.configureTestingModule({
//       declarations: [ ProductFormComponent ],
//       imports: [ FormsModule ],
//       providers: [
//         { provide: ProductService, useValue: productServiceSpy },
//         { provide: Router, useValue: routerSpy },
//         { provide: ActivatedRoute, useValue: activatedRouteStub }
//       ]
//     })
//     .compileComponents();

//     productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
//     router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ProductFormComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   fit('should load product data for editing', () => {
//     component.productId = 1;
//     productService.getProduct.and.returnValue(of({ name: 'Product 1', description: 'Description', quantity: 10, price: 100 }));
//     component.ngOnInit();
//     expect(productService.getProduct).toHaveBeenCalledWith(1);
//     expect(component.product.name).toBe('Product 1');
//   });

//   fit('should create a new product', () => {
//     component.editMode = false;
//     productService.createProduct.and.returnValue(of(void 0));
//     const form = { invalid: false, resetForm: jasmine.createSpy() };
//     component.saveProduct(form as any);
//     expect(productService.createProduct).toHaveBeenCalledWith(component.product);
//     expect(router.navigate).toHaveBeenCalledWith(['/product-list']);
//   });

//   fit('should update an existing product', () => {
//     component.editMode = true;
//     component.productId = 1;
//     productService.updateProduct.and.returnValue(of(void 0));
//     const form = { invalid: false, resetForm: jasmine.createSpy() };
//     component.saveProduct(form as any);
//     expect(productService.updateProduct).toHaveBeenCalledWith(1, component.product);
//     expect(router.navigate).toHaveBeenCalledWith(['/product-list']);
//   });

//   fit('should handle form invalid state', () => {
//     const form = { invalid: true, control: { markAllAsTouched: jasmine.createSpy() } };
//     component.saveProduct(form as any);
//     expect(form.control.markAllAsTouched).toHaveBeenCalled();
//   });
// });


import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductFormComponent } from './product-form.component';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProduct', 'updateProduct', 'createProduct']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteStub = { snapshot: { params: { id: 1 } } }; // Ensure the id is set if needed

    await TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [FormsModule],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ProductFormComponent', () => {
    expect(component).toBeTruthy();
  });

  fit('should handle form invalid state', () => {
    const form = { invalid: true, control: { markAllAsTouched: jasmine.createSpy() } };
    component.saveProduct(form as any);
    
    expect(form.control.markAllAsTouched).toHaveBeenCalled();
  });

  fit('should display "Add Product" title and "Save" button text when in add mode', () => {
    component.editMode = false;
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    const button = fixture.debugElement.query(By.css('button')).nativeElement;

    expect(title.textContent).toContain('Add Product');
    expect(button.textContent).toContain('Save');
  });

  fit('should display "Edit Product" title and "Update" button text when in edit mode', () => {
    component.editMode = true;
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    const button = fixture.debugElement.query(By.css('button')).nativeElement;

    expect(title.textContent).toContain('Edit Product');
    expect(button.textContent).toContain('Update');
  });

  fit('should enable the submit button when form is valid', fakeAsync(() => {
    const nameInput = fixture.debugElement.query(By.css('#name')).references['name'];
    const descriptionInput = fixture.debugElement.query(By.css('#description')).references['description'];
    const quantityInput = fixture.debugElement.query(By.css('#quantity')).references['quantity'];
    const priceInput = fixture.debugElement.query(By.css('#price')).references['price'];

    nameInput.control.setValue('Test Product');
    descriptionInput.control.setValue('This is a test product description.');
    quantityInput.control.setValue(10);
    priceInput.control.setValue(19.99);

    fixture.detectChanges();
    tick();

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeFalse();
  }));
});
