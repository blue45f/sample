import { BaseComponent } from "vuerxtype/src/components/BaseComponent";
import { Component } from "vue-property-decorator";
import DependencyInjectId from "vuerxtype/src/const/DependencyInjectId";
import { lazyInject } from "vuerxtype/src/application-container/ApplicationContext";
import { TransferService } from "@/service/transfer/TransferService";
import { Account } from "@/service/transfer/model/Account";
import { MyAccount } from "@/service/transfer/model/MyAccount";
import { NumberUnit } from "vuerxtype/src/utils/common";

const MAX_REMITTANCE = 2000000;
const DEFAULT_CHECKED_BANK_NAME = "토스";

@Component
export default class Confirmation extends BaseComponent {
    @lazyInject(DependencyInjectId.TransferService)
    private transferService!: TransferService;

    private myAccountList: Array<MyAccount> = [];

    private remittance = 0;

    private remittanceAccount: Account | null = null;

    protected created() {
        this.remittance = Number(this.$route.query.remittance);
        this.validatePath();
        this.remittanceAccount = Account.create({
            accountNumber: this.$route.query.accountNumber as string,
            accountHolder: this.$route.query.accountHolder as string,
            bankImageUrl: this.$route.query.bankImageUrl as string,
            bankName: this.$route.query.bankName as string
        });
        this.subscribeMyAccountList();
    }

    protected goBackButton(): void {
        this.$router.back();
    }

    private mounted(): void {
        this.retrieveMyAccountList();
    }

    private validatePath(): void {
        if (this.remittance === 0 || this.remittance > MAX_REMITTANCE) {
            alert("잘못된 접근 입니다.");
            this.$router.replace({ name: "Main" });
        }
    }

    private subscribeMyAccountList(): void {
        this.subscribe(this.transferService.myAccountListSubject$, (myAccountList: Array<MyAccount> = []): void => {
            this.myAccountList = myAccountList || [];
            this.checkDefaultAccount();
        });
    }

    private checkDefaultAccount(): void {
        const defaultAccount: MyAccount = this.findDefaultAccount();

        defaultAccount.isChecked = true;
    }

    private findDefaultAccount(): MyAccount {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.myAccountList!.find((account: MyAccount) => account.bankName === DEFAULT_CHECKED_BANK_NAME)!;
    }

    private retrieveMyAccountList(): void {
        this.transferService.retrieveMyAccountList();
    }

    private selectAccount(account: MyAccount): void {
        this.allUncheck();

        account.isChecked = true;
    }

    private allUncheck(): void {
        this.myAccountList.map((account: MyAccount) => (account.isChecked = false));
    }

    private transferMoney(): void {
        const withdrawalAccount: MyAccount = this.findCheckedAccount();

        if (withdrawalAccount) {
            this.showTransferConfirmationMessage({
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                accountHolder: this.remittanceAccount!.accountHolder,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                remittanceAccount: this.remittanceAccount!.accountNumber,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                remittance: this.remittance,
                withdrawalAccount: withdrawalAccount.accountName
            });
        }
    }

    private findCheckedAccount(): MyAccount {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.myAccountList!.find((account: MyAccount) => account.isChecked)!;
    }

    private showTransferConfirmationMessage(transferInfo: { accountHolder: string; remittanceAccount: string; remittance: number; withdrawalAccount: string }): void {
        alert(`보낼 사람: ${transferInfo.accountHolder}\n보낼 계좌 번호: ${transferInfo.remittanceAccount}\n보낼 금액: ${NumberUnit(transferInfo.remittance)}원\n출금 계좌: ${transferInfo.withdrawalAccount}`);
    }
}
