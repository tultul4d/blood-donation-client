import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

import useAxiosSecure from "../../hooks/useAxiosSecure";


const VolunteerHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats } = useQuery({
        queryKey: ['volunteer-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/volenteer-stats');
            return res.data;
        }

    })
    return (
        <div>
            <div className="hero bg-teal-600 mt-16  ml-5 rounded-lg">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-4xl font-mono">Welcome Our Volunteer</h1>
      <h2 className="text-xl font-mono">{
                user?.displayName ? user.displayName : 'back'
            }</h2> 
      
    </div>
  </div>
</div>
            {/* <h2>{
                user?.displayName ? user.displayName : 'back'
            }</h2> */}

            <div className="stats shadow mt-5 ml-16">
            <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                        </svg>
                    </div>
                    <div className="stat-title">Donor</div>
                    <div className="stat-value">{stats?.donor}</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div className="stat-title">Requirement</div>
                    <div className="stat-value">{stats?.donations}</div>
                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                        </svg>
                    </div>
                    <div className="stat-title">Donation Request
                    </div>
                    <div className="stat-value">{stats?.requests}</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                
            </div>
        </div>
    );
};

export default VolunteerHome;