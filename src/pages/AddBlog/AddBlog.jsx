import JoditEditor from "jodit-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle/SectionTitle";


const AddBlog = () => {

    const [title, setTitle] = useState('');
    // const [thumbnail, setThumbnail] = useState('');
    const [content, setContent] = useState('');
    const [img, setImg] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        const newBlog = { title,  content, img, name, date, excerpt };
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
        
        <section>
             <SectionTitle 
            heading= "Form Our Blog"
            subHeading="Add Blog  "
           ></SectionTitle>
            <div className="container">
            <div className="formWrapper">
                {/* <h2 className="heading  text-center mt-10 text-3xl font-semibold ">Add Blog</h2> */}
                <form onSubmit={handleSubmit} className="form">
                    <div className="formGroup">
                        <label className="label text-base font-serif text-slate-900">Title</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required 
                            className="input w-full"
                        />
                    </div>
                    <div className="formGroup">
                      
                        <label className="label text-base font-serif text-slate-900">Thumbnail</label>
                        <input 
                            type="text" 
                            // value={thumbnail} 
                            onChange={(e) => setImg(e.target.value)} 
                            required 
                            className="input w-full"
                        />
                    </div>

                    <div className="formGroup">
                      
                        <label className="label text-base font-serif text-slate-900">Writer Name</label>
                        <input 
                            type="text" 
                            // value={thumbnail} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                            className="input w-full"
                        />
                    </div>
                    <div className="formGroup">
                      
                        <label className="label text-base font-serif text-slate-900">Publication Date</label>
                        <input 
                            type="text" 
                            // value={thumbnail} 
                            onChange={(e) => setDate(e.target.value)} 
                            required 
                            className="input w-full"
                        />
                    </div>
                    <div className="formGroup">
                      
                        <label className="label text-base font-serif text-slate-900">Excerpt</label>
                        <input 
                            type="text" 
                            // value={thumbnail} 
                            onChange={(e) => setExcerpt(e.target.value)} 
                            required 
                            className="input w-full"
                        />
                    </div>
                    {/* <div className="formGroup">
                      
                        <label className="label text-base font-serif text-slate-900">Image</label>
                        <input 
                            type="text" 
                            // value={thumbnail} 
                            onChange={(e) => setThumbnail(e.target.value)} 
                            required 
                            className="input w-full"
                        />
                    </div> */}
                  <div className="formGroup">
                        <label className="label text-base font-serif text-slate-900">Content</label>
                        <JoditEditor 
                            value={content} 
                            onChange={(newContent) => setContent(newContent)} 
                            className="editor"
                        />
                    </div>
                    <button type="submit" className="button text-center w-auto mt-10"   style={{
        display: 'block',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#28a745',
        border: 'none',
        borderRadius: '25px',
        cursor: 'pointer',
        textAlign: 'center',
        marginTop: '20px',
    }}
    onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
    onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}>Create</button>
                </form>
            </div>
        </div>
        </section>
    );
};

export default AddBlog;