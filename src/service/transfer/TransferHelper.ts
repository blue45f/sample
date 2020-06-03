import { Account } from "./model/Account";
import { AccountsResponse } from "../../apis/transfer/response/AccountsResponse";
import { MyAccountsResponse } from "../../apis/transfer/response/MyAccountsResponse";
import { MyAccount } from "./model/MyAccount";

export class TransferHelper {
    public static mappingAccountList(response: Array<AccountsResponse>): Array<Account> {
        return response.map(this.mappingAccount);
    }

    public static mappingAccount(response: AccountsResponse): Account {
        return Account.create({
            bankImageUrl: response.bankImageUrl,
            accountHolder: response.accountHolder,
            accountNumber: response.accountNumber,
            bankName: response.bankName
        });
    }

    public static mappingMyAccountList(response: Array<MyAccountsResponse>): Array<MyAccount> {
        return response.map(this.mappingMyAccount);
    }

    public static mappingMyAccount(response: MyAccountsResponse): MyAccount {
        return MyAccount.create({
            bankImageUrl: response.bankImageUrl,
            bankName: response.bankName,
            accountName: response.accountName,
            accountBalance: response.accountBalance,
            isChecked: false
        });
    }
}
