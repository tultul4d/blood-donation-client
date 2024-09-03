import { useEffect } from "react";
import { useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";


const RequstView = () => {
    const { id } = useParams();
    const request = useLoaderData();
    const [view, setView] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://blood-donation-server-five.vercel.app/request/${request._id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Blog not found');
                }
                // Check if the response is JSON
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return res.json();
                } else {
                    throw new Error('Received non-JSON response');
                }
            })
            .then(data => {
                setView(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching blog details:', error);
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!view) {
        return <p>Blog not found.</p>;
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          {/* <img
            src={view.img}
            className="max-w-sm rounded-lg shadow-2xl" /> */}
          <div className="">
            <h1 className="text-2xl font-bold">{view.requesterName}</h1>
            

<div className="hero-content flex-col lg:flex-row">
    <img
      src={view.img}
      className="max-w-sm rounded-lg shadow-2xl" />
    <div className="">
      <h1 className="text-2xl font-bold">{view.title}</h1>
      <p className="py-4">
        {view.
excerpt}
      </p>
      <p> <span className="font-semibold  mt-10 mb-16">Donor Name:</span>{view.
name}</p>
<p> <span className="font-semibold">Published Date:</span>{view.
date}</p>
<p> <span className="font-semibold">Publication Status:</span>{view.
status}</p>
</div>
           
 {/* <p> <span className="font-semibold  mt-10 mb-16">Donor Name:</span>{blog.
      name}</p> */}
      {/* <p> <span className="font-semibold">Published Date:</span>{blog.
      date}</p>
      <p> <span className="font-semibold">Publication Status:</span>{blog.
      status}</p> */}
      
      {/* <div className="mt-10 float-none" dangerouslySetInnerHTML={{ __html: blog.content }}></div> */}
      
      <Link to={"/dashboard/all-blood-donation-request"}><button className="btn btn-active btn-accent mt-10">Go Back</button></Link>
          </div>
          
        </div>
        </div>
      </div>
    );
};

export default RequstView;