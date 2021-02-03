import { DynamicModule, Global, Inject, Module } from "@nestjs/common";
import { ServerConfig } from "../interfaces/serverConfig";
import { HAUTH_CONFIG } from "./hauth.constants";
import { HAuthMiddleware } from "./hauth.middleware";
import { HAuthenticate } from "./hauthenticate.guard";

@Global()
@Module({})
export class HAuthCoreModule {
    constructor(@Inject(HAUTH_CONFIG) private readonly config: ServerConfig) {}

    public static forRoot(options: ServerConfig): DynamicModule {
        const modOptions = {
            provide: HAUTH_CONFIG,
            useValue: options,
        };

        return {
            module: HAuthCoreModule,
            providers: [
                modOptions,
            ],
            exports: [
                HAuthMiddleware,
                HAuthenticate,
            ]
        }
    }
}