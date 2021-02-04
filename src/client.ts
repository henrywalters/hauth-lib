import { Api } from "./core/api";
import { Tokens } from "./core/tokens";
import { ApiResponse } from "./interfaces/apiResponse";
import { IAppToken } from "./interfaces/appToken";
import { IAuthSummary } from "./interfaces/authSummary";
import { ClientConfig } from "./interfaces/clientConfig";
import { ITokenSet } from "./interfaces/tokenSet";
import { IUser } from "./interfaces/user";

const POPUP_PING_DELAY = 100;

export class HAuthClient {

    public readonly config: ClientConfig;
    public readonly tokens: Tokens;
    public readonly api: Api;

    constructor(config: ClientConfig) {
        this.config = config;
        this.tokens = new Tokens(config.applicationId);
        this.api = new Api(config.apiUrl);
    }

    public async triggerLoginWindow(): Promise<ITokenSet> {
        return new Promise<ITokenSet>((res, rej) => {
            let url = `${this.config.loginUrl}/login?oid=${this.config.organizationId}&aid=${this.config.applicationId}`;
            const loginWindow = window.open(url, 'HAuth Login', 'width=560,height=800,toolbar=0,menubar=0,location=0');
            
            const timer = setInterval(() => {
                if (loginWindow.closed) {
                    clearInterval(timer);
                    rej("User closed window");
                }
            }, POPUP_PING_DELAY)
            
            window.addEventListener('message', (e: MessageEvent) => {
                clearInterval(timer);
                res(e.data);
            })

            window.addEventListener('onmessage', (e: MessageEvent) => {
                clearInterval(timer);
                res(e.data)
            })
        })
    }

    public async login(): Promise<ITokenSet> {
        const res = await this.triggerLoginWindow();
        this.tokens.setTokens(res);
        this.api.setBearerToken(res.accessToken);
        return res;
    }

    public async logout(): Promise<void> {
        await this.api.logout();
        this.tokens.clearTokens();
        this.api.setBearerToken('');
    }

    public async refresh() {
        const tokens = await this.api.refresh(this.tokens.getRefresh());
        this.tokens.setTokens(tokens);
        this.api.setBearerToken(tokens.accessToken);
    }

    public async getSelf(): Promise<IUser | IAppToken> {
        return await this.api.getSelf();
    }

    public async authorizeForOrg(privileges: string[]): Promise<IAuthSummary> {
        return await this.api.authorizeForOrg(this.config.organizationId, privileges);
    }

    public async authorizeForApp(privileges: string[]): Promise<IAuthSummary> {
        return await this.api.authorizeForApp(this.config.organizationId, this.config.applicationId, privileges);
    }
}