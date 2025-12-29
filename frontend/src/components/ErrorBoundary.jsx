import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '5rem 0',
                    textAlign: 'center',
                    backgroundColor: 'var(--background)',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <h1 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Something went wrong.</h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>We apologize for the inconvenience. Please try refreshing the page.</p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="btn btn-primary"
                        style={{ padding: '0.75rem 1.5rem' }}
                    >
                        Back to Homepage
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
