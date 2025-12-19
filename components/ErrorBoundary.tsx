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
// Fix: Use React.Component explicitly to ensure proper property inheritance of state, props, and setState
export class ErrorBoundary extends React.Component<Props, State> {
  // Fix: Initialize state within the constructor after calling super(props) to ensure 'state' is correctly defined
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
  // Fix: ensure setState is correctly recognized as inherited from React.Component
  public reset = () => {
    this.setState({ hasError: false, error: null });
  };

  // Fix: props and state are now correctly recognized as members of the class via inheritance
  public render() {
    if (this.state.hasError && this.state.error) {
      // If an error is caught, render the specialized fallback UI (GlobalError)
      return <GlobalError error={this.state.error} reset={this.reset} />;
    }

    return this.props.children;
  }
}
