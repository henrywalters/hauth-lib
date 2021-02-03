import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { ServerConfig } from "../interfaces/serverConfig";
import { HAuthServer } from "../server";

// HAuthenticate checks whether a user or app token is attached to request by Authentication middleware
@Injectable()
export class HAuthenticate implements CanActivate {

    private readonly server: HAuthServer;

    constructor(@Inject('HAUTH_CONFIG') options: ServerConfig) {
        this.server = new HAuthServer(options);
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        this.server.api.pipeAuth(request);

        try {
            return await this.server.authenticateForApp();
        } catch (e) {
            return false;
        }

        return true;
    }
}