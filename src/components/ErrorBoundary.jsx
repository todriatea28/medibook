import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-slate-50">
          <div className="w-full max-w-md p-8 space-y-4 text-center bg-white border shadow-xl border-rose-200 rounded-3xl">
            <div className="flex items-center justify-center w-16 h-16 mx-auto text-2xl font-bold border bg-rose-50 text-rose-500 rounded-2xl border-rose-100">
              ⚠️
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">სისტემური შეცდომა დაფიქსირდა</h2>
            <p className="text-xs leading-relaxed text-slate-500">
              უკაცრავად, რაღაც არასწორად წავიდა. ჩვენმა სისტემამ დააფიქსირა მოულოდნელი ხარვეზი.
            </p>
            <button
              onClick={this.handleReload}
              className="w-full py-3 text-xs font-semibold text-white transition bg-teal-600 shadow-md hover:bg-teal-500 rounded-xl"
            >
              სცადეთ ხელახლა (Retry)
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}