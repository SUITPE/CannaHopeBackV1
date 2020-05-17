

export interface DoctorCreateDto {
    names: string;
    surenames: string;
    email: string;
    mobilePhone: number;
    password: string;
    createDate: string;
    createdBy: string;
    image: string;
    specialty: string;
}

export interface DoctorUpdateDto {
    _id: string;
    names: string;
    surenames: string;
    email: string;
    mobilePhone: number;
    password: string;
    image: string;
    specialty: string;
    updatedBy: string;
    updateDate: string;
}

