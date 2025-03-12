import React, { useState, useEffect } from 'react';

const initialAddressState = {
  address_line: '',
  city: '',
  state: '',
  pincode: '',
  country: ''
};

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [address, setAddress] = useState(initialAddressState);
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/user/profile')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        return response.json();
      })
      .then((data) => {
        setProfile(data);
        // Pre-fill form fields if data already exists
        setAddress(data.address || initialAddressState);
        setMobile(data.mobile || '');
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Handler for form submission to update address and mobile number
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/user/profile/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ address, mobile })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update profile');
        }
        return response.json();
      })
      .then((updatedData) => {
        setProfile(updatedData);
        alert('Profile updated successfully!');
      })
      .catch((err) => {
        alert('Error updating profile: ' + err.message);
      });
  };

  // Handler for address field changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prevAddress => ({ ...prevAddress, [name]: value }));
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      {profile && (
        <div className="profile-details">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p>
            <strong>Address:</strong> {profile.address 
              ? `${profile.address.address_line}, ${profile.address.city}, ${profile.address.state}, ${profile.address.pincode}, ${profile.address.country}`
              : 'Not provided'
            }
          </p>
          <p><strong>Mobile:</strong> {profile.mobile || 'Not provided'}</p>
        </div>
      )}

      <hr />

      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Address</legend>
          <div>
            <label htmlFor="address_line">Address Line:</label>
            <input 
              type="text" 
              id="address_line" 
              name="address_line"
              value={address.address_line}
              onChange={handleAddressChange}
              placeholder="Enter your address line"
              required
            />
          </div>
          <div>
            <label htmlFor="city">City:</label>
            <input 
              type="text" 
              id="city" 
              name="city"
              value={address.city}
              onChange={handleAddressChange}
              placeholder="Enter your city"
              required
            />
          </div>
          <div>
            <label htmlFor="state">State:</label>
            <input 
              type="text" 
              id="state" 
              name="state"
              value={address.state}
              onChange={handleAddressChange}
              placeholder="Enter your state"
              required
            />
          </div>
          <div>
            <label htmlFor="pincode">Pincode:</label>
            <input 
              type="text" 
              id="pincode" 
              name="pincode"
              value={address.pincode}
              onChange={handleAddressChange}
              placeholder="Enter your pincode"
              pattern="^\d{5,10}$"
              title="Pincode must be 5 to 10 digits"
              required
            />
          </div>
          <div>
            <label htmlFor="country">Country:</label>
            <input 
              type="text" 
              id="country" 
              name="country"
              value={address.country}
              onChange={handleAddressChange}
              placeholder="Enter your country"
              required
            />
          </div>
        </fieldset>
        <div>
          <label htmlFor="mobile">Mobile Number:</label>
          <input 
            type="text" 
            id="mobile" 
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter your mobile number"
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
