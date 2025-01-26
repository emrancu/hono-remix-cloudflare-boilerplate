
/**
 * API Routes
 *
 * This file defines the Hono API routes for the application.
 *
 * You can change the prefix for these routes in `bootstrap/App.ts`.
 * For example, if the prefix is set to `/api`, these routes will be accessible as:
 * - GET `/api/` -> Calls the `apiIndex` function
 * - GET `/api/set-session` -> Calls the `SessionSet` function
 */

import { Hono } from 'hono';
import {index as apiIndex, SessionSet} from '@/app/hono-api/ApiController'

export const router = new Hono();

router.get('/', apiIndex);
router.get('/set-session', SessionSet);
