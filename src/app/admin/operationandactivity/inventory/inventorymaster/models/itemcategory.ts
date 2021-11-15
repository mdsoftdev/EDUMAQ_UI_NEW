export interface Itemcategory {
    id: number;
    name: string;
    description: string;
    itemGroupId : bigint;
    academicYearId : bigint;
    isDeleted: boolean;
    deletedDate: Date;
    deletedBy: bigint;
    status: boolean;
}

