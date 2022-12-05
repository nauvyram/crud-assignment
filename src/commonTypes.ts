import { AxiosError } from "axios";
export interface IErrorBase<T> {
    error: Error | AxiosError<T>;
    type: 'axios-error' | 'stock-error';
}

export interface IAxiosError<T> extends IErrorBase<T> {
    error: AxiosError<T>;
    type: 'axios-error';
}