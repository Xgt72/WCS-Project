import React, { useState, useEffect } from 'react';
import Header from './components/Header';

function App() {
  const [foo, setFoo] = useState('N/A');

  useEffect(
    () => {
      fetch('/api/foo')
        .then((res) => res.json())
        .then((data) => setFoo(data.foo))
        .catch((err) => setFoo(err.message));
    },
  );

  return (
    <div>
      <h1>
        Hello World
      </h1>
      <p>
        Server respondes with foo:
        {' '}
        {foo}
      </p>
      <Header />
    </div>
  );
}

export default App;
