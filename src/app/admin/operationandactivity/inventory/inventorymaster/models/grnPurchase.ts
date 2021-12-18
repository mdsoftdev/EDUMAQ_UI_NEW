export interface GrnPurchase {
    id : number;
    branchId : number;
    status : boolean;
    supplierId : number;
    poNumber : number;
    supplierInvoiceNo : number;
    invoiceDate : string;
    grnNumber : number;
    grnDate: string;
    remark : string;
    internalNote: string;
    subTotal : number;
    discount : number;
    tax : number;
    additionalCharges : number;
    totalPayable : number;
}