import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories:Category [];
  currentCategory:Category;

  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.GetCategories();
  }

  GetCategories(){
      this.categoryService.getCategories().subscribe(res=>{
        this.categories=res.data;
      })
  }

  SetCurrentCategory(category:Category){
      this.currentCategory=category;
  }

  GetCurrentCategoryClass(category:Category){
    if(this.currentCategory!=undefined && this.currentCategory.categoryId==category.categoryId){
      return "list-group-item list-group-item-action active";
    }else{
      return "list-group-item list-group-item-action";
    }
  }

  GetAllCategoryClass(){
    if(!this.currentCategory){
      return "list-group-item list-group-item-action active";
    }else{
      return "list-group-item list-group-item-action";
    }
  }
}
