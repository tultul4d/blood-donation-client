import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useVolunteer = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Query to check if the current user is a volunteer
    const { data: isVolunteer, isLoading: isVolunteerLoading } = useQuery({
        queryKey: [user?.email, 'volunteer'],
        queryFn: async () => {
            if (!user?.email) return false;
            const res = await axiosSecure.get(`/user/volunteer/${user.email}`);
            return res.data?.volunteer;
        },
        enabled: !!user?.email, // Only run the query if user email is available
    });

    return [isVolunteer, isVolunteerLoading];
};

export default useVolunteer;
