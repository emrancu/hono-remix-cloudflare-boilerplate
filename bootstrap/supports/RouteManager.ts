// RouteBuilder.ts

type RouteDefinition = {
  path: string;
  file: string;
  middlewares: Array<any>
}

class RouteBuilder {
  private routes: RouteDefinition[] = [];
  private parentPaths: string[] = [];
  private parentMiddlewares: Array<Array<any>> = [];

  Route(path: string, fileOrCallback: string | (() => void), middlewares: Array<any> = []) {
    const currentPath = this.buildFullPath(path);
    const currentMiddlewares = [
      ...this.parentMiddlewares.flat(),
      ...middlewares
    ];

    if (typeof fileOrCallback === 'string') {
      this.routes.push({
        path: currentPath,
        file: fileOrCallback,
        middlewares: currentMiddlewares
      });
    } else {
      this.parentPaths.push(currentPath);
      this.parentMiddlewares.push(middlewares);  // Push current middlewares
      fileOrCallback();
      this.parentMiddlewares.pop();  // Pop after children are processed
      this.parentPaths.pop();
    }
  }

  private buildFullPath(path: string): string {
    const normalized = path.startsWith('/') ? path : `/${path}`;
    if (this.parentPaths.length === 0) {
      return normalized;
    }

    const fullPath = `${this.parentPaths.join('')}${normalized}`;
    // Remove any double slashes
    return fullPath.replace(/\/+/g, '/');
  }

  getRoutes(loadWebRoute: boolean = false): RouteDefinition[] {
    if(loadWebRoute){
      require("./../../routes/remix");
    }

    return this.routes;
  }

  // New method to get routes with minimal information
  getSimpleRoutes(): Array<{path: string, file: string}> {
    return this.routes.map(route => ({
      path: route.path,
      file: route.file
    }));
  }

  // New method to get routes with middlewares
  getMiddlewareRoutes(): Array<{path: string, middlewares: Array<any>}> {
    return this.routes
        .filter(route => route.middlewares.length > 0)
        .map(route => ({
          path: route.path,
          middlewares: route.middlewares
        }));
  }


  matchMiddlewares(requestPath: string): Array<any> {
    // Normalize the path to remove trailing slashes and ensure leading slash
    const normalizedPath = this.normalizePath(requestPath);

    // Find all routes with middlewares that match the path
    return this.routes
        .filter(route => {
          return route.middlewares.length > 0 && (
              // Exact path match
              this.normalizePath(route.path) === normalizedPath ||
              // Parameter-based match
              this.isParameterMatch(route.path, normalizedPath)
          );
        })
        .flatMap(route => route.middlewares);
  }

  // Normalize path for consistent comparison
  private normalizePath(path: string): string {
      if(!path){
        return  ''
      }

    // Remove trailing slashes, ensure leading slash
    return `/${path.replace(/^\/+|\/+$/g, '')}`;
  }

  // Check if a route with parameters matches the request path
  private isParameterMatch(routePath: string, requestPath: string): boolean {
    // Split paths into segments
    const routeSegments = this.normalizePath(routePath).split('/').filter(Boolean);
    const requestSegments = requestPath.split('/').filter(Boolean);

    // Must have same number of segments, or route path must have more due to parameters
    if (requestSegments.length !== routeSegments.length) return false;

    return routeSegments.every((segment, index) => {
      // Parameter segment (starts with :)
      if (segment.startsWith(':')) return true;

      // Exact match for non-parameter segments
      return segment === requestSegments[index];
    });
  }
}

// Create a singleton instance
const builder = new RouteBuilder();
export const Route = builder.Route.bind(builder);

export const getRoutes = (loadWebRoute: boolean = false) => builder.getRoutes(loadWebRoute);
export const getSimpleRoutes = () => builder.getSimpleRoutes();
export const getMiddlewareRoutes = () => builder.getMiddlewareRoutes();
export const matchMiddlewares = (path: string) => builder.matchMiddlewares(path);