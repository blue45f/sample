import { AccountsResponse } from "../../../apis/transfer/response/AccountsResponse";

export class Account {
    public bankImageUrl: string;
    public accountHolder: string;
    public bankName: string;
    public accountNumber: string;

    constructor(bankImageUrl: string, accountHolder: string, bankName: string, accountNumber: string) {
        this.bankImageUrl = bankImageUrl;
        this.accountHolder = accountHolder;
        this.bankName = bankName;
        this.accountNumber = accountNumber;
    }

    public static create(account: AccountsResponse): Account {
        return new Account(account.bankImageUrl, account.accountHolder, account.bankName, account.accountNumber);
    }
}
