 import {AxiosInstance} from "axios";
import { ApiResponse, HashMap } from "../interfaces/apiResponse";
import { IAuthSummary } from "../interfaces/authSummary";
import { ITokenSet } from "../interfaces/tokenSet";
const axios = require("axios").default;
import { IUser } from "../interfaces/user";
import { IAppToken } from "../interfaces/appToken";
import { Request } from 'express';
import Path from "hcore/dist/path";
import { PathParameterMap } from "hcore/dist/pathParameters";

export enum ApiEndpoints {
    Self = 'self',
    Login = 'login',
    Logout = 'logout',
    Refresh = 'refresh',
    AuthorizeForOrg = 'organization/:orgId/authorize',
    AuthorizeForApp = 'organization/:orgId/application/:appId/authorize',
    AuthenticateForApp = 'organization/:orgId/application/:appId/authenticate',
}

export class Api {

    public http: AxiosInstance;
    public readonly url: string;

    constructor(url: string) {
        this.url = url;
        if (!this.url || this.url.trim().length === 0) {
            throw new Error("Invalid URL");
        }
        if (this.url[this.url.length - 1] !== '/') {
            this.url += '/';
        }
        this.http = axios.create({
            baseURL: this.url,
        });
    }

    public setAppToken(token: string) {
        this.http.defaults.headers.common['Authorization'] = "App " + token;
    }

    public setBearerToken(token: string) {
        this.http.defaults.headers.common["Authorization"] = "Bearer " + token;
    }

    // Pipes the authorization header to the HTTP client for it to auth with
    public pipeAuth(req: Request) {
        console.log(req.headers);
        if (req.headers.hasOwnProperty('authorization')) {
            this.http.defaults.headers.common["Authorization"] = req.headers.authorization;
        }
    }

    public getRoute(endpoint: ApiEndpoints, params: PathParameterMap = {}) {
        const path = new Path(endpoint, params);
        return path.path;
    }

    public async logout(): Promise<void> {
        await this.http.post(ApiEndpoints.Logout);
    }

    public async refresh(refreshToken: string): Promise<ITokenSet> {
        const res = (await this.http.post(ApiEndpoints.Refresh, {refreshToken})).data as ApiResponse<ITokenSet, HashMap<string>>;
        if (res.success === true) {
            return res.result;
        }

        throw new Error("Failed to refresh: " + res.error);
    }

    public async getSelf(): Promise<IUser | IAppToken> {
        const res = (await this.http.get(ApiEndpoints.Self)).data;

        if (res.success === true) {
            return res.result;
        }

        throw new Error("Failed to get self: " + res.error);
    }

    public async authenticateForApp(orgId: string, appId: string): Promise<boolean> {
        const res = (await this.http.post(this.getRoute(ApiEndpoints.AuthenticateForApp, {orgId, appId}))).data;
        return res.success;
    }

    public async authorizeForOrg(orgId: string, privileges: string[]): Promise<IAuthSummary> {
        const res = (await this.http.post(this.getRoute(ApiEndpoints.AuthorizeForOrg, {orgId}), {privileges})).data;

        if (res.success === true) {
            return res.result;
        }

        throw new Error("Failed to authorize for org: " + res.error);
    }

    public async authorizeForApp(orgId: string, appId: string, privileges: string[]): Promise<IAuthSummary> {
        const res = (await this.http.post(this.getRoute(ApiEndpoints.AuthorizeForApp, {orgId, appId}), {privileges})).data;

        if (res.success === true) {
            return res.result;
        }

        throw new Error("Failed to authorize for org: " + res.error);
    }

}