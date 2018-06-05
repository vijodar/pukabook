export interface OnHttpResponse {
    onDataReceived(data: object)
    onErrorReceivingData(message: number)
}