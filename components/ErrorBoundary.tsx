'use client';

import React, { ErrorInfo, ReactNode } from 'react';
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
// Fix: Use React.Component to ensure inheritance properties like state, setState, and props are correctly identified by the compiler.
export class ErrorBoundary extends React.Component<Props, State> {
  // Initialize state via constructor to guarantee the instance is correctly initialized with the React Component lifecycle.
  constructor(props: Props) {
    super(props);
    // Fix: Explicitly initializing state inherited from React.Component to satisfy the compiler.
    this.state = {
      hasError: false,
      error: null
    };
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
  // Binding the reset method to the class instance to maintain correct 'this' context.
  public reset = (): void => {
    // Fix: Using setState inherited from React.Component.
    this.setState({ hasError: false, error: null });
  };

  public render(): ReactNode {
    // Fix: Accessing state inherited from the React.Component class.
    const { hasError, error } = this.state;
    if (hasError && error) {
      // If an error is caught, render the specialized fallback UI (GlobalError)
      return <GlobalError error={error} reset={this.reset} />;
    }

    // Fix: Accessing children from props inherited from the React.Component class.
    return this.props.children;
  }
}
