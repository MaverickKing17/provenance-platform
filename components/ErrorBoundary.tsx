import React, { ErrorInfo, ReactNode } from 'react';
import GlobalError from '../error';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

// Fixed: Explicitly extend React.Component to ensure access to setState and props
// This addresses the error where property 'setState' and 'props' were not recognized
export class ErrorBoundary extends React.Component<Props, State> {
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
    // Fixed: Explicit access to inherited setState
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError && this.state.error) {
      // If an error is caught, render the specialized fallback UI
      return <GlobalError error={this.state.error} reset={this.reset} />;
    }

    // Fixed: Properly access children through this.props as required in React class components
    return this.props.children;
  }
}
