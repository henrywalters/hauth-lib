import { Module } from "@nestjs/common"
import { HAuthServer } from "../server";
import { HAuthMiddleware } from "./hauth.middleware";
import { HAuthService } from "./hauth.service";
import { HAuthenticate } from "./hauthenticate.guard";

@Module({
    providers: [
        HAuthMiddleware,
        HAuthenticate,
        HAuthService,
    ],
    exports: [
        HAuthService,
        HAuthMiddleware,
        HAuthenticate,
    ]
})
export class HAuthModule {
 
}