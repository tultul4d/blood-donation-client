import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";



const ContentManagement = () => {
    const axiosSecure = useAxiosSecure();

    const [blogs, setBlogs] = useState([]);
    const [filter, setFilter] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/blogs${filter ? `?status=${filter}` : ''}`)
            .then(res => res.json())
            .then(data => setBlogs(data))
            .catch(error => console.error('Error fetching blogs:', error));
    }, [filter]);

   const handlePublish = (id, status) => {
    axiosSecure.put(`/blogs/${id}/status`, { status })
        .then(response => {
            const updatedBlogs = blogs.map(blog => blog._id === id ? { ...blog, status } : blog);
            setBlogs(updatedBlogs);
        })
        .catch(error => console.error('Error updating blog status:', error));
};

    

const handleDelete = (id) => {
    axiosSecure.delete(`/blogs/${id}`)
        .then(response => {
            const updatedBlogs = blogs.filter(blog => blog._id !== id);
            setBlogs(updatedBlogs);
        })
        .catch(error => console.error('Error deleting blog:', error));
};
    return (
        <section className="ml-5">
            <SectionTitle 
            heading= "Content Management"
            subHeading=" Manage and Organize Your Blogs "
           ></SectionTitle>
            <div>
                <Link to="/dashboard/content-management/add-blog" className="lg:ml-96 md:ml-10 ml-5  btn bg-slate-400 text-white">Add Blog</Link>
        {/* <h2 className="text-center mt-10  font-bold text-3xl">Content Management</h2> */}
        <div className="text-center mx-auto mt-10">
        <button className="text-xl font-serif gap-4 mr-8 " onClick={() => navigate('/dashboard/content-management/add-blog')}>Add Blog</button>
        
        <select className="" onChange={(e) => setFilter(e.target.value)}>
            <option value="">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
        </select>
        <br />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-10">
            {blogs.map(blog => (
                <div key={blog._id}>
                    <div className="card bg-base-100 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">{blog.title}</h2>
    <p></p>
  </div>
  <figure>
    <img
      src={blog.img}
      alt="Shoes" />
  </figure>
</div>
                    {blog.status === 'draft' ? (
                        <button className="btn btn-outline btn-info  " onClick={() => handlePublish(blog._id, 'published')}>Publish</button>
                    ) : (
                        <button className="btn btn-outline btn-info mt-10" onClick={() => handlePublish(blog._id, 'draft')}>Unpublish</button>
                    )}
                    <button className="btn btn-outline btn-info mt-10" onClick={() => handleDelete(blog._id)}>Delete</button>
                </div>
            ))}
        </div>
    </div>
        </section>
    );
};

export default ContentManagement;