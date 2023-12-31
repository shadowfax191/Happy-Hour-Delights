import { useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider/AuthProdiver";
import toast, { Toaster } from "react-hot-toast";
import auth from "./Firebase/firebase";
import { updateProfile } from "firebase/auth";

const Register = () => {
    window.scrollTo(0, 0);

    const {createUser}=useContext(AuthContext)

    // const [error,setError]=useState(null)


    const handleSubmit=(e)=>{
        e.preventDefault()
        const email=e.target.email.value
        const password=e.target.password.value
        const name=e.target.name.value
        const photo=e.target.photo.value
        console.log(email,password,name,photo);

        // setError('')
        if(/^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(password)){
           
            createUser(email,password)
            .then(res=>{
               if(res.user.uid){
                toast.success('Successfully Registration Complete ',
                {
                  style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  },
                })
               }
               const user =auth.currentUser
               if(user){
                return updateProfile(user,{
                    displayName:name,
                    photoURL:photo
                })
               }

            })
            .catch(err=>{
                console.log(err);
               toast.error(err.message ,
                {
                  style: {
                    borderRadius: '10px',
                    background: '#FF0',
                    color: '#333',
                  },
                });
            })
        }
        else{
            toast.error('Password should contain 1 upper case,1 special character and at least 6 character',
            {
 
              style: {
                borderRadius: '10px',
                background: '#FF0',
                color: '#333',
              },
            })
        }
        
    }


    return (
            <div>
                <div className="hero max-w-5xl mx-auto  md:py-10">
                    <div className="hero-content w-full">
                       
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="text-center ">
                            <h1 className="text-5xl font-bold md:py-5">Register now!</h1>
                         </div>
                            <form onSubmit={handleSubmit} className="card-body">
                                <div className="form-control">

                                    <label className="label">
                                        <span className="label-text text-lg">Name</span>
                                    </label>
                                    <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">

                                    <label className="label">
                                        <span className="label-text text-lg">Email</span>
                                    </label>
                                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg">Password</span>
                                    </label>
                                    <input type="password" name="password" placeholder="password" className="input input-bordered" required />

                                </div>
                                <div className="form-control">

                                    <label className="label">
                                        <span className="label-text text-lg">Photo URL</span>
                                    </label>
                                    <input type="text" name="photo" placeholder="photo url" className="input input-bordered" required />
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Register</button>
                                </div>
                                <p>Do not have an account? <Link to='/login' className="text-purple-700 font-medium">Log in</Link> </p>
                            </form>
                        </div>
                    </div>
                </div>
                <Toaster ></Toaster>
            </div>
        
    );
};

export default Register;