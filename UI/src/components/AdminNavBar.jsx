import React from 'react'

const AdminNavBar = () => {
  return (
    <>
    <nav className="bg-white flex flex-col shadow-lg h-screen w-28 text-slate-900 text-md font-medium fixed">
        <div className="mb-10 text-center mt-4">
            <img src="/Images/zzOthers/user-svgrepo-com.svg" alt="Admin" className="w-12 h-12 mx-auto mb-2"/>
            <h2 className="text-xl font-semibold">Admin</h2>
        </div>
        <div className="space-y-6 text-center mt-4">
            <img src="/Images/zzOthers/dashboard-layout-svgrepo-com.svg" className="size-12 mx-auto"/>
            <a href="adminDashboard.html" className="hover:underline">Dashboard</a>
        </div>
        <div class="space-y-6 text-center mt-4">
            <img 
                src="/Images/zzOthers/delivery_12958401.png" 
                className="size-12 mx-auto"
            /> 
            <a href="OrderManage.html" className="hover:underline">Orders</a>
        </div>
        <div class="space-y-6 text-center mt-4">
            <img src="/Images/zzOthers/inventory_4862473.png"  className="size-12 mx-auto"/>
            <a href="inventory.html" className="hover:underline">Inventory</a>
        </div>
        <div className="space-y-6 text-center mt-4">
            <img src="/Images/zzOthers/products_1312256.png"  className="size-12 mx-auto"/>
            <a href="addProduct.html" className="hover:underline">Products</a>
        </div>
        <div className="space-y-6 text-center mt-4">
            <img src="/Images/zzOthers/images.png"  className="size-12 mx-auto"/>
            <a href="index.html" className="hover:underline">Logout</a>
        </div>
    </nav>
    </>
  )
}

export default AdminNavBar