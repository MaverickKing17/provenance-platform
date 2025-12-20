'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import GlobalError from '../error';

// Props interface for strict type checking
interface Props {
  children?: ReactNode;
}

// State interface to match the signature expected by the fallback UI and React's error boundary requirements
interface State {
  hasError: boolean;
  error: (Error & { digest?: string }) | null;
}

/**
 * ErrorBoundary component that catches runtime errors in the component tree.
 * Provides a specialized fallback UI for institutional system faults.
 */
// Explicitly extend Component to ensure inheritance is correctly resolved by the compiler
export class ErrorBoundary extends Component<Props, State> {
  // Initialize state property explicitly to provide a stable base state
  public state: State = {
    hasError: false,
    error: null
  };

  constructor(props: Props) {
    super(props);
  }

  /**
   * Static lifecycle method used to update state after an error has been caught.
   * Required for class-based Error Boundaries in React.
   */
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error as (Error & { digest?: string }) };
  }

  /**
   * Lifecycle method called after an error is thrown by a descendant component.
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error for executive observability and debugging
    console.error("Uncaught institutional error:", error, errorInfo);
  }

  /**
   * Resets the error boundary state to allow re-rendering of children.
   * This is passed as a callback to the GlobalError component.
   */
  public reset = (): void => {
    // Use setState from the Component base class to clear the error state
    this.setState({ hasError: false, error: null });
  };

  public render(): ReactNode {
    // Access current error state from the Component instance state
    const { hasError, error } = this.state;
    if (hasError && error) {
      // If an error is caught, render the specialized fallback UI (GlobalError)
      return <GlobalError error={error} reset={this.reset} />;
    }

    // Return children from the Component instance props
    return this.props.children;
  }
}
