import React, { useState, useEffect } from "react";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user/profile"); 
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
        setUpdatedUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // Toggle edit mode and update user details
  const toggleEdit = async () => {
    if (isEditing) {
      try {
        const response = await fetch("/api/user/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        });

        if (!response.ok) {
          throw new Error("Failed to update user data");
        }

        setUser(updatedUser);
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    }
    setIsEditing(!isEditing);
  };

  if (!user) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  return (
    <div className="bg-gray-200 font-sans min-h-screen flex items-center justify-center">
      <div className="p-6 max-w-4xl w-full bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img
            src="/Images/zzOthers/user-svgrepo-com (1).svg"
            alt="User Profile"
            className="w-32 h-32 rounded-full shadow-md"
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Personal Details
        </h2>

        <div className="text-gray-600">
          <table className="w-full text-left border-collapse">
            <tbody>
              {Object.keys(user).map((key) => (
                <tr key={key} className="border-b">
                  <td className="py-2 font-medium capitalize w-1/3">{key}:</td>
                  <td className="py-2">
                    {isEditing ? (
                      <input
                        type="text"
                        name={key}
                        value={updatedUser[key]}
                        onChange={handleChange}
                        className="border px-3 py-1 rounded w-full"
                      />
                    ) : (
                      user[key]
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          <button
            className={`px-6 py-2 rounded-lg transition duration-300 ${
              isEditing
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
            onClick={toggleEdit}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
