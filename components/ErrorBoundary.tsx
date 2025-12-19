import React, { Component, ErrorInfo, ReactNode } from 'react';
import GlobalError from '../error';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary component that catches runtime errors in the component tree.
 * Explicitly extends Component from React to ensure inherited properties are recognized.
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  /**
   * Static lifecycle method used to update state after an error has been caught.
   */
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error for observability
    console.error("Uncaught institutional error:", error, errorInfo);
  }

  /**
   * Resets the error boundary state to allow re-rendering of children.
   * This method is provided as a callback to the fallback error UI.
   */
  public reset = () => {
    // Fix for line 39: Accessing inherited setState from the Component base class
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError && this.state.error) {
      // If an error is caught, render the specialized fallback UI
      return <GlobalError error={this.state.error} reset={this.reset} />;
    }

    // Fix for line 49: Accessing children through this.props as required in React class components
    return this.props.children;
  }
}
