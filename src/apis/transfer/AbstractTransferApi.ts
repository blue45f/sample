import { RequestOptions } from "vuerxtype/src/network/RequestOptions";
import { Response } from "vuerxtype/src/network/Response";
import { Config } from "vuerxtype/src/application-container/config/Config";
import { BasicBusinessException } from "vuerxtype/src/exception/http-status/BasicBusinessException";
import { TransferResponse } from "./TransferResponse";
import { injectable } from "inversify";
import { AbstractApi } from "vuerxtype/src/apis/AbstractApi";
import { ApiStatusCode } from "vuerxtype/src/enum/ApiStatusCode";

@injectable()
export abstract class AbstractTransferApi extends AbstractApi {
    protected readonly endPoint: string = "API_URL";

    protected readonly context: string = "transfer";

    protected configuration!: Config;

    protected setRequestOption(requestOptions: RequestOptions): void {
        requestOptions.url = `${this.configuration.getItem(this.endPoint)}/${this.context}/${requestOptions.url}`;
    }

    /**
     * The requested header options is overwritten default header options
     *
     * @param customOption
     */
    protected createRequestHeaderData(customOption: RequestOptions): RequestOptions {
        return customOption;
    }

    /**
     * Converts to standard response object and returns.
     *
     * @param response
     */
    protected converterStandardResponse<T>(response: TransferResponse<T>): Response<T> {
        response.status = Number(response.result);
        response.statusText = response.message;
        response.data = response.value;

        return response;
    }

    protected isSuccessResponse(response: Response): boolean {
        return ApiStatusCode.SUCCESS === response.status;
    }

    /**
     * Service ErrorHandler
     *
     * @param resultCode
     * @param resultMessage
     */
    protected resultHandler(resultCode: number, resultMessage?: string): Error {
        throw new BasicBusinessException(resultMessage, resultCode);
    }
}
