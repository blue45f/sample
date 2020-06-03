import "./assets/css/common.css";
import "reflect-metadata";
import { SERVICES as BASE_SERVICE } from "vuerxtype/src/const/Services";
import { ApplicationManager } from "vuerxtype/src/application-container/ApplicationManager";
import { App } from "./App";
import { SERVICES } from "@/const/Services";

new ApplicationManager([], App)
    .setService([...BASE_SERVICE, ...SERVICES])
    .setMockLoader(
        require.context(
            // MOCK파일이 있는 ROOT 폴더
            "../mocks",
            // 하위 폴더까지 포함할 지 여부
            true,
            // MOCK파일을 찾는데 사용할 정규표현식
            /\.json$/
        )
    )
    .bootstrap("#app");
