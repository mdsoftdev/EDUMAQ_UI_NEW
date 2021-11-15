export interface SupplierType {
    id: number;
    name: string;
    description: string;
    academicYearId : bigint;
    isDeleted: boolean;
    deletedDate: Date;
    deletedBy: bigint;
    status: boolean;
}

