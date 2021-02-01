import { Api } from "./core/api";
import { IAuthSummary } from "./interfaces/authSummary";
import { ServerConfig } from "./interfaces/serverConfig";
import { IUser } from "./interfaces/user";

export class HAuthServer {
    public readonly config: ServerConfig;
    public readonly api: Api;

    constructor(config: ServerConfig) {
        this.config = config;
        this.api = new Api(this.config.apiUrl);
    }

    public async getSelf(): Promise<IUser> {
        return await this.api.getSelf();
    }

    public async authorizeForOrg(privileges: string[]): Promise<IAuthSummary> {
        return await this.api.authorizeForOrg(this.config.organizationId, privileges);
    }

    public async authorizeForApp(privileges: string[]): Promise<IAuthSummary> {
        return await this.api.authorizeForApp(this.config.organizationId, this.config.applicationId, privileges);
    }

    public async authenticateForApp(): Promise<boolean> {
        return await this.api.authenticateForApp(this.config.organizationId, this.config.applicationId);
    }
}