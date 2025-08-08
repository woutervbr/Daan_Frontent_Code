import 'regenerator-runtime/runtime';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './Redux/Store.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CopiesProvider } from './context/CopiesContext.jsx';
import { PayMethodProvider } from './context/PayMethondContext.jsx';
import { ReSubsProvider } from './context/ReSubsContext.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
  <Provider store={store}>
    <CopiesProvider>
      <ReSubsProvider>
        <PayMethodProvider>
          <App /> {/* <-- FutureBook must be used somewhere inside here */}
        </PayMethodProvider>
      </ReSubsProvider>
    </CopiesProvider>
  </Provider>
</BrowserRouter>

  </StrictMode>
);
