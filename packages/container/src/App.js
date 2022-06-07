import React, {useRef} from 'react';
//import MarketingApp  from './components/MarketingApp';
import {Switch, Route, BrowserRouter, Link} from 'react-router-dom';


// const x = require('webpack/lib/APIPlugin');
//
// console.log(x)

const loadScope = (url, scope) => {
    const element = document.createElement('script');
    const promise = new Promise((resolve, reject) => {
        element.src = url;
        element.type = 'text/javascript';
        element.async = true;
        element.onload = () => resolve(window[scope]);
        element.onerror = reject;
    });
    document.head.appendChild(element);
    promise.finally(() => document.head.removeChild(element));
    return promise;
};

const loadModule = async (url, scope, module) => {
    try {
        const container = await loadScope(url, scope);
        await __webpack_init_sharing__('default');
        await container.init(__webpack_share_scopes__.default);
        const factory = await container.get(module);
        return factory();
    } catch (error) {
        console.error('Error loading module:', error);
        throw error;
    }
};

export default () => {

    // function appendLibrary(path){
    //     const {mount}=import(path);
    //     mount(ref.current)
    // }
    // const appendLibrary=async (path)=>{
    //     const mount= await import("marketing/MarketingApp")
    //     console.log(mount)
    //     mount(ref.current)
    // }
    // const MFE1_Button2 = React.lazy(() => import("marketing/MarketingApp"));
    // const MFE1_Button3 = React.lazy(() => import("marketing/MarketingApp"));
    const MFE1_Button = React.lazy(() => loadModule("http://localhost:8081/remoteEntry.js","marketing","./MarketingApp"));
    const MFE1_Button1 = React.lazy(() => loadModule("http://localhost:8081/remoteEntry.js","marketing","./MarketingApp"));

    return (

    <BrowserRouter>
          <React.Suspense fallback="loading">
          <Switch>
              <Route path="/" exact>
                  <h1>Hi there!</h1>
                  <Link to="/marketing">
                      <button color="primary">
                          Pricing
                      </button>
                  </Link>
              </Route>
              <Route path="/marketing">
                  <Link to="/marketing1">
                      <button color="primary">
                          Pricing
                      </button>
                  </Link>
                    <MFE1_Button/>
              </Route>
              <Route path="/marketing1">
                  <MFE1_Button1/>
              </Route>
          </Switch>
          </React.Suspense>
      </BrowserRouter>
  );
};
