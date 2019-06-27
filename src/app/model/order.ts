export class Order {
    orderId: number;
    orderDate: Date;
    shippedDate: Date;
    status: number;
    statusName:string;
    totalPrice:number;
    phoneNumber: string;
    fullName: string;
    street:string;
    provinces: string;
    districts: string;
    wards: string;
    userId: string;
    orderDetails: OrderDetails[];
}
export interface OrderDetails{
    quantity:number;
    unitPrice:number;
    productid:number;
    productName:string;
    productImages:string;
    discontinued:boolean;
}