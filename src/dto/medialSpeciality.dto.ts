

export  interface MedicalSpecialityCreateDto {
    name: string;
    description: string;
    createdAt: Date;
    createdBy: string;
}


export  interface MedicalSpecialityUpdateDto {
    name: string;
    description: string;
    updatedAt: Date
    updatedBy: string;
}