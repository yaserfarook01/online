// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HomeComponent } from './home.component'; // Replace with the actual path

// describe('HomeComponent', () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;
//   let router: jasmine.SpyObj<Router>;

//   beforeEach(async () => {
//     const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

//     await TestBed.configureTestingModule({
//       declarations: [ HomeComponent ],
//       imports: [ RouterTestingModule ], // Ensure RouterTestingModule is imported
//       providers: [
//         { provide: Router, useValue: routerSpy }
//       ]
//     })
//     .compileComponents();

//     router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(HomeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   fit('should display welcome message', () => {
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.querySelector('h1')?.textContent).toContain('Welcome to the Retail Inventory Management System');
//   });

//   fit('should render View Products button', () => {
//     const compiled = fixture.nativeElement as HTMLElement;
//     const viewProductsButton = compiled.querySelector('button[routerLink="/product-list"]') as HTMLButtonElement;
//     expect(viewProductsButton).toBeTruthy();
//     expect(viewProductsButton.textContent).toContain('View Products');
//   });

//   fit('should render Add Product button', () => {
//     const compiled = fixture.nativeElement as HTMLElement;
//     const addProductButton = compiled.querySelector('button[routerLink="/product-form"]') as HTMLButtonElement;
//     expect(addProductButton).toBeTruthy();
//     expect(addProductButton.textContent).toContain('Add Product');
//   });

//   fit('should navigate to /product-list on View Products button click', () => {
//     const compiled = fixture.nativeElement as HTMLElement;
//     const viewProductsButton = compiled.querySelector('button[routerLink="/product-list"]') as HTMLButtonElement;
//     if (viewProductsButton) {
//       viewProductsButton.click();
//       expect(router.navigate).toHaveBeenCalledWith(['/product-list']);
//     }
//   });

//   fit('should navigate to /product-form on Add Product button click', () => {
//     const compiled = fixture.nativeElement as HTMLElement;
//     const addProductButton = compiled.querySelector('button[routerLink="/product-form"]') as HTMLButtonElement;
//     if (addProductButton) {
//       addProductButton.click();
//       expect(router.navigate).toHaveBeenCalledWith(['/product-form']);
//     }
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component'; // Replace with the actual path

describe('HeaderComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create HomeComponent', () => {
    expect(component).toBeTruthy();
  });

  fit('should render the header title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Welcome to the Retail Inventory Management System');
  });

  fit('should render View Products button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const viewProductsButton = compiled.querySelector('button[routerLink="/product-list"]') as HTMLButtonElement;
    expect(viewProductsButton).toBeTruthy();
    expect(viewProductsButton.textContent).toContain('View Products');
  });

  
  fit('should render Add Product button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const addProductButton = compiled.querySelector('button[routerLink="/product-form"]') as HTMLButtonElement;
    expect(addProductButton).toBeTruthy();
    expect(addProductButton.textContent).toContain('Add Product');
  });
})