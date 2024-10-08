import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import GlobalStyles from '~/components/GlobalStyles';
import { AuthUserProvider } from './components/AuthUserProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyles>
      <AuthUserProvider>
        <App />
      </AuthUserProvider>
    </GlobalStyles>
  </React.StrictMode>
);

