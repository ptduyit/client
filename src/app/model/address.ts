export class AddressUser{
    addressId: number;
    fullName: string;
    phoneNumber: string;
    wardId: number;
    wards: any;
    street: string;
    isDefault: boolean;
    userId: string;
}
export class ShowAddressUser{
    addressId: number;
    fullName: string;
    phoneNumber: string;
    street: string;
    isDefault: boolean;
    location: any;
}