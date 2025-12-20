
import * as Sentry from "@sentry/react";

const InstitutionalCache: Record<string, any> = {};

interface SelfHealingResponse<T> {
  data: T;
  status: 'LIVE' | 'STALE' | 'CACHED_FALLBACK';
  timestamp: number;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const triggerToast = (message: string) => {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-10 left-1/2 -translate-x-1/2 z-[999] bg-brand-navy border border-brand-gold/50 text-brand-gold px-8 py-4 rounded-2xl shadow-2xl font-black text-xs uppercase tracking-widest animate-in fade-in slide-in-from-bottom-4';
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
};

export async function apiClient<T>(url: string, options: RequestInit = {}, retries = 3): Promise<SelfHealingResponse<T>> {
  const retryDelays = [1000, 2000, 4000]; // Requirement: 1s, 2s, 4s
  const currentAttempt = 3 - retries;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // Handle 401: Re-authenticating logic
    if (response.status === 401) {
      triggerToast('Re-authenticating...');
      // Brief pause to check for a fresh session/token (simulated)
      await sleep(1500);
      const freshToken = localStorage.getItem('NEXT_PUBLIC_ALEX_TOKEN');
      if (!freshToken) {
        window.location.href = '#/unauthorized';
        throw new Error('401: Redirecting to Unauthorized perimeter.');
      }
      // If we had a way to refresh, we would here. For now, redirect.
    }

    // Exponential Backoff for 500-errors
    if (response.status >= 500 && retries > 0) {
      const delay = retryDelays[currentAttempt];
      console.warn(`System Fault Detected. Retrying in ${delay}ms...`);
      await sleep(delay);
      return apiClient(url, options, retries - 1);
    }

    if (!response.ok) throw new Error(`API Fault: ${response.status}`);

    const data = await response.json();
    InstitutionalCache[url] = data;

    return { data, status: 'LIVE', timestamp: Date.now() };
  } catch (error) {
    if (InstitutionalCache[url]) {
      return { data: InstitutionalCache[url], status: 'CACHED_FALLBACK', timestamp: Date.now() };
    }
    throw error;
  }
}
