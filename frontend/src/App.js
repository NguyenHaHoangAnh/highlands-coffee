import { Fragment, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import { CustomerLayout } from '~/layouts';
import ScrollToTop from './components/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthUserContext } from './components/AuthUserProvider';
import PrivateRoutes from '~/utils/PrivateRoutes';

import * as userService from '~/services/userService';

function App() {
  const userId = window.localStorage.getItem('id');
  const context = useContext(AuthUserContext);
  
  useEffect(() => {
    if (userId) {
      userService
        .getUserById(userId)
        .then((res) => {
          if (res?.message) {
            context.handleChangeUser(res?.data);
          } else {
            context.handleChangeUser();
          }
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <ScrollToTop />
        <Routes>
          {/* Private routes */}
          <Route element={<PrivateRoutes />}>
            {privateRoutes.map((route, index) => {
              const Page = route.component;

              let Layout = CustomerLayout
              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }

              return (
                <Route 
                  key={index} 
                  path={route.path} 
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  } 
                />
              )
            })}
          </Route>
          {/* Public routes */}
          {publicRoutes.map((route, index) => {
            const Page = route.component;

            let Layout = CustomerLayout
            if (route.layout) {
              Layout = route.layout
            } else if (route.layout === null) {
              Layout = Fragment
            }

            return (
              <Route 
                key={index} 
                path={route.path} 
                element={
                  <Layout>
                    <Page />
                  </Layout>
                } 
              />
            )
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
