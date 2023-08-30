import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('root'));
const customStyles = {
    content: {
        zIndex: 10
    },
};

export default function ChooseProduct({ setBought }) {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [amountPaid, setAmountPaid] = useState(0);
    const [change, setChange] = useState(0);
    const [message, setMessage] = useState('');
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get('/api/products');
        setProducts(response.data);
    };

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setMessage('');
    };

    const handleAddMoney = (payedAmount) => {
        // setAmountPaid(amountPaid + payedAmount);
        setIsOpen(true);
    };

    const handleBuyProduct = async () => {
        const response = await axios.post('/api/buy', {
            productId: selectedProduct.id,
            amountPaid: amountPaid
        });

        setMessage(response.data.message);
        setChange(response.data.change);
        setSelectedProduct(null);
        setAmountPaid(0);
        fetchProducts();
        setBought(selectedProduct.quantity);
    };

    const handleMoneyAdd = (enteredMoney) => {
        setAmountPaid(amountPaid + enteredMoney);
    }

    return (
        <div>

            <div className='all-numbers'>
                <div className='number' onClick={() => handleProductSelect(products[0])}>1</div>
                <div className='number' onClick={() => handleProductSelect(products[1])}>2</div>
                <div className='number' onClick={() => handleProductSelect(products[2])}>3</div>

                <div className='number'>4</div>
                <div className='number'>5</div>
                <div className='number'>6</div>

                <div className='number'>7</div>
                <div className='number'>8</div>
                <div className='number'>9</div>
            </div>

            <div className='orderScreen'>
                <div>
                    <h2>Choose Product</h2>
                    {selectedProduct && (
                        <div>
                            <p>Seçilen Ürün: {selectedProduct.name}</p>
                            <p>Toplam Ödenen Tutar: ${amountPaid}</p>
                            <button onClick={handleAddMoney}>Add Money</button>
                            <button onClick={handleBuyProduct}>Buy</button>
                        </div>
                    )}
                    <p>{message}</p>
                    {change > 0 && <p>Exhange: ${change}</p>}
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2>Add Money</h2>
                <div className='coins'>
                    <button className='money-button' onClick={() => handleMoneyAdd(1)}>$1</button>
                    <button className='money-button' onClick={() => handleMoneyAdd(5)}>$5</button>
                    <button className='money-button' onClick={() => handleMoneyAdd(10)}>$10</button>
                    <button className='money-button' onClick={() => handleMoneyAdd(20)}>$20</button>
                </div>
                <div className='paidValue'>{amountPaid}</div>

                <br />
                <button onClick={closeModal}>Done</button>
            </Modal>
        </div>
    );
}