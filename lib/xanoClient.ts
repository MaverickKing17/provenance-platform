
import * as Sentry from "@sentry/react";

/**
 * Institutional Cache Layer
 * Stores the last known good state of API responses for "Silent Fallback"
 */
const InstitutionalCache: Record<string, any> = {};

interface SelfHealingResponse<T> {
  data: T;
  status: 'LIVE' | 'STALE' | 'CACHED_FALLBACK';
  timestamp: number;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Verified Identity Check
 * Distinguishes between session expiry and environment configuration faults
 */
async function verifyIdentityNode() {
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('NEXT_PUBLIC_ALEX_TOKEN') : process.env.NEXT_PUBLIC_ALEX_TOKEN;
  if (!token) {
    Sentry.captureMessage("Identity Refresh Fault: NEXT_PUBLIC_ALEX_TOKEN is null or undefined.", "fatal");
    return false;
  }
  return true;
}

/**
 * Institutional Xano Fetch Wrapper (Self-Healing Edition)
 * Requirements: Exponential Backoff, Silent Failure, Identity Refresh
 */
export async function xanoFetch<T>(url: string, options: RequestInit = {}, retries = 3): Promise<SelfHealingResponse<T>> {
  const retryDelays = [1000, 2000, 4000];
  const currentAttempt = 3 - retries;

  try {
    Sentry.addBreadcrumb({
      category: 'api',
      message: `Xano Request Attempt ${currentAttempt + 1}: ${options.method || 'GET'}`,
      data: { url, method: options.method || 'GET' },
      level: 'info',
    });

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // Handle 401 Identity Refresh
    if (response.status === 401) {
      const isConfigured = await verifyIdentityNode();
      if (!isConfigured) {
        throw new Error('Institutional Configuration Fault: Environment variable ALEX_TOKEN missing.');
      }
      throw new Error('Institutional Error 401: Unauthorized Access Detected');
    }

    // Trigger Backoff for 500-level errors
    if (response.status >= 500 && retries > 0) {
      const delay = retryDelays[currentAttempt];
      console.warn(`System Volatility Detected. Initializing backoff sequence: ${delay}ms delay...`);
      await sleep(delay);
      return xanoFetch(url, options, retries - 1);
    }

    if (!response.ok) {
      throw new Error(`API Fault: ${response.status}`);
    }

    const data = await response.json();
    
    // Update Cache for Ghost Loading
    InstitutionalCache[url] = data;

    return {
      data,
      status: 'LIVE',
      timestamp: Date.now()
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown Fault';
    
    // Terminal Failure: Silent Fallback & Ghost Loading
    if (InstitutionalCache[url]) {
      Sentry.captureException(error, {
        level: 'warning',
        tags: { strategy: 'silent_fallback', url }
      });

      console.info(`Self-Healing Sequence Triggered: Serving cached fallback for ${url}`);
      
      return {
        data: InstitutionalCache[url],
        status: 'CACHED_FALLBACK',
        timestamp: Date.now()
      };
    }

    // If no cache exists and we are at terminal failure, we must log and propagate
    Sentry.captureException(error, { level: 'error' });
    throw error;
  }
}
