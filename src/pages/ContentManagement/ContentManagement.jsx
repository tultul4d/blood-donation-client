import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle/SectionTitle";


const ContentManagement = () => {

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
        fetch(`http://localhost:5000/blogs/${id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        })
        .then(res => res.json())
        .then(data => {
            const updatedBlogs = blogs.map(blog => blog._id === id ? { ...blog, status } : blog);
            setBlogs(updatedBlogs);
        })
        .catch(error => console.error('Error updating blog status:', error));
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/blogs/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(() => {
                const updatedBlogs = blogs.filter(blog => blog._id !== id);
                setBlogs(updatedBlogs);
            })
            .catch(error => console.error('Error deleting blog:', error));
    };
    return (
        <section>
            <SectionTitle 
            heading= "Content Management"
            subHeading=" Manage and Organize Your Blogs "
           ></SectionTitle>
            <div>
        {/* <h2 className="text-center mt-10  font-bold text-3xl">Content Management</h2> */}
        <div className="text-center mx-auto mt-10">
        <button className="text-xl font-serif gap-4 mr-8" onClick={() => navigate('/dashboard/content-management/add-blog')}>Add Blog</button>
        <select className="" onChange={(e) => setFilter(e.target.value)}>
            <option value="">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
        </select>
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