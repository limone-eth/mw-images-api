import {AbstractRoutes} from "../routing-utilities/AbstractRoutes";
import {PathRoute} from "../routing-utilities/PathRoute";
import {Route} from "../routing-utilities/Route";
import {AuthRoutes} from "./auth";
import {UserRoutes} from "./users";
import {ImagesRoutes} from "./images";
export class IndexRoute extends AbstractRoutes {
    initializePathRoutes(): PathRoute[] {
        return [
            new PathRoute('/auth', new AuthRoutes()),
            new PathRoute('/users', new UserRoutes()),
            new PathRoute('/images', new ImagesRoutes()),
        ];
    }

    initializeRoutes(): Route[] {
        return [];
    }
}
