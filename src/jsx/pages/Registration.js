import React,{useState} from "react";
import { Link ,useHistory} from "react-router-dom";
// import {
//     loadingToggleAction,
//     signupAction,
// } from '../../store/actions/AuthActions';
// image
import logosrs from '../../images/svg/srslogo.svg'; 

import { register ,formatError } from '../../services/AuthService';

function Register() {
    const [email, setEmail] = useState('');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('');

  const history = useHistory();
  
    function onSignUp(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (email === '') {
            errorObj.email = 'Email is Required';
            error = true;
        }
        if (password === '') {
            errorObj.password = 'Password is Required';
            error = true;
        }
        else if(password.length < 8){
          errorObj.password = 'password requires minimum of 8 characters';
                error = true;
        } 
        setErrors(errorObj);
      if (error) return;
      register(email, password).then(response => {
			  history.push('/register-success-next');
      }).catch(error => {
        const code = error.response.status;

        let errorResponse ={}
        if (code === 409) {
          errorResponse = {
            error: {
              message: "EMAIL_EXISTS"
            }
          }
          
          formatError(errorResponse);

        }

      })

        // dispatch(loadingToggleAction(true));
        // dispatch(signupAction(email, password, props.history));
    }
  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
						<Link to="/">
							<img src={logosrs} alt="" />
						</Link>
                    </div>
                    <h4 className="text-center mb-4 ">Sign up your account</h4>
					{/* {props.errorMessage && (
						<div className=''>
							{props.errorMessage}
						</div>
					)}
					{props.successMessage && (
						<div className=''>
							{props.successMessage}
						</div>
					)} */}
                    <form onSubmit={onSignUp}>
                      {/* <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Username</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="username"
                        />
                      </div> */}
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Email</strong>
                        </label>
                        <input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="form-control"
                          placeholder="hello@example.com"
                        />
                      </div>
					  {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Password</strong>
                        </label>
                        <input type="password"
							value={password}
							onChange={(e) =>
								setPassword(e.target.value)
							}
                          className="form-control"
                        />
                      </div>
					  {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Sign me up
                        </button>
                      </div>
                    </form>
                    <div className="new-account mt-3">
                      <p className="">
                        Already have an account?{" "}
                        <Link className="text-primary" to="/">
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Register;

