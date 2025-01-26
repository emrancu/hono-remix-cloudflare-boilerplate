# Hono + Remix Cloudflare Boilerplate Features

A boilerplate for building scalable serverless apps on Cloudflare Workers with Hono and Remix. Below is a detailed list of features:

---

## **Core Features**

1. **Hono Framework**
   - Lightweight and fast framework for building API routes and middleware.
   - Optimized for serverless environments like Cloudflare Workers.

2. **Remix Integration**
   - Simplified route management with edge-optimized rendering.
   - Seamless integration with Hono for hybrid serverless applications.

3. **Cloudflare KV Support**
   - Built-in integration with Cloudflare KV for persistent data storage.
   - KV is used as a session driver for managing user sessions.

4. **Middleware for Remix Routes**
   - Add custom middleware for specific or grouped Remix routes.
   - Middleware can be used for authentication, logging, or other custom logic.

5. **Modular File Structure**
   - Clean and organized project structure for effortless development.
   - Separation of concerns with dedicated folders for API controllers, Remix pages, middleware, and utilities.

6. **Ready-to-Use Boilerplate**
   - Comes with example API routes, Remix pages, and middleware.
   - Just clone, configure, and start building your application.

---

## **Project Structure**

```plaintext
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
├── routes             # Hono and Remix route definitions
├── public             # Static assets
├── functions          # Cloudflare Worker functions
├── server.ts          # Application server entry point
├── wrangler.toml      # Cloudflare Wrangler configuration
```

---


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/emrancu/hono-remix-cloudflare-boilerplate
   cd hono-remix-cloudflare-boilerplate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---

## **Key Features in Detail**

### **1. Hono API Routes**
- Define API routes using Hono's lightweight router.
- Example API route:
  ```typescript
  import { Hono } from 'hono';
  import { index as apiIndex, SessionSet } from '@/app/hono-api/ApiController';

  export const router = new Hono();
  router.get('/', apiIndex);
  router.get('/set-session', SessionSet);
  ```

### **2. Remix Pages and Routes**
- Simplified route management for Remix pages.
- Example Remix route:
  ```javascript
  Route('/', './app/remix/pages/Index.tsx');
  Route('/kv-session', './app/remix/pages/Session.tsx');
  Route('/kv', './app/remix/pages/KV.tsx');
  ```

### **3. Middleware Support**
- Add custom middleware for Remix or Hono routes.
- Example middleware:
  ```typescript
  export const TestMiddleware = async (ctx, next) => {
      console.log('Middleware triggered');
      await next();
  };
  ```

### **4. Cloudflare KV Integration**
- Use Cloudflare KV for persistent data storage or session management.
- Configure KV in `wrangler.toml`:
  ```toml
  [[kv_namespaces]]
  binding = "MY_KV_NAMESPACE" # Replace with your KV namespace
  id = "<YOUR_KV_NAMESPACE_ID>"
  ```

### **5. Environment Configuration**
- Easily manage environment variables in `config/app.ts`.
- Example:
  ```typescript
  export const ENV = {
      KV_NAMESPACE: process.env.KV_NAMESPACE,
      SESSION_SECRET: process.env.SESSION_SECRET,
  };
  ```

### **6. Static Assets**
- Serve static assets from the `public` folder.
- Middleware for static asset registration is included.

### **7. Development and Deployment Scripts**
- **`npm run dev`**: Start the local development server with `miniflare`.
- **`npm run build`**: Build the project for production.
- **`npm run deploy`**: Deploy the application to Cloudflare Workers.

---

## **Optional Features**

### **1. Disable KV Integration**
- If you don't need KV, comment out the `KvSession` middleware in `config/app.ts`:
  ```typescript
  middlewares: [
     // KvSession,
     StaticAssetsRegister,
     RemixMiddleware,
     RemixRegister,
  ]
  ```

### **2. Disable Remix Middleware**
- If you don't need middleware for Remix routes, comment out `RemixMiddleware`:
  ```typescript
  middlewares: [
      KvSession,
      StaticAssetsRegister,
     // RemixMiddleware,
      RemixRegister,
  ]
  ```

---


## Demo

Check out the live demo: [https://hono-remix-cloudflare-boilerplate.pages.dev](https://hono-remix-cloudflare-boilerplate.pages.dev)

---

## Support

If you find this project helpful, please consider giving it a ⭐️ **Star on GitHub** and following me on **Twitter** for updates and more projects:

- [⭐️ Star on GitHub](https://github.com/emrancu/hono-remix-cloudflare-boilerplate)
- [🐦 Follow me on Twitter](https://x.com/ALEMRANCU)

Your support motivates me to keep building and sharing open-source projects! 🚀


## Contributions Welcome

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your commit message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a **Pull Request** and describe your changes.

For major changes, please open an issue first to discuss what you'd like to add or improve.

--- 

## **License**
This project is licensed under the **MIT License**. Feel free to use, modify, and distribute it for your own projects.

---

This boilerplate is designed to help you quickly build and deploy scalable serverless applications on Cloudflare Workers with Hono and Remix. Happy coding! 🚀

 