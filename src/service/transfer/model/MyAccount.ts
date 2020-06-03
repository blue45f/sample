export class MyAccount {
    public bankImageUrl: string;
    public bankName: string;
    public accountName: string;
    public accountBalance: number;
    public isChecked: boolean;

    constructor(bankImageUrl: string, bankName: string, accountName: string, accountBalance: number, isChecked: boolean) {
        this.bankImageUrl = bankImageUrl;
        this.bankName = bankName;
        this.accountName = accountName;
        this.accountBalance = accountBalance;
        this.isChecked = isChecked;
    }

    public static create(account: { bankImageUrl: string; bankName: string; accountName: string; accountBalance: number; isChecked: boolean }): MyAccount {
        return new MyAccount(account.bankImageUrl, account.bankName, account.accountName, account.accountBalance, account.isChecked);
    }
}
