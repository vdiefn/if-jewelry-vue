export interface UserLoginResponse {
    success: boolean,
    message: string,
    uid: string,
    token: string,
    expired: number
}

export interface MessageResponse {
    success: boolean,
    uid: string
}
