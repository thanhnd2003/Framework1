import { Component } from '@angular/core';
import { IProduct } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  constructor (private productService: ProductService){
    this.productService.getProducts().subscribe((data) => {
      this.products = data
    })
  }
  product!:IProduct;
  products:IProduct[] = [];


  
  removeItem(id:any){
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(item => item.id !== id)
    }, error => console.log(error.message)
    )
  }

}
