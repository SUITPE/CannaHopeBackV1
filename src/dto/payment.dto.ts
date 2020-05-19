export interface PaymentCreateDto {
    appointment: string
    paymentMethod: string
    operationCode: string
    value: number;
    bankAccount: string;
    registerDate: string;
}