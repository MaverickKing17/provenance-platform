import React, { Component, ErrorInfo, ReactNode } from 'react';
import GlobalError from '../error';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught institutional error:", error, errorInfo);
  }

  // Use the inherited setState method to clear the error state
  public reset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError && this.state.error) {
      return <GlobalError error={this.state.error} reset={this.reset} />;
    }

    // Access children through this.props as required in React class components
    return this.props.children;
  }
}
