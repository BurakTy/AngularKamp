import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  productAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createProductForm();
  }

  createProductForm() {
    this.productAddForm = this.formBuilder.group({
      productName: ['', Validators.required],
      unitPrice: ['', Validators.required],
      unitsInStock: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }
  add() {
    if (this.productAddForm.valid) {
      let productModule = Object.assign({}, this.productAddForm.value);
      this.productService.add(productModule).subscribe(
        (res) => {
          this.toastrService.success(res.message, 'Başarılı');
        },
        (err) => {
          console.log(err);
          if(err.error.ValidationsErrors){
            for(let i=0;i<err.error.ValidationsErrors.length;i++){
              this.toastrService.error("Doğrulama Hatası",err.error.ValidationsErrors[i].ErrorMessage);
            }
          }else if(err.error.success==false){
            this.toastrService.error("",err.error.message);
          }else{
            this.toastrService.error("Yetki Hatası",err.error.Message);
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }
}
