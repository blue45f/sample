<template>
    <div id="wrap">
        <div class="header">
            <div class="toss_top">
                <img alt="logo" src="~../assets/images/common/ex_top.gif" />
            </div>
        </div>
        <div class="content">
            <div class="toss_input">
                <strong>{{ remittance | numberFilter }}</strong> <span>원</span>
                <p class="abs" v-show="isShowWarningMessage">
                    최대 200만원까지 입력할 수 있습니다.
                </p>
            </div>
            <div class="toss_btns">
                <ul>
                    <li v-bind:key="number" v-for="number in 9">
                        <button type="button" v-on:click="clickNumber(number)">{{ number }}</button>
                    </li>
                    <li class="cancel">
                        <button
                            alt="reset"
                            type="button"
                            v-bind:style="{
                                visibility: isEmptyRemittance ? 'hidden' : 'visible'
                            }"
                            v-on:click="resetRemittance()"
                        >
                            취소
                        </button>
                    </li>
                    <li>
                        <button type="button" v-on:click="clickNumber(0)">0</button>
                    </li>
                    <li v-show="!isEmptyRemittance">
                        <button
                            alt="back"
                            type="button"
                            v-bind:style="{
                                visibility: isEmptyRemittance ? 'hidden' : 'visible'
                            }"
                            v-on:click="clearRemittanceOnlyOneSpace()"
                        >
                            <img alt="back" src="~../assets/images/common/icn-navigation-android-back.svg" />지우기
                        </button>
                    </li>
                    <li class="all" v-bind:class="{ dis: isEmptyRemittance }">
                        <button alt="send" type="button" v-bind:disabled="isEmptyRemittance" v-on:click="goAccounts">
                            보내기
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script src="Main.ts"></script>
