// TODO - presunut do lib-ky
import {XUser} from "@michalrakus/x-react-web-lib/lib/serverApi/XUser";

// fieldy na sychronizaciu (zatial len username)
export interface XPostLoginRequest {
    username?: string;
}

export interface XPostLoginResponse {
    xUser?: XUser;
}
