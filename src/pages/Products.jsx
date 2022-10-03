import '../style/Products.scss';
import { useState, useEffect, useRef } from 'react';
import useHover from '../hooks/useHover';
import Product from '../components/Product';
import CartItem from '../components/CartItem';

function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const { isHover, ref } = useHover();
  const cartPageRef = useRef();
  function handleToggleCart() {
    setIsCartOpen((prevIsCartOpen) => !prevIsCartOpen);
  }
  function toggleFavorite(productId) {
    setAllProducts((prevAllProducts) =>
      prevAllProducts.map((product) => {
        if (product.id === productId) {
          return { ...product, isFavorite: !product.isFavorite };
        }
        return product;
      })
    );
  }
  function addToCart(product) {
    // const thisProduct = allProducts.find((product) => product.id === productId);
    setCartItems((prevCartItems) => [...prevCartItems, product]);
  }
  function deleteFromCart(productId) {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== productId));
  }
  function getCartIcon() {
    if (cartItems.length) {
      return 'ri-shopping-cart-fill ri-fw ri-2x cart';
    }
    return 'ri-shopping-cart-line ri-fw ri-2x cart';
  }
  function calculateTotal() {
    let totalPrice = cartItems.map((item) => item.price).reduce((acc, cur) => acc + cur, 0);
    totalPrice = totalPrice.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' });
    setTotal(totalPrice);
  }
  const productElements = allProducts.map((product) => (
    <Product
      key={product.id}
      product={product}
      cartItems={cartItems}
      toggleFavorite={toggleFavorite}
      addToCart={addToCart}
      deleteFromCart={deleteFromCart} />
  ));
  const cartItemElements = cartItems.map((item) => (
    <CartItem key={item.id} item={item} deleteFromCart={deleteFromCart} />
  ));
  useEffect(() => {
    const apiURL =
      'https://raw.githubusercontent.com/chhesnin/tshapeof-application-products/main/products.json';
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  }, []);
  useEffect(() => {
    calculateTotal();
  }, [cartItems]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isCartOpen]);
  return (
    <main className="products">
      <i
        className={getCartIcon()}
        ref={ref}
        style={{ color: isCartOpen || isHover ? '#C64A1D' : '#425D66' }}
        onClick={handleToggleCart}
        role="presentation"
      />
      <div className="container">
        <h1 className="title">
          選購陶器
          <span>| Products</span>
        </h1>
        <div className="products-container">{productElements}</div>
      </div>
      <div
        className={isCartOpen ? 'cart-page opened' : 'cart-page'}
        ref={cartPageRef}
        onClick={handleToggleCart}
        role="presentation">
        <div className="container">
          <h1 className="title">
            購物車
            <span>| Cart</span>
          </h1>
          {cartItems.length > 0 ? (
            <div className="cart-item-container">{cartItemElements}</div>
          ) : (
            <h4 className="alert">You have no items in your cart.</h4>
          )}
          <hr />
          <h3 className="total">Total: {total}</h3>
        </div>
      </div>
    </main>
  );
}

export default Products;
