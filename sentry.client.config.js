import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      // Requirement 5: Privacy - Mask All Text by default
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // Tracing configuration
  tracesSampleRate: 1.0,

  // Requirement 3: Session Replay at 10% sample rate
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Requirement 4: Ensure console logs are captured (Sentry does this by default, but we can configure it)
  beforeBreadcrumb(breadcrumb) {
    if (breadcrumb.category === 'console') {
      return breadcrumb;
    }
    return breadcrumb;
  }
});
