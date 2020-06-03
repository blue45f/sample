import { Response } from "vuerxtype/src/network/Response";

export interface TransferResponse<T> extends Response {
    message: string;
    result: number;
    value?: T;
}
