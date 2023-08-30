import React, { useState, useEffect } from 'react';
import axios from 'axios';
import waterLogo from '../images/water.png';
import cokeLogo from '../images/coke.png';
import sodaLogo from '../images/soda.png';

export default function ListProduct({bought}) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchProducts();
    }, [bought]);

    var imageSrc;
    const fetchProducts = async () => {
        const response = await axios.get('/api/products');
        setProducts(response.data);
    };

    return (
        <div className='product-listing'>
            <div className='machine-header'>Vending Machine</div>
            <div className='glass'></div>
            {products.map((product, index) => {
                imageSrc = product.id === 1111 ? waterLogo : product.id === 2222 ? cokeLogo : sodaLogo;

                return <div key={product.id} className='product'>
                    <div>({product.quantity})</div>
                    <br />
                    <img src={imageSrc} className="product-logo" alt="logo" />
                    <div>{product.name}</div>
                    <div>${product.price}</div>
                    <br />
                    <div className='place'>{index + 1}</div>
                </div>
            }
            )}
        </div>
    );
}