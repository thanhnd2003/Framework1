import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IProduct } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
  constructor (private formBuilde : FormBuilder, private productService: ProductService){}

  productForm = this.formBuilde.group({
    name: ['',[Validators.required]],
    price:[0]
  });
  onHandleSubmit(){
    if(this.productForm.valid){
      const product : IProduct = {
        name:this.productForm.value.name || '',
        price:this.productForm.value.price || 0
      }
      this.productService.addProduct(product).subscribe((data) => {
        console.log(data);
      });
      console.log(this.productForm.value);
      
    }
    
  }

}
