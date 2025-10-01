import React, { ErrorInfo, ReactNode } from "react";
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Oops! Something went wrong</h2>
          {/* tipe 'error': 'Error | null' */}
          <pre>{this.state.error?.toString()}</pre>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error?.stack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}