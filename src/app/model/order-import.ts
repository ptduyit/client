export interface OrderImport{
    orderId: number;
    supplierId: number;
    companyName : string;
    totalPrice : number;
    orderDate : Date;
    userId : string;
    fullName : string;
    orderDetails : OrderDetails[];
}
export interface OrderDetails{
    quantity: number;
    unitPrice: number;
    productId: number;
    productName: string;
}
