export interface Item {
    id : number;
    branchId : number;
    status : boolean;
    itemName : string;
    itemCategoryId : number;
    itemGroupId : number;
    itemCode : string;
    sku : string;
    unitId : number;
    itemType : string;
    size : number;
    colorId : number;
    openingStock : number;
    taxId : number;
    cost : number;
    saleRate : number;
    lowQtyAlert : number;
    isBundledProduct : boolean;
    description : string;
    image : string;
}