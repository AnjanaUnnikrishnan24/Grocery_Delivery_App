import React from 'react'

const CheckOutPage = () => {
  return (
    <>
      <div className="container mx-auto p-6 space-y-6 mt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6 bg-white p-6 rounded-md shadow-md">
                <h2 className="text-2xl font-semibold">Cart</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-left">Product</th>
                            <th className="px-4 py-2 text-left">MRP</th>
                            <th className="px-4 py-2 text-left">Price</th>
                            <th className="px-4 py-2 text-left">Quantity</th>
                            <th className="px-4 py-2 text-left">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="px-4 py-2 flex items-center space-x-4">
                                <span>Ghee</span>
                                <img src="/Images/products/3a61d93b-69d8-4b38-8393-bb06e4faad36.jpeg" className="w-12 h-12 object-cover rounded-md"/>
                            </td>
                            <td className="px-4 py-2">Rs.240</td>
                            <td className="px-4 py-2">Rs.188</td>
                            <td className="px-4 py-2">1</td>
                            <td className="px-4 py-2">Rs.188</td>
                        </tr>
                        <tr class="border-b">
                            <td class="px-4 py-2 flex items-center space-x-4">
                                <span>Plum cake</span>
                                <img src="/Images/products/6c7d7b61-4fb2-487a-ae83-24ccf121cfa7.jpeg" className="w-12 h-12 object-cover rounded-md"/>
                            </td>
                            <td className="px-4 py-2">Rs.110</td>
                            <td className="px-4 py-2">Rs.99</td>
                            <td className="px-4 py-2">1</td>
                            <td className="px-4 py-2">Rs.99</td>
                        </tr>
                        <tr class="border-b">
                            <td className="px-4 py-2 flex items-center space-x-4">
                                <span>Basmati Rice</span>
                                <img src="/Images/products/92b99f0b-ccd2-42c8-b8b7-00a30b4e3cbf.jpeg" className="w-12 h-12 object-cover rounded-md"/>
                            </td>
                            <td className="px-4 py-2">Rs.220</td>
                            <td className="px-4 py-2">Rs.198</td>
                            <td className="px-4 py-2">1</td>
                            <td className="px-4 py-2">Rs.198</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="mt-6 space-y-4">
                    <h3 className="text-lg font-medium">Shipping Address</h3>
                    <select className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500">
                        <option>Address 1</option>
                        <option>Address 2</option>
                    </select>

                    <h3 className="text-lg font-medium mt-4">Delivery Time</h3>
                    <div className="space-x-4">
                        <label for="date" className="font-medium">Date</label>
                        <input type="date" className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500"/>

                        <label for="time" className="font-medium">Time</label>
                        <input type="time" className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500"/>
                    </div>
                </div>

                <button className="mt-6 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 w-full">Place Order</button>
        </div>
            
            
    </div>
      
    </>
  )
}

export default CheckOutPage