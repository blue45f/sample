import { inject, injectable } from "inversify";
import { Observable, Subject } from "rxjs";
import DependencyInjectId from "vuerxtype/src/const/DependencyInjectId";
import { TransferMapper } from "./TransferMapper";
import { Account } from "./model/Account";
import { MyAccount } from "./model/MyAccount";

@injectable()
export class TransferService {
    private accountListSubject: Subject<Array<Account>> = new Subject<Array<Account>>();

    private myAccountListSubject: Subject<Array<MyAccount>> = new Subject<Array<MyAccount>>();

    constructor(
        @inject(DependencyInjectId.TransferMapper)
        private transferMapper: TransferMapper
    ) {}

    public get accountListSubject$(): Observable<Array<Account>> {
        return this.accountListSubject.asObservable();
    }

    public get myAccountListSubject$(): Observable<Array<MyAccount>> {
        return this.myAccountListSubject.asObservable();
    }

    public retrieveAccountList(): void {
        this.transferMapper.retrieveAccountList().subscribe((accountList: Array<Account>) => {
            this.accountListSubject.next(accountList);
        });
    }

    public retrieveMyAccountList(): void {
        this.transferMapper.retrieveMyAccountList().subscribe((myAccountList: Array<MyAccount>) => {
            this.myAccountListSubject.next(myAccountList);
        });
    }
}
