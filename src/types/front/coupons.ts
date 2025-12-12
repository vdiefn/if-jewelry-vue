export interface CreateCouponResponse {
    success: boolean,
    message: string,
    data: {
        final_total: number,
    }
}

export interface CouponParams {
    data: {
        code: string
    }
}