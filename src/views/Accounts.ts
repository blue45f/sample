import { BaseComponent } from "vuerxtype/src/components/BaseComponent";
import { Component } from "vue-property-decorator";
import DependencyInjectId from "vuerxtype/src/const/DependencyInjectId";
import { lazyInject } from "vuerxtype/src/application-container/ApplicationContext";
import { TransferService } from "@/service/transfer/TransferService";
import { Account } from "@/service/transfer/model/Account";

const MAX_REMITTANCE = 2000000;

@Component
export default class Accounts extends BaseComponent {
    private remittance = 0;

    @lazyInject(DependencyInjectId.TransferService)
    private transferService!: TransferService;

    private accountList: Array<Account> = [];

    protected created(): void {
        this.remittance = Number(this.$route.query.remittance);
        this.validatePath();
        this.subscribeAccountList();
    }

    protected goBackButton(): void {
        this.$router.back();
    }

    private mounted(): void {
        this.retrieveAccountList();
    }

    private validatePath(): void {
        if (this.remittance === 0 || this.remittance > MAX_REMITTANCE) {
            alert("잘못된 접근 입니다.");
            this.$router.replace({ name: "Main" });
        }
    }

    private subscribeAccountList(): void {
        this.subscribe(this.transferService.accountListSubject$, (accountList: Array<Account>) => {
            this.accountList = accountList;
        });
    }

    private retrieveAccountList(): void {
        this.transferService.retrieveAccountList();
    }
}
