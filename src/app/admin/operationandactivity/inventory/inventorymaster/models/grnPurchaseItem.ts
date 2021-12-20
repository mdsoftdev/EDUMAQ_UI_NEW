export interface GrnPurchaseItem {
    id : number;
    grnPurchaseId : number;
    itemId: number;
    itemName: string;
    itemCode: string;
    quantity: number;
    rate: number;
    discount: number;
    tax: number;
    total: number;
    taxAmount: number;
}