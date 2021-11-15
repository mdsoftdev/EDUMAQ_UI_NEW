import { Country } from "./country";

export interface Supplier {
    id: number;
    supplierTypeId: bigint;
    code: bigint;
    supplierName:string;
    panNo: string;
    tanNo: string;
    gstNo: string;
    contactNo: string;
    email: string;
    website: string;
    countryId:bigint;
    stateId:bigint;
    cityId:bigint;
    address:string;
    accountName:string;
    accountNumber:string;
    ifscCode:string;
    bankName:string;
    academicYearId : bigint;
    isDeleted: boolean;
    deletedDate: Date;
    deletedBy: bigint;
    status: boolean;
    // country: Country
}

