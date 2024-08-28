import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { FaTrashAlt, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { FaTrashAlt, FaUser } from "react-icons/fa";
import { MdOutlineBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";



const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const {data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/user');
            return res.data;

        }
    })


    const handleMakeOrRemoveAdmin = (user) => {
        const newRole = user.role === 'admin' ? 'user' : 'admin';
        axiosSecure.patch(`/user/${newRole}/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now a ${newRole}!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };
    
       const handleMakeOrRemoveVolunteer = (user) => {
        const newRole = user.role === 'volunteer' ? 'user' : 'volunteer';
        axiosSecure.patch(`/user/${newRole}/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now a ${newRole}!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };
    


       const handleDeleteUser = user =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            refetch();
            if (result.isConfirmed) {
            
            axiosSecure.delete(`/user/${user._id}`)
            .then(res =>{
                if(res.data.deleteCount > 0){
  Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
                }
            })
            }
          });
     }

     const handleBlockUser = user => {
        axiosSecure.patch(`/user/block/${user._id}`)
        .then(res => {
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} has been blocked.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }

    
    const handleUnblockUser = user => {
        axiosSecure.patch(`/user/unblock/${user._id}`)
        .then(res => {
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} has been unblocked.`,
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
    <th>volunteer</th>
    <th>Role</th>
    <th>Action</th>
    <th>Delate</th>
  </tr>
</thead>
<tbody>
{
    users.map((user, index) => (
        <tr key={user._id}>
            <th>{index + 1}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
    {user.role === 'admin' ? 'Admin' : (
        <button onClick={() => handleMakeOrRemoveVolunteer(user)} className="btn btn-lg">
            {user.role === 'volunteer' ? 'Make User' : 'Make Volunteer'}
        </button>
    )}
</td>
<td>
  {user.role === 'admin' ? 
    <button onClick={() => handleMakeOrRemoveAdmin(user)} className="btn btn-lg">
      Make User
    </button> :
    <button onClick={() => handleMakeOrRemoveAdmin(user)} className="btn btn-lg">
      Make Admin
    </button>}
</td>
            <td>
                {user.status === 'active' ? (
                    <button onClick={() => handleBlockUser(user)} className="btn btn-ghost btn-lg">
                          <MdOutlineBlock />
                    </button>
                ) : (
                    <button onClick={() => handleUnblockUser(user)} className="btn btn-ghost btn-lg">
                     <CgUnblock />
                    </button>
                )}
            </td>
            <td>
                <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-lg">
                    <FaTrashAlt className="text-red-600" />
                </button>
            </td>
        </tr>
    ))
}
 

 
</tbody>
</table>
</div>
    </div>
    );
};

export default AllUsers;