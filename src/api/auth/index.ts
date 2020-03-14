import {SignupV1} from "./signup/Signup.v1";
import {LoginV1} from "./login/Login.v1";
import {LogoutV1} from "./logout/Logout.v1";
import {AbstractRoutes, MethodRoutes} from "../../routing-utilities/AbstractRoutes";
import {Route} from "../../routing-utilities/Route";
import {PathRoute} from "../../routing-utilities/PathRoute";
import {GoogleAccess} from "./google/Google";

export class AuthRoutes extends AbstractRoutes {
    initializeRoutes(): Route[] {
        return [
            new Route(MethodRoutes.POST, '/signup', {'v1': new SignupV1()}),
            new Route(MethodRoutes.POST, '/login', {'v1': new LoginV1()}),
            new Route(MethodRoutes.POST, '/logout', {'v1': new LogoutV1()}, 'user'),
            new Route(MethodRoutes.POST, '/google', {'v1': new GoogleAccess()})
        ];
    }

    initializePathRoutes(): PathRoute[] {
        return [];
    }

}

