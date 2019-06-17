import { Paging } from "./paging";
import { ProductIndex } from "./product-index";

export class ProductCategory{
    paging: Paging;
    categories: Categories;
    products: ProductIndex;
    breadcrumbs: Breadcrumb;
}
export class Breadcrumb{
    label: string;
    url: string;
}
export class Categories{
    categoryName: string;
    url: string;
    categoryChildrens: Categories[];
}
export interface Menu{
    categoryId: number;
    categoryName: string;
    url: string;
    categoryChildrens: Menu[];
}