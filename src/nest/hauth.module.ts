import { DynamicModule, Global, Module } from "@nestjs/common"
import { ServerConfig } from "../interfaces/serverConfig";
import { HAuthCoreModule } from "./hauth-core.module";
import { HAuthMiddleware } from "./hauth.middleware";
import { HAuthenticate } from "./hauthenticate.guard";

@Module({})
export class HAuthModule {
    static forRoot(options: ServerConfig): DynamicModule {
        return {
            module: HAuthModule,
            imports: [HAuthCoreModule.forRoot(options)],
        };
    }
}