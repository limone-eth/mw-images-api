import {AbstractRoutes, MethodRoutes} from "../../routing-utilities/AbstractRoutes";
import {Route} from "../../routing-utilities/Route";
import {PathRoute} from "../../routing-utilities/PathRoute";
import {Upload} from "./upload/Upload";
import {Delete} from "./delete/Delete";
import {Retrieve} from "./retrieve/Retrieve";
import {Update} from "./update/Update";
import {Download} from "./download/download";

export class ImagesRoutes extends AbstractRoutes {
    initializeRoutes(): Route[] {
        return [
            new Route(MethodRoutes.GET, '/', {'v1': new Retrieve()}, "user"),
            new Route(MethodRoutes.POST, '/', {'v1': new Upload()}, "user"),
            new Route(MethodRoutes.PUT, '/:id', {'v1': new Update()}, "user"),
            new Route(MethodRoutes.DELETE, '/:id', {'v1': new Delete()}, "user"),
            new Route(MethodRoutes.GET, '/:id', {'v1': new Download()}),
        ];
    }

    initializePathRoutes(): PathRoute[] {
        return [];
    }

}
