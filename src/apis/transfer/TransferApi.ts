import { Observable } from "rxjs";
import { inject, injectable, optional } from "inversify";
import DependencyInjectId from "vuerxtype/src/const/DependencyInjectId";
import { Config } from "vuerxtype/src/application-container/config/Config";
import { AbstractTransferApi } from "./AbstractTransferApi";
import { AccountsResponse } from "@/apis/transfer/response/AccountsResponse";
import { Communicator } from "vuerxtype/src/network/Communicator";
import { ApiInterceptor } from "vuerxtype/src/apis/ApiInterceptor";
import { MyAccountsResponse } from "@/apis/transfer/response/MyAccountsResponse";

@injectable()
export class TransferApi extends AbstractTransferApi {
    constructor(
        @inject(DependencyInjectId.Configuration) protected configuration: Config,
        @inject(DependencyInjectId.HttpClient) protected http: Communicator,
        @inject(DependencyInjectId.ApiInterceptor)
        @optional()
        protected apiInterceptor: ApiInterceptor
    ) {
        super();
    }

    public getAccounts(): Observable<Array<AccountsResponse>> {
        return this.get<Array<AccountsResponse>>({ url: "accounts" });
    }

    public getMyAccounts(): Observable<Array<MyAccountsResponse>> {
        return this.get<Array<MyAccountsResponse>>({ url: "accounts/my" });
    }
}
