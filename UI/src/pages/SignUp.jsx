import React from 'react'

const SignUp = () => {
  return (
    <>
    <div className="bg-gray-200 flex items-center justify-center min-h-screen">
    <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">Create an account</h2>

        <label for="userRole" className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
        <select name="usertype" id="userRole" class="block border border-gray-300 text-sm font-medium w-full p-2 rounded-lg mb-2">
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>

        <label 
            className="block text-sm font-medium text-gray-700 mb-1"
        >
            Name
        </label>
        <input 
            type="text" 
            id="name" 
            placeholder="Full Name" 
            className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-blue-500"
        />

        <label 
            className="block text-sm font-medium text-gray-700 mb-1"
            >
            Phone
        </label>
        <input 
            type="number" 
            id="phone" 
            placeholder="Phone Number" 
            className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-blue-500"
        />

        <label 
            className="block text-sm font-medium text-gray-700 mb-1"
            >
            Email
        </label>
        <input 
            type="email" 
            id="email" 
            placeholder="Email Address" 
            className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-blue-500"
        />

        <label for="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input type="password" id="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-blue-500"/>

        <a href="prodCatalog.html" className="inline-block mt-0 bg-green-500 text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-blue-600">Sign Up</a>

        <p className="text-center text-sm text-gray-600 mt-4">Already have an account? <a href="signIn.html" className="text-blue-500 hover:underline">Sign In</a></p>
    </form>
    </div>
    </>
  )
}

export default SignUp