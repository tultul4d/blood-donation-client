import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const BlogPage = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/blogs')
            .then(res => res.json())
            .then(data => setBlogs(data))
            .catch(error => console.error('Error fetching blogs:', error));
    }, []);
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-10">
            
            {blogs.map(blog => (<div key={blog._id} className=" card bg-base-100 w-96 shadow-xl mt-16 mb-16  ">
                {/* <div  className=""> */}
                    <figure>
                        <img className="w-60 rounded-lg"
                            src={blog.img}
                            alt="Movie" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Donor Name: {blog.name}</h2>
                        <p>{blog.
                            excerpt}</p>

<div className=" text-lg font-serif ">
                        <h2> <span className="font-bold">Date: </span>{blog.
                            date}</h2>
                        <p> <span className="font-bold">Blog Status: </span>{blog.
                            status}</p>
                    </div>

                    </div>
                    
                    <div className="card-actions justify-end">
                        <Link to={`/blogs/${blog._id}`} className="btn btn-active btn-accent mb-6 mr-20">Read More</Link>

                    </div>

                    {/* <p>{blog.content}</p> */}

                </div>
            ))}
        </div>
        // </div>



    );
};

export default BlogPage;