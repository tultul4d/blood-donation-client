import { useState } from "react";


const SearchPage = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [donors, setDonors] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/request/:id?bloodGroup=${bloodGroup}`);
      
      if (!response.ok) {
        // If the response is not OK, log an error with status and text
        console.error('Server Error:', response.status, response.statusText);
        return;
      }
      
      const data = await response.json(); // Parse the response directly as JSON
      setDonors(data); // Set the donors list
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div>
          <label>Blood Group:</label>
          <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
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
          <label>District:</label>
          <select value={district} onChange={(e) => setDistrict(e.target.value)}>
            <option value="">Select District</option>
            {/* Populate districts from your data */}
          </select>
        </div>

        <div>
          <label>Upazila:</label>
          <select value={upazila} onChange={(e) => setUpazila(e.target.value)}>
            <option value="">Select Upazila</option>
            {/* Populate upazilas based on selected district */}
          </select>
        </div>

        <button type="submit">Search</button>
      </form>

      {donors.length > 0 && (
        <div>
          <h2>Donor List</h2>
          <ul>
            {donors.map((donor) => (
              <li key={donor.id}>
                {donor.name} - {donor.bloodGroup} - {donor.district}, {donor.upazila}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
