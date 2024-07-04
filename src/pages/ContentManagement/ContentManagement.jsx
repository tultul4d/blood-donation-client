import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


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
        <div>
        <h2>Content Management</h2>
        <button onClick={() => navigate('/dashboard/content-management/add-blog')}>Add Blog</button>
        <select onChange={(e) => setFilter(e.target.value)}>
            <option value="">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
        </select>
        <div>
            {blogs.map(blog => (
                <div key={blog._id}>
                    <h3>{blog.title}</h3>
                    <p>Status: {blog.status}</p>
                    {blog.status === 'draft' ? (
                        <button onClick={() => handlePublish(blog._id, 'published')}>Publish</button>
                    ) : (
                        <button onClick={() => handlePublish(blog._id, 'draft')}>Unpublish</button>
                    )}
                    <button onClick={() => handleDelete(blog._id)}>Delete</button>
                </div>
            ))}
        </div>
    </div>
    );
};

export default ContentManagement;