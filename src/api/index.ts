import {AbstractRoutes} from "../routing-utilities/AbstractRoutes";
import {PathRoute} from "../routing-utilities/PathRoute";
import {Route} from "../routing-utilities/Route";
import {AuthRoutes} from "./auth";
import {UserRoutes} from "./users";
export class IndexRoute extends AbstractRoutes {
    initializePathRoutes(): PathRoute[] {
        return [
            new PathRoute('/auth', new AuthRoutes()),
            new PathRoute('/users', new UserRoutes())
        ];
    }

    initializeRoutes(): Route[] {
        return [];
    }


}
