import {AbstractRoutes, MethodRoutes} from "../../routing-utilities/AbstractRoutes";
import {Route} from "../../routing-utilities/Route";
import {PathRoute} from "../../routing-utilities/PathRoute";
import { GetAll } from "./getall/GetAll";
import { GetById } from "./getbyid/GetById";

export class UserRoutes extends AbstractRoutes {
    initializeRoutes(): Route[] {
        return [
            new Route(MethodRoutes.GET, '/', {'v1': new GetAll()}, "user"),
            new Route(MethodRoutes.GET, '/:id', {'v1': new GetById()}, "user")
        ];
    }

    initializePathRoutes(): PathRoute[] {
        return [];
    }

}