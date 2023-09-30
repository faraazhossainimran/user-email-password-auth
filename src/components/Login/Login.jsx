import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(null)
  const [registerError, setRegisterError] = useState('')
  // const [email, setEmail] = useState('')
  const emailRef = useRef(null)
  const handleLogIn = (e) => {
    e.preventDefault()
        // reset error
        setRegisterError('')
        setLoggedIn('')
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInWithEmailAndPassword(auth,email,password)
    .then(result => {
      console.log(result.user)
      if(result.user.emailVerified){
        setLoggedIn('user logged in succesfully')
      } 
      else {
        alert('Please verify you email address')
      }
      setLoggedIn(result.user)
    })
    .catch(error => {
      setRegisterError(error.message)
    })
  };
  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if(!email){
      console.log('provide your email');
      return
    } 
    // else if (!/[A-Z]/.test(email)){
    //   console.log('please write a valid email');
    //   return
    // }
    // send validation email 
    sendPasswordResetEmail(auth, email)
    .then(() => {
      alert('please check your email');
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <div>
      <div className="hero py-32 bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">{loggedIn? "Welcome to your account" : "Login"  }</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleLogIn}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    placeholder="email"
                    name="email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="input input-bordered"
                  />
                  <label className="label">
                    <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>

                <div className="form-control mt-6">
                  <input
                    className="btn btn-primary py-2 mb-4 border w-3/4"
                    type="submit"
                    value="Login"
                  />
                </div>
              </form>
              {loggedIn&& <p className="text-2xl text-[green] text-center">Login Success</p>}
              {registerError && <p className="text-2xl text-[red] text-center">Login failed</p>}
              <p>New to this website ? please <Link to="/register">Register</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
