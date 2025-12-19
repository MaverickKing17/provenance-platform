
import React, { ErrorInfo, ReactNode } from 'react';
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
 * Explicitly using React.Component to ensure inherited properties like props and setState are correctly recognized.
 */
export class ErrorBoundary extends React.Component<Props, State> {
  // Use constructor for state initialization to assist some TypeScript environments with inheritance tracking
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
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
    // Fixed: Explicitly using this.setState inherited from React.Component
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError && this.state.error) {
      // If an error is caught, render the specialized fallback UI
      return <GlobalError error={this.state.error} reset={this.reset} />;
    }

    // Fixed: Correctly access children through this.props inherited from React.Component
    return this.props.children;
  }
}
