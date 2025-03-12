import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'

const SignUp = () => {
    const [fullName,setFullName] = useState('');
    const [phonenumber,setPhonenumber] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const navigate = useNavigate();
    
    const handleSignup = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch('/api/SignUp',{
                method:'POST',
                credentials: 'include',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    FullName : fullName,
                    PhoneNo:phonenumber,
                    Email:email,
                    Password:password,                 
                }),
            });

            if(!response.ok) {
                const errData = await response.json();
                throw new Error(errData.msg || 'Signup failed');
            }

            navigate('/');
        } catch(err) {
            setError(err.message || 'Signup failed: Please try again!')
        }
    };
    
  return (
    <>
    <div className="bg-gray-200 flex items-center justify-center min-h-screen">
    <form onSubmit={handleSignup} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">Create an account</h2>

        <label 
            className="block text-sm font-medium text-gray-700 mb-1"
        >
           Full Name
        </label>
        <input 
            type="text" 
            value = {fullName}
            onChange={(e)=>setFullName(e.target.value)}
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
            value={phonenumber}
            onChange={(e)=>setPhonenumber(e.target.value)}
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
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email Address" 
            className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-blue-500"
        />

        <label for="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input 
            type="password"  
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Enter the Password" 
            className="w-full p-2 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-blue-500"
        />

        <button
            type="submit"
            className="w-full bg-green-500 text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-green-600"
        >
            Sign Up
        </button>
        <p className="text-center text-sm text-gray-600 mt-4"
            >Already have an account? 
            <Link to='/' className="text-blue-500 hover:underline">Sign In</Link>
        </p>
    </form>
    </div>
    </>
  )
}

export default SignUp