import { Paging } from "./paging";
import { ProductIndex } from "./product-index";

export class ProductCategory{
    paging: Paging;
    category: Category;
    products: ProductIndex;
    breadcrumbs: Breadcrumb;
}
export class Breadcrumb{
    label: string;
    url: string;
}
export class Category{
    categoryName: string;
    url: string;
    categoryChildrens: Category[];
}