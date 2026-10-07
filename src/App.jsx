import React from 'react';
import Login from './pages/auth/Login';
// თუ გირჩევნია, რომ რეგისტრაციის გვერდი გამოჩნდეს, შეგიძლია შეცვალო:
// import Register from './pages/auth/Register';

export default function App() {
  return (
    <main>
      <Login />
      {/* ან <Register /> */}
    </main>
  );
}