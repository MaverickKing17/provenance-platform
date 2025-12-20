
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
// Explicitly extending React.Component helps resolve property access issues like setState and props in certain TypeScript environments.
export class ErrorBoundary extends React.Component<Props, State> {
  // Initialize state via constructor to guarantee the instance is correctly initialized with the React Component lifecycle.
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
  // Binding the reset method to the class instance to maintain correct 'this' context.
  public reset = (): void => {
    // Standard access to the inherited setState method.
    this.setState({ hasError: false, error: null });
  };

  public render(): ReactNode {
    // Accessing state and props inherited from the React.Component base class.
    const { hasError, error } = this.state;
    if (hasError && error) {
      // If an error is caught, render the specialized fallback UI (GlobalError)
      return <GlobalError error={error} reset={this.reset} />;
    }

    // Accessing children from props which is inherited from the base class.
    return this.props.children;
  }
}
