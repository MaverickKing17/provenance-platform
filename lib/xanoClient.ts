import * as Sentry from "@sentry/react";

/**
 * Institutional Xano Fetch Wrapper
 * Handles specialized error propagation for the Global Error Boundary.
 */
export async function xanoFetch(url: string, options: RequestInit = {}) {
  // Requirement 4: Breadcrumbs for Xano API requests
  Sentry.addBreadcrumb({
    category: 'api',
    message: `Xano Request: ${options.method || 'GET'}`,
    data: {
      url,
      method: options.method || 'GET'
    },
    level: 'info',
  });

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    // Requirements specify throwing a specific error for 401 to be caught by Error Boundary
    if (response.status === 401) {
      throw new Error('Institutional Error 401: Unauthorized Access Detected');
    }
    if (response.status === 403) {
      throw new Error('Institutional Error 403: Forbidden Resource');
    }
    
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Fault: ${response.status}`);
  }

  return response.json();
}