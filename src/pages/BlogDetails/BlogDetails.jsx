import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/blogs/${id}`)
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
                setBlog(data);
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

    if (!blog) {
        return <p>Blog not found.</p>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <img src={blog.img} alt={blog.title} className="w-full h-auto mb-6" />
            <p className="mb-4"><strong>Author:</strong> {blog.name}</p>
            <p className="mb-4"><strong>Date:</strong> {blog.date}</p>
            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        </div>
    );
};

export default BlogDetails;
