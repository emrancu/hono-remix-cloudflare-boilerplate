 
# Hono + Remix Cloudflare Boilerplate

A boilerplate for building scalable serverless apps on Cloudflare Workers with Hono and Remix. Key features include middleware support for Remix routes, seamless Cloudflare KV storage (also for Session) integration. Comes with example API routes, Remix pages, and a clean, modular file structure for effortless development.
## Features

- **Hono Framework**: For API routes and middleware handling.
- **Remix Integration**: Simplified route management with edge-optimized rendering.
- **Cloudflare KV Support**: Seamless KV storage integration for persistent data and also as session driver.
- **Middleware for Remix**: Add custom middleware for specific or grouped routes for Remix.
- **Edge-Ready**: Optimized for performance on Cloudflare’s edge infrastructure.

## Project Structure

```plaintext
.
├── app
│   ├── hono-api       # API controllers for Hono routes
│   ├── remix          # Remix pages and components
│   │   ├── components # Shared UI components
│   │   ├── pages      # Remix pages
│   │   └── styles.css # Global styles
├── bootstrap          # Application bootstrap and middleware logic
│   ├── abstraction    # Abstract utility class
│   ├── constants      # Configuration constants
│   ├── middlewares    # Middleware definitions
│   ├── supports       # Supporting/utility class
├── config             # Configuration files
├── routes             # Hono and remix route definitions
├── public             # Static assets
├── functions          # Cloudflare Worker functions
├── server.ts          # Application server entry point
├── wrangler.toml      # Cloudflare Wrangler configuration
```

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

---

## Setup

1. **Configure Cloudflare KV**:
    - Update the `wrangler.toml` file with your KV namespace ID:

      ```toml
      [[kv_namespaces]]
      binding = "MY_KV_NAMESPACE" # Replace with your KV namespace
      id = "<YOUR_KV_NAMESPACE_ID>"
      ```

2. **Set Environment Variables**:
    - Add any required environment variables in your `config/app.ts` file.

3. **Define Routes**:
    - Add **Remix routes** in the `routes/remix.ts`.

    Example Remix route:
   ```javascript

    Route('/', './app/remix/pages/Index.tsx');
    
    Route('/kv-session', './app/remix/pages/Session.tsx');
    Route('/kv', './app/remix/pages/KV.tsx');
    
    Route('/protected-area', () => {
    
        Route('/json-api/:name?', 'app/remix/pages/JsonApi.ts');
    
    }, ['@/bootstrap/middlewares/TestMiddleware']);
    ```

  - Add **Hono API routes** in the `routes/api.ts` file.

    Example API route:
    ```typescript
    import { Hono } from 'hono';
    import {index as apiIndex, SessionSet} from '@/app/hono-api/ApiController'
    
    export const router = new Hono();
    
    router.get('/', apiIndex);
    router.get('/set-session', SessionSet);

    ```

4. **Add Middleware**:
    - Define custom middleware in `bootstrap/middlewares`.

      Example Middleware:
      ```typescript
      export const TestMiddleware = async (ctx, next) => {
          console.log('Middleware triggered');
          await next();
      };
      ```

---

## Running the Application

1. Start the development server:

   ```bash
   npm run dev
   ``` 

2. Deploy to Cloudflare:

   ```bash
   npm run deploy
   ```

---

 

## Scripts

- **`npm run dev`**: Starts the local development server with `miniflare`.
- **`npm run build`**: Builds the project for production.
- **`npm run deploy`**: Deploys the application to Cloudflare Workers.

---

## License

This project is licensed under the MIT License. Feel free to use it for your own projects.