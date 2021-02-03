import { Api } from "./core/api";
import { Tokens } from "./core/tokens";

export { HAuthClient } from "./client";
export { HAuthServer } from "./server";
export { HAuthModule } from "./nest/hauth.module";
export { HAuthMiddleware } from "./nest/hauth.middleware";
export { HAuthenticate } from "./nest/hauthenticate.guard";

const HAuthCore = {
    Api: Api,
    Tokens: Tokens,
}

export { HAuthCore };