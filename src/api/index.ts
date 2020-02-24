import {AbstractRoutes} from "../routing-utilities/AbstractRoutes";
import {PathRoute} from "../routing-utilities/PathRoute";
import {Route} from "../routing-utilities/Route";
import {AuthRoutes} from "./auth";
export class IndexRoute extends AbstractRoutes {
    initializePathRoutes(): PathRoute[] {
        return [
            new PathRoute('/auth', new AuthRoutes()),
        ];
    }

    initializeRoutes(): Route[] {
        return [];
    }


}
