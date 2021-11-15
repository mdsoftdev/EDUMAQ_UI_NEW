export interface Tax {
    id: number;
    taxName: string;
    description: string;
    rate: number;
    rateunit: string;
    academicYearId : bigint;
    isDeleted: boolean;
    deletedDate: Date;
    deletedBy: bigint;
    status: boolean;
}

