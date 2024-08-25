import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const SignIn = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const {createUser, updateUserProfile} = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const onSubmit = data => {
    console.log(data)

    createUser(data.email, data.password)
    .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUserProfile(data.name, data.photoURL)
        .then(() =>{
        const userInfo = {
          name: data.name,
          email: data.email
        }
            axiosPublic.post('/user', userInfo)
            .then(res =>{
              if(res.data.insertedId){
                console.log('user added to the database');

                reset();
                Swal.fire({
                   title: "Custom animation with Animate.css",
                   showClass: {
                     popup: `
                       animate__animated
                       animate__fadeInUp
                       animate__faster
                     `
                   },
                   hideClass: {
                     popup: `
                       animate__animated
                       animate__fadeOutDown
                       animate__faster
                     `
                   }
                 });
                 navigate('/');
              }
            })
            
        })
        .catch(error => console.log(error))
    })

    // createUser(data.email, data.password)
    // .then(result => {
    //   const loggedUser = result.user;
    //   console.log(loggedUser);
    //   updateUserProfile(data.name, data.photoURL)
    //   .then(() =>{
    //       console.log("user profile updated ");
    //       reset();

    //   });
    //   navigate('/')
    //   .catch(error => console.log(error))
    // })
  };
   
    return (
       <>
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up</h1>
        
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="name" {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered"  />
                {errors.name && <span className="text-red-500">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input type="name" {...register("photoURL", { required: true })}  placeholder="photo URL" className="input input-bordered"  />
                {errors.photoURL && <span className="text-red-500">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" {...register("email" , { required: true })} name="email" className="input input-bordered"  />
                {errors.email && <span className="text-red-500">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" {...register("password" , { required: true })} name="password" className="input input-bordered"  />
                {errors.password && <span className="text-red-500">This field is required</span>}
              
              </div>
              <div className="form-control mt-6">
             
                <input className="btn btn-primary" type="submit" value="Sign Up" />
              </div>
            </form>
            <p>Already have a acount <Link to="/login">Login</Link></p>
          </div>
        </div>
      </div>
      </>
    );
};

export default SignIn;