import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserProfilePage = () => {
  const { _id } = useParams(); 
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({ address_line: "", city: "", state: "", pincode: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  console.log("User _id:", _id);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to view this page.");
        setLoading(false); 
        return;
      }

      if (!_id) {
        setError("User _id is missing.");
        setLoading(false); 
        return;
      }

      try {
        console.log("Fetching user details..."); 
        const userResponse = await fetch(`/api/users/${_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!userResponse.ok) throw new Error("Failed to fetch user details");
        const userData = await userResponse.json();
        console.log("User details:", userData); 
        setUser(userData);

        console.log("Fetching addresses..."); 
        const addressesResponse = await fetch("/api/addresses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!addressesResponse.ok) throw new Error("Failed to fetch addresses");
        const addressesData = await addressesResponse.json();
        console.log("Addresses:", addressesData); 
        setAddresses(addressesData.addresses || []);
      } catch (err) {
        console.error("Error:", err.message); 
        setError(err.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [_id]);

  const handleAddAddress = async () => {
    if (!newAddress.address_line || !newAddress.city || !newAddress.state || !/\d{6}/.test(newAddress.pincode)) {
      setError("Please enter a valid address.");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/addAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAddress),
      });
      if (!response.ok) throw new Error("Failed to add address");
      const data = await response.json();

      setAddresses([...addresses, data]);
      setNewAddress({ address_line: "", city: "", state: "", pincode: "" });
      setError(""); 
    } catch (err) {
      setError("Error adding address: " + err.message);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>

      {/* Display User Details */}
      {user && (
        <div className="bg-white p-4 shadow-md rounded-md mb-4">
          <h3 className="text-lg font-semibold mb-2">User Information</h3>
          <p><strong>Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
        </div>
      )}

      {/* Display Saved Addresses */}
      <div className="bg-white p-4 shadow-md rounded-md mb-4">
        <h3 className="text-lg font-semibold mb-2">Saved Addresses</h3>
        {addresses.length > 0 ? (
          addresses.map((addr) => (
            <div key={addr._id} className="border-b py-2">
              <p><strong>Address:</strong> {addr.address_line}, {addr.city}, {addr.state} - {addr.pincode}</p>
            </div>
          ))
        ) : (
          <p>No addresses found.</p>
        )}
      </div>

      {/* Add New Address Form */}
      <div className="bg-white p-4 shadow-md rounded-md mb-4">
        <h3 className="text-lg font-semibold mb-2">Add New Address</h3>
        <input
          type="text"
          placeholder="Address Line"
          className="border p-2 w-full mb-2"
          value={newAddress.address_line}
          onChange={(e) => setNewAddress({ ...newAddress, address_line: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          className="border p-2 w-full mb-2"
          value={newAddress.city}
          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="State"
          className="border p-2 w-full mb-2"
          value={newAddress.state}
          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
        />
        <input
          type="text"
          placeholder="Pincode"
          className="border p-2 w-full mb-2"
          value={newAddress.pincode}
          onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
        />
        <button
          onClick={handleAddAddress}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Address
        </button>
      </div>
    </div>
  );
};

export default UserProfilePage;