import Vue from "vue";
import Meta from "vue-meta";
import { Application } from "vuerxtype/src/Application";
import VueI18n, { LocaleMessages } from "vue-i18n";
import { i18nProvider } from "vuerxtype/src/global-domain/I18nProvider";
import { LocaleResourceLoader } from "vuerxtype/src/global-domain/loader";
import { ko } from "./locales";
import { lazyInject } from "vuerxtype/src/application-container/ApplicationContext";
import DependencyInjectId from "vuerxtype/src/const/DependencyInjectId";
import { Config } from "vuerxtype/src/application-container/config/Config";
import BaseLayout from "vuerxtype/src/layouts/BaseLayout.vue";
import router from "@/router";
import NumberUnit from "vuerxtype/src/filters/NumberFormat";

export class App implements Application {
    @lazyInject(DependencyInjectId.LocaleJsonLoader)
    private loader!: LocaleResourceLoader<LocaleMessages>;

    @lazyInject(DependencyInjectId.Configuration)
    private config!: Config;

    private application!: Vue;

    constructor() {
        Vue.filter("numberFilter", NumberUnit);
        Vue.use(VueI18n);
        Vue.use(Meta);
    }

    public load(selector: string) {
        i18nProvider.initialize(this.loader.mergeAll({ ko }));
        this.bootstrap(selector);
    }

    private bootstrap(selector: string) {
        this.application = new Vue({
            i18n: i18nProvider.i18n,
            router,

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render: (h: any) => h(BaseLayout)
        }).$mount(selector);
    }
}
