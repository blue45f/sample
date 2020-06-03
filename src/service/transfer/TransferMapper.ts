import { inject, injectable } from "inversify";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import DependencyInjectId from "vuerxtype/src/const/DependencyInjectId";
import { TransferApi } from "../../apis/transfer/TransferApi";
import { AccountsResponse } from "../../apis/transfer/response/AccountsResponse";
import { TransferHelper } from "./TransferHelper";
import { Account } from "./model/Account";
import { MyAccountsResponse } from "../../apis/transfer/response/MyAccountsResponse";
import { MyAccount } from "./model/MyAccount";
import { mapperMock } from "vuerxtype/src/decorator/Mock";

@injectable()
export class TransferMapper {
    constructor(@inject(DependencyInjectId.TransferApi) private transferApi: TransferApi) {}

    @mapperMock("service/accounts", true)
    public retrieveAccountList(): Observable<Array<Account>> {
        return this.transferApi.getAccounts().pipe(map((response: Array<AccountsResponse>): Array<Account> => TransferHelper.mappingAccountList(response)));
    }

    @mapperMock("service/my-accounts", true)
    public retrieveMyAccountList(): Observable<Array<MyAccount>> {
        return this.transferApi.getMyAccounts().pipe(map((response: Array<MyAccountsResponse>): Array<MyAccount> => TransferHelper.mappingMyAccountList(response)));
    }
}
