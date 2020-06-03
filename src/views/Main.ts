import { BaseComponent } from "vuerxtype/src/components/BaseComponent";
import { Component } from "vue-property-decorator";

const MAX_REMITTANCE = 2000000;

@Component
export default class Main extends BaseComponent {
    private remittance = 0;

    private get isEmptyRemittance(): boolean {
        return this.remittance === 0;
    }

    private get isShowWarningMessage(): boolean {
        return this.remittance >= MAX_REMITTANCE;
    }

    private clickNumber(number: number): void {
        if (this.remittance) {
            this.remittance = Number(String(this.remittance) + String(number));

            if (this.remittance > MAX_REMITTANCE) {
                this.remittance = MAX_REMITTANCE;
            }
        } else if (number) {
            this.remittance = Number(number);
        }
    }

    private clearRemittanceOnlyOneSpace(): void {
        this.remittance = Number(String(this.remittance).slice(0, -1));
    }

    private resetRemittance(): void {
        this.remittance = 0;
    }

    private goAccounts(): void {
        this.$router.push({
            name: "Accounts",
            query: { remittance: String(this.remittance) }
        });
    }
}
