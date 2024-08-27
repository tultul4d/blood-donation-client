import { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useEffect } from "react";


const SearchPage = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [donors, setDonors] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [upazilaOptions, setUpazilaOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    // Load districts and upazilas
    const fetchOptions = async () => {
      try {
        const districtsResponse = await axiosPublic.get('/districts');
        setDistrictOptions(districtsResponse.data);
        
        const upazilasResponse = await axiosPublic.get('/upazilas');
        setUpazilaOptions(upazilasResponse.data);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosPublic.get('/dashboard', {
        params: { bloodGroup, district, upazila }
      });
      setDonors(response.data);
    } catch (error) {
      setError('Failed to fetch donors.');
      console.error('Error fetching donors:', error);
    }
    setLoading(false);
  };

  return (
    <div className="search-page">
      <h1>Search Donors</h1>
      <form onSubmit={e => {
        e.preventDefault();
        handleSearch();
      }}>
        <div>
          <label>Blood Group</label>
          <select value={bloodGroup} onChange={e => setBloodGroup(e.target.value)}>
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div>
          <label>District</label>
          <select value={district} onChange={e => setDistrict(e.target.value)}>
            <option value="">Select District</option>
            {districtOptions.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Upazila</label>
          <select value={upazila} onChange={e => setUpazila(e.target.value)}>
            <option value="">Select Upazila</option>
            {upazilaOptions.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {donors.length > 0 && (
        <div className="donor-list">
          {donors.map(donor => (
            <div key={donor.id} className="donor-card">
              <h3>{donor.name}</h3>
              <p>Blood Group: {donor.bloodGroup}</p>
              <p>District: {donor.district}</p>
              <p>Upazila: {donor.upazila}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
