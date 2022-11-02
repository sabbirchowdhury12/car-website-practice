import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Checkout = () => {

    const service = useLoaderData();
    // console.log(service);
    const { _id, title, price } = service;

    const { user } = useContext(AuthContext);

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = `${form.fristName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistered';
        const message = form.message.value;
        const phone = form.phone.value;
        console.log(name, email, message, phone);

        const order = {
            service: _id,
            serviceName: service,
            price,
            customer: name,
            email,
            phone,
            message
        };


        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)

        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(er => console.log(er));

    };
    return (
        <div>
            <form onSubmit={handlePlaceOrder}>
                <h2 className="text-4xl"> You are about to oder: {title}</h2>
                <h4 className="text-3xl">Price: {price}</h4>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <input name='fristName' type="text" placeholder='Frist Name' className='input input-ghost w-full input-bordered' />

                    <input name='lastName' type="text" placeholder='Last Name' className='input input-ghost w-full input-bordered' />

                    <input name='phone' type="text" placeholder='Your Phone' className='input input-ghost w-full  input-bordered' />

                    <input name='email' type="text" defaultValue={user?.email} readOnly placeholder='Your Email' className='input input-ghost w-full  input-bordered' />
                </div>
                <textarea name='message' placeholder='your msg' className='textarea textarea-bordered h-24 w-full'></textarea>

                <input type="submit" className='btn' value='place your order' />
            </form>
        </div>
    );
};

export default Checkout;