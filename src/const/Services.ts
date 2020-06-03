import { InjectService } from "vuerxtype/src/application-container/model/InjectService";
import DependencyInjectId from "./DependencyInjectId";
import { TransferApi } from "@/apis/transfer/TransferApi";
import { TransferMapper } from "@/service/transfer/TransferMapper";
import { TransferService } from "@/service/transfer/TransferService";

export const SERVICES: Array<InjectService> = [
    {
        name: DependencyInjectId.TransferApi,
        service: TransferApi
    },
    {
        name: DependencyInjectId.TransferMapper,
        service: TransferMapper
    },
    {
        name: DependencyInjectId.TransferService,
        service: TransferService
    }
];
