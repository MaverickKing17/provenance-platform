
import React, { Component, ErrorInfo, ReactNode } from 'react';
import GlobalError from '../error';

// Fix: Made children optional to satisfy JSX type checking when used as a wrapper
interface Props {
  children?: ReactNode;
}

// Fix: Refined error type to match the expected signature in GlobalError (Error with optional digest)
interface State {
  hasError: boolean;
  error: (Error & { digest?: string }) | null;
}

/**
 * ErrorBoundary component that catches runtime errors in the component tree.
 * Explicitly using Component base class to ensure inherited properties like props and setState are correctly recognized.
 */
// Fix: Inherited from Component directly to ensure TypeScript correctly identifies the class as a React component
export class ErrorBoundary extends Component<Props, State> {
  // Fix: Explicitly declare state property to resolve "Property 'state' does not exist" errors in some strict environments
  public state: State = {
    hasError: false,
    error: null
  };

  // Use constructor for state initialization to assist some TypeScript environments with inheritance tracking
  constructor(props: Props) {
    super(props);
  }

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
    // Fix: Using setState inherited from Component to resolve "Property 'setState' does not exist" error
    this.setState({ hasError: false, error: null });
  };

  public render() {
    // Fix: Using state inherited from Component to resolve "Property 'state' does not exist" error
    if (this.state.hasError && this.state.error) {
      // If an error is caught, render the specialized fallback UI
      return <GlobalError error={this.state.error} reset={this.reset} />;
    }

    // Fix: Correctly access children through props inherited from Component to resolve "Property 'props' does not exist" error
    return this.props.children;
  }
}
