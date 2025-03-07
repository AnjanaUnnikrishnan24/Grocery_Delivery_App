import React, { useState } from "react";

const AddAddressPage = () => {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!address.street || !address.city || !address.state || !address.zipCode) {
      setMessage("All fields are required!");
      return;
    }

    try {
      const response = await fetch("/api/user/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      });

      if (!response.ok) {
        throw new Error("Failed to add address");
      }

      setMessage("Address added successfully!");
      setAddress({ street: "", city: "", state: "", zipCode: "" }); // Reset form
    } catch (error) {
      console.error("Error adding address:", error);
      setMessage("Failed to add address. Please try again.");
    }
  };

  return (
    <div className="bg-gray-200 font-sans min-h-screen flex items-center justify-center">
      <div className="p-6 max-w-md w-full bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Add New Address
        </h2>

        {message && (
          <p className="text-center mb-4 text-red-500 font-medium">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleChange}
            placeholder="Street"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            placeholder="City"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleChange}
            placeholder="State"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="zipCode"
            value={address.zipCode}
            onChange={handleChange}
            placeholder="ZIP Code"
            className="border p-2 rounded w-full"
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAddressPage;
