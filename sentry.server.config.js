import * as Sentry from "@sentry/react";

// Note: In a pure client SPA, this file acts as a placeholder 
// for consistency with the requested Next.js architecture.
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
