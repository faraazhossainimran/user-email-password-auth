import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile,  } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";

const HeroRegister = () => {
    const [registerError, setRegisterError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPassword, setShowPassword] = useState(false)

  const handleRegister = (e) => {
    e.preventDefault();
    // reset error
    setRegisterError('')
    setSuccess('')

    const email = e.target.email.value;
    const accepted = e.target.terms.checked
    const name = e.target.name.value;
    const password = e.target.password.value;
    console.log(name, email, password, accepted);
    if(password.length < 6){
        setRegisterError('Password should be at least 6 characters or longer')
        return;
    } else if( !/[A-Z]/.test(password)){
        setRegisterError('Password should be a uppearcase')
        return
    } else if(!accepted){
        setRegisterError('Please accept our terms and conditions')
        return
    }
    createUserWithEmailAndPassword(auth,email,password)
    .then(result => {
        console.log(result.user);
        setSuccess("User created successfully")
        // update profile 
        updateProfile(result.user, {
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        .then(()=> {
          alert('profile updated')
        })
        .catch(error => {
          console.log(error);
        })
        // send verification email 
        sendEmailVerification(result.user)
        .then(()=> {
          alert('please check your email and verify your account')
        })
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
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleRegister}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Write you name"
                    name="name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    className="input input-bordered w-full"
                    name="password"
                    required
                  />
                  <span className="absolute top-4 right-4" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                  </span>
                  </div>
                  <label className="label text-xl">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <input type="checkbox" name="terms" />
                <label className="ml-2">Accept our <a href="#">Terms and Conditions</a></label>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Register</button>
                </div>
              </form>
              {registerError && <p className="text-[red]">{registerError}</p>}
              {success && <p className="text-[green] text-center">{success}</p>}
              <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroRegister;
