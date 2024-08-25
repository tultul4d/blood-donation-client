import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { FaTrashAlt, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { FaUser } from "react-icons/fa";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const {data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/user');
            return res.data;

        }
    })


    const handleMakeAdmin = user =>{
        console.log(user);
          axiosSecure.patch(`/user/admin/${user._id}`)
  .then(res =>{
      console.log(res.data);
      if(res.data.modifiedCount > 0){
          refetch();
          Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.name} is an admin now! `,
              showConfirmButton: false,
              timer: 1500
            });
      }
  })
       }
    return (
        <div>
        <div className="flex justify-evenly my-4">
            <h2 className="text-3xl">All Users</h2>
            <h2 className="text-3xl">Total Users: {users.length}</h2>
        </div>
        <div className="overflow-x-auto">
<table className="table w-full">
{/* head */}
<thead>
  <tr>
    <th></th>
    <th>Name</th>
    <th>email</th>
    <th>Roll</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  {
    users.map((user, index) => <tr key={user._id}>
        <th>{index + 1}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
        {
          user.role === 'admin' ? 'Admin' :   <button onClick={() => handleMakeAdmin(user)} className="btn  btn-lg"> <FaUser
            className="text-red-600"></FaUser></button>
        }
        </td>
        <td>
        {/* <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-lg"> <FaTrashAlt
         className="text-red-600"></FaTrashAlt></button> */}
        </td>
      </tr> )
  }
 

 
</tbody>
</table>
</div>
    </div>
    );
};

export default AllUsers;