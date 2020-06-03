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
                <strong>{{ remittance | numberFilter }}원 송금</strong>
            </div>
        </div>
        <div class="content">
            <div class="toss_bank_list">
                <ul>
                    <li v-bind:key="account.accountHolder + '_' + account.accountNumber" v-for="account in accountList">
                        <router-link
                            v-bind:to="{
                                name: 'Confirmation',
                                query: {
                                    remittance: remittance,
                                    accountHolder: account.accountHolder,
                                    accountNumber: account.accountNumber,
                                    bankImageUrl: account.bankImageUrl,
                                    bankName: account.bankName
                                }
                            }"
                        >
                            <span class="icon">
                                <img v-bind:alt="account.bankName" v-bind:src="account.bankImageUrl" />
                            </span>
                            <span class="text">
                                <strong>{{ account.accountHolder }}</strong>
                                <span>{{ account.bankName }} {{ account.accountNumber }}</span>
                            </span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script src="Accounts.ts"></script>
