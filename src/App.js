import { lazy, Suspense, useState, useEffect } from 'react';

/// Components
import Index from "./jsx";
import {useSelector } from 'react-redux';
import {  Route, Switch } from 'react-router-dom';
// action
// import { checkAutoLogin } from './services/AuthService';
// import { isAuthenticated } from './store/selectors/AuthSelectors';
/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import './vendor/datatables/css/dataTables.min.css';
import "./css/style.css";


const SignUp = lazy(() => import('./jsx/pages/Registration'));
const ForgotPassword = lazy(() => import('./jsx/pages/ForgotPassword'));
const RegisterSuccessNext = lazy(() => import('./jsx/pages/RegisterSuccessNext'));

const Login = lazy(() => {
    return new Promise(resolve => {
    setTimeout(() => resolve(import('./jsx/pages/Login')), 500);
  });
});

function App () {

    const [isAuthenticated, setisAuthenticated] = useState(false);

    const token = useSelector(state => state.auth.token);
    
    useEffect(() => {
        if (token) {
            setisAuthenticated(true);
        }
        else {
            setisAuthenticated(false)
        }   
    },[token])
    

    
    let routes = (  
        <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/register' component={SignUp} />
            <Route path='/forgot-password' component={ForgotPassword} />
            <Route path='/register-success-next' component={RegisterSuccessNext}/>
        </Switch>
    );
    if (isAuthenticated) {
		return (
			<>
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>  
                   }
                >
                    <Index / >
                </Suspense>
            </>
        );
	
	}else{
		return (
			<div className="vh-100">
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>
                  }
                >
                    {routes}
                </Suspense>
			</div>
		);
	}
};



export default App; 

