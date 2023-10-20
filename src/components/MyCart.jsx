import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider/AuthProdiver";
import { useLoaderData } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const MyCart = () => {
    window.scrollTo(0, 0)
    const { user } = useContext(AuthContext)
    const data = useLoaderData()
    const [collections, setCollecTion] = useState([])

    const CartInfo = []


    useEffect(() => {
        fetch('https://express-assignment-psi.vercel.app/users')
            .then(res => res.json())
            .then(data => {
                setCollecTion(data);
            })
    }, [])


    data.forEach(newData => {
        if (newData.userId == user.uid) {
            const mainCartData = collections.find((collect) => collect._id == newData.cartId)
            if (mainCartData) {
                CartInfo.push(mainCartData)

            }

        }
    })
    const handleDelete = (id) => {
        const backCart = data.find((collect) => collect.cartId == id)
        const newId = backCart._id
        fetch(`https://express-assignment-psi.vercel.app/cartId/${newId}`, {
            method: "DELETE",

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount) {
                    toast.success('Successfully Deleted', {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                            padding: '10px'
                        },
                    })
                    setTimeout(() => window.location.reload(), 200)
                }

            })
    }



    return (
        <div>
            {
                CartInfo.length ? <h2 className="text-4xl font-bold pt-10 text-center text-primary">your Selected Items</h2> :
                    <div>
                        <p className="text-center text-2xl md:text-8xl text-primary font-bold py-10 md:py-20 ">Your Cart is Empty</p>
                        <p className="text-center text-xl text-primary pb-10">Add to cart to see Your Selected Product</p>
                    </div>
            }
            <div className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto py-10 md:py-20">
                {
                    CartInfo?.map((cart, index) =>
                        <div key={index}>
                            <div className="card bg-base-100 shadow-xl pb-10">
                                <figure><img className="h-64" src={cart.photo} alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title text-2xl">{cart?.name}</h2>
                                    <p className="text-primary font-semibold">{cart?.brandName}</p>
                                    <div className="flex justify-evenly">
                                        <p> Type: {cart?.type}</p>
                                        <p className="font-bold text-primary">Price: ${cart?.price}</p>
                                    </div>

                                
                                    <div className="card-actions justify-end pt-4">
                                        <button onClick={() => handleDelete(cart?._id)} className="btn btn-primary">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                }


            </div>

            <Toaster ></Toaster>
        </div>
    );
};

export default MyCart;