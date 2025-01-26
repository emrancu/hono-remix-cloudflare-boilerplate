import {Route} from '../bootstrap/supports/RouteManager'

/**
 * Registers a route to a Remix page.
 * 
 * The `filePath` parameter should be a path relative to the `./app/remix` or `app/remix` directory.
 * This means you only need to provide the path inside the `app/remix` folder, e.g.:
 * - `'pages/Index.tsx'`
 * - `'pages/OtherPage.tsx'`
 * 
 * @param {string} route - The URL route (e.g., `"/"`).
 * @param {string} filePath - The file path relative to the `./app/remix` directory (e.g., `"app/remix/pages/Index.tsx"`).
 */


Route('/', './app/remix/pages/Index.tsx');

Route('/kv-session', './app/remix/pages/Session.tsx');
Route('/kv', './app/remix/pages/KV.tsx');

Route('/protected-area', () => {

    Route('/json-api/:name?', 'app/remix/pages/JsonApi.ts');

}, ['@/bootstrap/middlewares/TestMiddleware']);
