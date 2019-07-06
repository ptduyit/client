export class Product {
    productId: number;
    productName: string;
    categoryId: number;
    unitPrice: number;
    importPrice: number;
    discontinued: boolean;
    discount: number;
    stock: number;
    description: string;
    guarantee: number;
    createAt: Date;
    summary: string;
    displayIndex: boolean;
    productImages: any;
}
export interface ProductSearch{
    id: number;
    name: string;
}
export interface ProductQuickSearch{
    productId: number;
    productName: string;
    unitPrice: number;
    image: string;
}
export interface QuickAddProduct{
    orderId: number;
    userId: string;
    supplierId: number;
    productName: string;
    categoryId: number;
    quantity: number;
    unitPrice: number;
}
export interface QuickAddProductForm{
    productName: string;
    categoryId: number;
    quantity: number;
    unitPrice: number;
} 
