import React from "react";
import styles from "../componentStyles/errorBoundary.module.css";
import { XCircle, Home, RefreshCw } from "react-feather";
import { useRouter } from "next/router";

const ErrorBoundary = (props) => {
  const router = useRouter();
  return <ErrorBoundaryWithRouter {...props} router={router} />;
};

class ErrorBoundaryWithRouter extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false, attempts: 0 };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }

  handleRefresh() {
    this.setState({
      hasError: false,
      attempts: this.state.attempts + 1,
    });
  }

  handleGoHome() {
    this.setState({
      hasError: false,
      attempts: this.state.attempts,
    });
    this.props.router.push("/");
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className={styles.container}>
          <XCircle size={64} fill={"transparent"} stroke={"red"} />
          <div className={styles.heading}>oops, there was an error!</div>
          <button
            className={styles.button}
            type="button"
            onClick={() => this.handleGoHome()}
          >
            Return home <Home fill={"transparent"} />
          </button>
          <div className={styles.heading}>or</div>
          <button
            className={styles.button}
            type="button"
            onClick={() => this.handleRefresh()}
          >
            Try again <RefreshCw fill={"transparent"} />
          </button>
          {this.state.attempts > 0 ? (
            <>
              <div className={styles.attempts}>
                attempts: {this.state.attempts}
              </div>
              <div className={styles.attempts}>
                if this error persists, please contact
                <br />
                o.s.brownlow@gmail.com
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      );
    }

    // Return children components in case of no error
    return this.props.children;
  }
}

export default ErrorBoundary;
