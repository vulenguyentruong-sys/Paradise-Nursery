import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Tính tổng số tiền trong giỏ
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleIncrease = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item));
    }
  };

  const handleDelete = (item) => {
    dispatch(removeItem(item));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Shopping Cart</h2>
      <h3 style={{ textAlign: 'center', color: '#2E8B57' }}>Total Cart Amount: ${totalAmount}</h3>

      <div>
        {cartItems.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} style={{ border: '1px solid #ddd', borderRadius: '8px', margin: '15px 0', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <img src={item.image} alt={item.name} width="80" style={{ borderRadius: '5px' }} />
              
              <div style={{ flex: 1, marginLeft: '20px' }}>
                <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
                <p style={{ margin: '0 0 5px 0', color: '#555' }}>Unit Price: ${item.price}</p>
                <p style={{ margin: 0, fontWeight: 'bold' }}>Total Cost: ${item.price * item.quantity}</p>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div>
                  <button onClick={() => handleDecrease(item)} style={{ padding: '5px 10px', fontSize: '16px', cursor: 'pointer' }}>-</button>
                  <span style={{ margin: '0 15px', fontSize: '18px' }}>{item.quantity}</span>
                  <button onClick={() => handleIncrease(item)} style={{ padding: '5px 10px', fontSize: '16px', cursor: 'pointer' }}>+</button>
                </div>
                <button onClick={() => handleDelete(item)} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-around' }}>
        <button onClick={onContinueShopping} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#f39c12', color: 'white', border: 'none', borderRadius: '5px' }}>
          Continue Shopping
        </button>
        <button onClick={() => alert('Coming Soon')} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#2E8B57', color: 'white', border: 'none', borderRadius: '5px' }}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
