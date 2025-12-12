export interface UserData {
    name: string,
    email: string,
    tel: string,
    address: string
}

export interface CreateOrderParams {
    data: {
        user: UserData,
        message: string
    }
}

export interface CreateOrderResponse {
    success: boolean,
    message: string,
    total: number,
    create_at: number,
    orderId: string
}