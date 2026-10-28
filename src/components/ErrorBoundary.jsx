import React from 'react';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary:', error, info.componentStack);
  }

  handleRetry = () => this.setState({ hasError: false, error: null });

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div role="alert" className="flex items-center justify-center min-h-screen p-4 bg-slate-50">
        <div className="w-full max-w-md p-8 space-y-4 text-center bg-white border shadow-xl border-rose-200 rounded-3xl">
          <div className="text-4xl">⚠️</div>
          <h2 className="text-xl font-extrabold text-slate-900">სისტემური შეცდომა დაფიქსირდა</h2>
          <p className="text-sm text-slate-500">
            რაღაც არასწორად წავიდა. თუ პრობლემა გრძელდება, დაგვირეკეთ კლინიკაში: <strong>+995 32 000 00 00</strong>
          </p>
          {import.meta.env.DEV && (
            <pre className="p-3 overflow-auto text-xs text-left text-rose-600 bg-rose-50 rounded-xl">
              {String(this.state.error)}
            </pre>
          )}
          <button
            onClick={this.handleRetry}
            className="w-full py-3 text-sm font-semibold text-white transition bg-teal-600 shadow-md hover:bg-teal-500 rounded-xl"
          >
            სცადეთ ხელახლა
          </button>
        </div>
      </div>
    );
  }
}