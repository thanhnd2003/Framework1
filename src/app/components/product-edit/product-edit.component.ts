import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { IProduct } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent {
  product!: IProduct;
  productForm = this.formBuilde.group({
    name: [''],
    price: 0,
  });
  constructor(
    private formBuilde: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((param) => {
      const id = param.get('id');
      this.productService.getProduct(id).subscribe((product) => {
        this.product = product;
        this.productForm.patchValue({
          name:product.name,
          price:product.price
        })
      })
    })
  }

  onHandleEdit() {
    if(this.productForm.valid){
      const product : IProduct = {
        id:this.product.id,
        name:this.productForm.value.name || '',
        price:this.productForm.value.price || 0,
      };
      this.productService.updateProduct(product).subscribe((data) => {
        console.log(data);
        
      })
    }
  }
}
