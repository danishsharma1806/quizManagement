type ApiError = {
    error?: string,
    message?: string,
}

export type ApiResponse = {
    data?: any,
    message: string,
    error?: ApiError,
    statusCode: number,
}