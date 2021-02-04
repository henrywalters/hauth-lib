import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { ServerConfig } from "../interfaces/serverConfig";
import { HAuthServer } from "../server";
import { HAuthService } from "./hauth.service";

// HAuthenticate checks whether a user or app token is attached to request by Authentication middleware
@Injectable()
export class HAuthenticate implements CanActivate {

    constructor() {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const service = new HAuthService();
        service.server.api.pipeAuth(request);

        try {
            return await service.server.authenticateForApp()
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}

@Injectable()
export class HAuthorize implements CanActivate {

    private privileges: string[];

    constructor(...privileges: string[]) {
        this.privileges = privileges;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const service = new HAuthService();
        service.server.api.pipeAuth(request);

        try {
            const res = await service.server.authorizeForApp(this.privileges);
            console.log(res);
            return res.failed.length === 0;
        } catch {
            return false;
        }
    }
}