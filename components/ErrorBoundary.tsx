
import React, { ErrorInfo, ReactNode } from 'react';
import GlobalError from '../error';

// Fix: Defined Props interface for strict type checking
interface Props {
  children?: ReactNode;
}

// Fix: Refined State interface to match the signature expected by the fallback UI and React's error boundary requirements
interface State {
  hasError: boolean;
  error: (Error & { digest?: string }) | null;
}

/**
 * ErrorBoundary component that catches runtime errors in the component tree.
 * Provides a specialized fallback UI for institutional system faults.
 */
// Fix: Explicitly extending React.Component to ensure props and setState are correctly inherited and recognized by the type checker.
export class ErrorBoundary extends React.Component<Props, State> {
  // Fix: State initialization as a class property ensures it is correctly recognized as part of the component's state.
  public state: State = {
    hasError: false,
    error: null
  };

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
  // Fix: Defined as an arrow function to preserve 'this' context for calling setState, which is now available via React.Component.
  public reset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    // Fix: Accessing state from the instance to check for errors.
    if (this.state.hasError && this.state.error) {
      // If an error is caught, render the specialized fallback UI (GlobalError)
      return <GlobalError error={this.state.error} reset={this.reset} />;
    }

    // Fix: Accessing children from props which are now correctly inherited from React.Component.
    return this.props.children;
  }
}
