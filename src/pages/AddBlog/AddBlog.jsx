import JoditEditor from "jodit-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const AddBlog = () => {

    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        const newBlog = { title, thumbnail, content };
        fetch('http://localhost:5000/blogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBlog)
        })
        .then(res => res.json())
        .then(data => {
            navigate('/dashboard/content-management');
        })
        .catch(error => console.error('Error adding blog:', error));
    };
    return (
        <div>
        <h2>Add Blog</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
                <label>Thumbnail</label>
                <input type="text" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} required />
            </div>
            <div>
                <label>Content</label>
                <JoditEditor value={content} onChange={(newContent) => setContent(newContent)} />
            </div>
            <button type="submit">Create</button>
        </form>
    </div>
    );
};

export default AddBlog;