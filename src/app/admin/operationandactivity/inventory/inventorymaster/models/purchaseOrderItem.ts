export interface PurchaseOrderItem {
    id : number;
    purchaseOrderId : number;
    itemId: number;
    itemName: string;
    itemCode: string;
    quantity: number;
    rate: number;
    discount: number;
    tax: number;
    total: number;
}