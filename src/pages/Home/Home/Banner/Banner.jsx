
import { Link } from 'react-router-dom';
import './Banner.css'
const Banner = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-20">
            
            <div className="items-center bg-slate-500 bg-opacity-60 pb-20 pt-12 px-36">
                <div>
                    <img src="https://i.ibb.co/cv0ZWTd/world-blood-donor-day-creative-collage.jpg"alt="" />
                </div>
                <div className="md:ml-10">
                  
                    
                   
                    <div className=' md:flex justify-between '><Link to="/addRequst"><button className="btn btn-outline border-0 border-b-4 mt-4">Join as a donor</button></Link>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Search Donors</button></div>
                </div>
            </div>
        </div>
    );
};

export default Banner;