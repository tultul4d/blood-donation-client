
import { Link } from 'react-router-dom';
import './Banner.css'
const Banner = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-20">
            
            <div className="items-center bg-slate-500 bg-opacity-60 pb-20 pt-12 px-6 md:px-12 lg:px-36">
                <div className='w-full'>
                    <img src="https://i.ibb.co/cv0ZWTd/world-blood-donor-day-creative-collage.jpg"alt="" className="w-full h-auto object-cover" />
                </div>
                <div className="md:ml-10 mt-6 md:mt-0">
                  
                    
                   
                    <div className=' flex flex-col md:flex-row justify-between gap-4 '><Link to="/addRequst"><button className="btn btn-outline border-0 border-b-4 mt-4">Join as a donor</button></Link>
                    <Link to="/search"><button className="btn btn-outline border-0 border-b-4 mt-4">Search Donors</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;