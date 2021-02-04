import { Injectable } from "@nestjs/common";
import { Api } from "../core/api";
import { ServerConfig } from "../interfaces/serverConfig";
import { HAuthServer } from "../server";

export const HAUTH_ENV_PREFIX = 'HAUTH';

export const HAUTH_CONFIG_ENV_VARIABLES = {
    applicationId: [
        'APP_ID',
        'APPLICATION_ID',
    ],
    organizationId: [
        'ORG_ID',
        'ORGANIZATION_ID',
    ],
    apiUrl: [
        'API_URL',
    ]
}

@Injectable()
export class HAuthService {

    private config: ServerConfig;
    public readonly server: HAuthServer;

    constructor() {
        this.loadConfig();
        this.server = new HAuthServer(this.config);
    }

    private envVarName(varName: string) {
        return HAUTH_ENV_PREFIX + "_" + varName;
    }

    private loadConfig() {
        this.config = {
            applicationId: '',
            organizationId: '',
            apiUrl: '',
        }

        const missing = [];

        for (const key of Object.keys(HAUTH_CONFIG_ENV_VARIABLES)) {
            let found = false;
            for (const varName of HAUTH_CONFIG_ENV_VARIABLES[key]) {
                if (process.env[this.envVarName(varName)]) {
                    found = true;
                    this.config[key] = process.env[this.envVarName(varName)];
                    break;
                }
            }

            if (!found) {
                missing.push(key);
            }
        }

        if (missing.length > 0) {
            throw new Error("Missing the following environment variables: " + missing.map((key) => {
                return `${key} (${HAUTH_CONFIG_ENV_VARIABLES[key].map(e => this.envVarName(e)).join(' or ')})`;
            }).join(', '));
        }
    }   
}