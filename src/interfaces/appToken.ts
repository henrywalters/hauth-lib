import { IApplication } from "./application";

export interface IAppToken {
    id: string;
    name: string;
    token: string;
    expiresOn?: string;
    application: IApplication;
}