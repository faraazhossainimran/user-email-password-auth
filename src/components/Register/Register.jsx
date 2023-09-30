import { Link } from "react-router-dom";

const Register = () => {
    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log('email', email);
        console.log('password', password);
        console.log('form submit');
    }
    return (
        <div className="">
            <div className="container mx-auto md:w-1/2">
                <h2 className="text-3xl py-4">Please Register</h2>
                <form onSubmit={handleRegister}>
                    <input className="mb-4 py-2 border w-3/4" type="email" name="email" placeholder="Email address"/>
                    <br />
                    <input className="mb-4 py-2 border w-3/4" type="password" name="password" placeholder="Password"/>
                    <br />
                    <input  className="btn btn-primary py-2 mb-4 border w-3/4" type="submit" value="Register" />
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Register;
