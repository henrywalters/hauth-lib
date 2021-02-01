import * as Cookies from 'js-cookie';
import { ITokenSet } from '../interfaces/tokenSet';

export enum TokenType {
    Access = 'ACCESS_TOKEN',
    Refresh = 'REFRESH_TOKEN',
}

export class Tokens {

    private appId;

    constructor(appId: string) {
        this.appId = appId;
    }

    public hashKey(key: string) {
        return window.btoa(`${this.appId}-${key}`);
    }

    public setAccess(access: string) {
        Cookies.set(this.hashKey(TokenType.Access), access);
    }

    public setRefresh(refresh: string) {
        Cookies.set(this.hashKey(TokenType.Refresh), refresh);
    }

    public getAccess() {
        return Cookies.get(this.hashKey(TokenType.Access));
    }

    public getRefresh() {
        return Cookies.get(this.hashKey(TokenType.Refresh));
    }

    public clearTokens() {
        this.clearAccess();
        this.clearRefresh();
    }

    public clearAccess() {
        Cookies.remove(this.hashKey(TokenType.Access));
    }

    public clearRefresh() {
        Cookies.remove(this.hashKey(TokenType.Refresh));
    }

    public setTokens(set: ITokenSet) {
        this.setAccess(set.accessToken);
        this.setRefresh(set.refreshToken);
    }

    public hasTokens(): boolean {
        const access = this.getAccess();
        const refresh = this.getRefresh();

        return !!access && !!refresh;
    }

    public getTokens(): ITokenSet {
        return {
            accessToken: this.getAccess(),
            refreshToken: this.getRefresh(),
        }
    }

}