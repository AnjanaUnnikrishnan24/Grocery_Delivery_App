import React from 'react'

const SignIn = () => {
  return (
    <>
    <div class="flex justify-center items-center w-[100%] h-[100vh] bg-gray-100">
        <form class="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
            <h2 class="text-2xl font-bold text-gray-700 text-center">Sign In</h2>
            <div class="space-y-4">

                <div>
                    <label for="phone" class="block text-sm font-medium text-gray-600">Phone Number</label>
                    <input 
                        type="number" 
                        id="phone" 
                        placeholder="Enter your registered phone number" 
                        class="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Enter your password" 
                        class="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>
            </div>

            <a href="prodCatalog.html" class="inline-block mt-6 bg-green-500 text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-blue-600">Submit</a>

            <p class="text-sm text-gray-600 text-center">Don't have an account?<a href="SignUp.html" class="text-green-500 hover:underline">Sign Up</a></p>
        </form>
    </div>
    </>
  )
}

export default SignIn