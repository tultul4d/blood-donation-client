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
        <div className="blog-page">
            <h1 className="font-extrabold">Published Blogs</h1>
            <div className="blogs">
                {blogs.map(blog => (
                    <div key={blog._id} className="blog-card">
                        <h2 className="text-xl font-bold">{blog.title}</h2>
                        {blog.thumbnail }
                        {/* <p>{blog.content}</p> */}
                        <Link to={`/blogs/${blog._id}`} className="text-blue-500">Read More</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;