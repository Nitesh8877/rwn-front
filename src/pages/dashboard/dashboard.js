import React, { useEffect, useState } from 'react'
import {create,Delete,update,getAllProducts} from '../../api/products/product'
import {logout} from '../../api/auth/auth'
import {Link,useNavigate} from 'react-router-dom'
import './dashboard.css'
export default function Dashboard() {
    const navigate=useNavigate()
    const [message,setMessge]=useState("");
    const [products,setProducts]=useState([]);
    const [newProduct, setNewProduct]=useState({
        name:'',
        description:'',
        price:0,
    })

    const [editingProductId,setEditingProductId]=useState(null);
    //fetch all the products
    useEffect(()=>{
        fetchProducts();
    },[]);
    const fetchProducts=async()=>{
        try {
           let response= await getAllProducts()
           setProducts(response.data)
        } catch (error) {
            console.log('An error occured while fetching the products:',error);
        }
    }
    const updateProduct=async(id)=>{
        console.log(id)
        try {
            let updatedPorduct=await update(id,newProduct);
            console.log("product updated", updatedPorduct)
            setEditingProductId(null);
            getAllProducts();
        } catch (error) {
            console.log("An error occured while updating the product",error);
        }
    }
    const deleteProduct=async(id)=>{
        try {
            await Delete(id);
            fetchProducts();
            
        } catch (error) {
            console.log("An error occurred while deleting the product: ",error);
        }
    }
    const createProduct=async(e)=>{
        e.preventDefault();
        const name=document.getElementById('name').value
        const description=document.getElementById('description').value
        const price=document.getElementById('price').value
        const data={
            name:name,
            description:description,
            price:price
        }
        console.log(data)
        try {
            await create(data);
        fetchProducts();
        setMessge("Successful add product")
        
            
        } catch (error) {
            console.log('An error occured while create new product',error);
        }
    }
  return (
    <div>   
        <div className="flex-container">
            <h1>Welcome, {localStorage.getItem('username')}</h1>
           <Link key="" to="/"> <button onClick={logout} className='btn btn-lg text-success bg-dark'  >Logout</button></Link>
        </div>
        
        <hr/>
            <br/><br/>
            {/* Form to create new product */}
            <div className=' d-flex justify-content-center align-items-center'>
            <form onSubmit={createProduct} >
                <h3 className='text-success'>{message}</h3><br/>
            <div className="input-group m-1">
                    <input type="text" className="form-control" placeholder="Product Name" id="name" required />
                </div><br/>

                <div className="input-group m-1">
                    <input type="text" className="form-control" placeholder="description" id="description" required />
                </div><br/>
                <div className="input-group m-1">
                <input type="Number" className="form-control" placeholder="Price"  id="price" required />
                </div><br/>   
                <div className="input-group m-1">
                    <input type="submit" className="form-control btn btn-primary m-1 btnn" value="ADD" />
                </div><br/>
            </form>
            </div><br/><br/>

            {/* Display the product */}
            <h2 className='p-3 text-danger text-muted'>List of All Product</h2><br/>
  <table className='w-100 table table-striped ' >
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Price</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {products.map((product) => (
       
      <tr key={product._id}>
        <td>
        {
            editingProductId===product._id?(
                <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className='form-control' placeholder='Product name' 
              />
            ):(
                product.name
            )
        }
        </td>
        <td>{editingProductId === product._id ? (
                <input
                  type="text"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className='form-control' placeholder='description' 
                />
              ) : (
                product.description
              )}</td>
               <td>{editingProductId === product._id ? (
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                  className='form-control' placeholder='price' 
                />
              ) : (
                product.price
              )}</td>
              <td>
                {editingProductId === product._id ? (
                  <button onClick={() => updateProduct(product._id)} className="form-control btn btn-success btn-sm btnn">Save</button>
                ) : (
                  <button onClick={() => setEditingProductId(product._id)} className="form-control btn btn-primary btn-sm btnn">Edit</button>
                )}
                <button onClick={() => deleteProduct(product._id)} className="form-control btn btn-danger btn-sm btnn">Delete</button>
              </td>
      </tr>
))}
  </tbody>
</table>      
</div>
  )
}
