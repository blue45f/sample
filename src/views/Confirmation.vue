<template>
    <div id="wrap">
        <div class="header">
            <div class="toss_top">
                <img alt="logo" src="~../assets/images/common/ex_top.gif" />
            </div>
            <div class="toss_header">
                <button class="back" type="button" v-on:click="goBackButton">
                    <img alt="back" src="../assets/images/common/btn_icon_back.png" />
                </button>
                <strong>{{ remittance | numberFilter }} 원 송금</strong>
            </div>
        </div>
        <div class="content">
            <div class="withdraw_area">
                <p class="text">
                    <strong>{{ remittanceAccount.accountHolder }}</strong
                    >님 계좌로
                    <br />
                    <strong>{{ remittance | numberFilter }} 원</strong>을 보냅니다
                </p>
                <p class="info">{{ remittanceAccount.bankName }} {{ remittanceAccount.accountNumber }}</p>
                <span class="icon">
                    <img v-bind:alt="remittanceAccount.bankName" v-bind:src="remittanceAccount.bankImageUrl" />
                </span>
            </div>
            <div class="toss_bank_list">
                <strong>출금 계좌</strong>
                <ul>
                    <li v-bind:class="{ check: account.isChecked }" v-bind:key="account.accountName" v-for="account in myAccountList">
                        <a v-on:click.prevent.stop="selectAccount(account)">
                            <span class="icon">
                                <img v-bind:alt="account.bankName" v-bind:src="account.bankImageUrl" />
                            </span>
                            <span class="text">
                                <strong>{{ account.accountName }}</strong>
                                <span>{{ account.accountBalance | numberFilter }} 원</span>
                            </span>
                        </a>
                    </li>
                </ul>
                <button class="submit" type="button" v-on:click="transferMoney">
                    보내기
                </button>
            </div>
        </div>
    </div>
</template>

<script src="Confirmation.ts"></script>
