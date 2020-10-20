import { Product } from 'src/app/cart-shopping/shared/Product';

export interface OldOrder{
    orderId:number,
    list: Product[],
    date:string,
    price:number
}