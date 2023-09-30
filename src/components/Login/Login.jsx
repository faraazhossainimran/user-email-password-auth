import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(null)
  const [registerError, setRegisterError] = useState('')
  const handleLogIn = (e) => {
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    signInWithEmailAndPassword(auth,email,password)
    .then(result => {
      setLoggedIn(result.user)
    })
    .catch(error => {
      setRegisterError(error.message)
    })
  };
  return (
    <div>
      <div className="hero py-32 bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
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
                    <a href="#" className="label-text-alt link link-hover">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
