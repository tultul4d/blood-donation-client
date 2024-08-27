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

 if (data.password !== data.confirm_password) {
      alert("Passwords do not match!");
      return;
    }
    createUser(data.email, data.password)
    .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUserProfile(data.name, data.photoURL)
        .then(() =>{
        const userInfo = {
          name: data.name,
          email: data.email,
          bloodGroup: data.bloodGroup,
          district: data.district,
          upazila: data.upazila,
          status: "active",
        }
            axiosPublic.post('/user', userInfo)
            .then(res =>{
              if(res.data.insertedId){
                console.log('user added to the database');

                reset();
                Swal.fire({
                   title: "Create New Users",
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
              <div>
                <h2 className="label-text">BloodGroup</h2>
              <select {...register("bloodGroup", { required: true })}>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
      </select>
              </div>


      <div>
        <h2 className="label-text">District</h2>
      <select {...register("district", { required: true })}>
        <option value="Dhaka">Dhaka</option>
        <option value="Chittagong">Chittagong</option>
        <option value="district">district</option>
        <option value="Khulna ">Khulna </option>
        <option value="Barishal ">Barishal </option>
        <option value="Sylhet ">Sylhet </option>
        
       
      </select>
      </div>

      <div>
        <h2 className="label-text">Upazila</h2>
      <select {...register("upazila", { required: true })}>
        <option value="Savar">Savar</option>
        <option value="Lalmonirhat">Lalmonirhat</option>
        <option value="Panchagarh">Panchagarh</option>
        <option value="Panchagarh">Panchagarh</option>
        <option value="Naogaon">Naogaon</option>
        <option value="Natore">Natore</option>
        <option value="Narayanganj">Narayanganj</option>
        <option value="Gazipur">Gazipur</option>
        

        
      </select>
      </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" {...register("password", { required: true })} placeholder="Password" />
      <input type="password" {...register("confirm_password", { required: true })} placeholder="Confirm Password" />
              
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