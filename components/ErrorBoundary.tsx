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
// Fix: Extending Component directly to resolve issues with property inheritance recognition in some environments
export class ErrorBoundary extends Component<Props, State> {
  // Fix: Initializing state in the constructor to guarantee proper base class initialization
  constructor(props: Props) {
    super(props);
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
    return { hasError: true, error };
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
  public reset = () => {
    // Fix: Explicitly calling this.setState inherited from Component
    this.setState({ hasError: false, error: null });
  };

  public render() {
    // Fix: Using this.state and this.props inherited from Component
    if (this.state.hasError && this.state.error) {
      // If an error is caught, render the specialized fallback UI (GlobalError)
      return <GlobalError error={this.state.error} reset={this.reset} />;
    }

    return this.props.children;
  }
}
