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
        <div className="  grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1">

<div className="blogs ">
                {blogs.map(blog => (
                    <div key={blog._id} className="blog-card">
                         <figure>
          <img className="w-60"
            src={blog.img}
            alt="Movie" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Donor Name: {blog.name}</h2>
          <p>{blog.
excerpt}</p>


          
        </div>
        <div className="flex justify-between text-lg font-serif">
            <h2> <span className="font-bold">Date: </span>{blog.
date}</h2>
            <p> <span className="font-bold">Blog Status: </span>{blog.
status}</p>
        </div>
        <div className="card-actions justify-end">
          <Link to={`/blogs/${blog._id}`} className="btn btn-primary">Read More</Link>
           
          </div>
        
                        {/* <p>{blog.content}</p> */}
                        
                    </div>
                ))}
            </div>
       
      </div>



    );
};

export default BlogPage;