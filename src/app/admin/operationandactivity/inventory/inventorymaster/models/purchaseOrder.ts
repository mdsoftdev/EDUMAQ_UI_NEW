export interface PurchaseOrder {
    id : number;
    branchId : number;
    status : boolean;
    supplierId : number;
    quotationNo : number;
    quotationDate : string;
    purchaseOrderNumber : number;
    purchaseOrderDate : string;
    remark : string;
    subTotal : number;
    discount : number;
    tax : number;
    totalPayable : number;
}