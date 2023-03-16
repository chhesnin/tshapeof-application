import '../style/Products.scss';
import { useState, useEffect, useContext } from 'react';
// import useHover from '../hooks/useHover';
import Product from '../components/Product';
import CartItem from '../components/CartItem';
import Context from '../Context';

function Products() {
  const { MEMBER_DISCOUNT, user, toggleSignOpen } = useContext(Context);
  const [allProducts, setAllProducts] = useState(
    JSON.parse(localStorage.getItem('tshapeof-allProducts')) || []
  );
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('tshapeof-cartItems')) || []
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [total, setTotal] = useState(0);
  // const [isCartIconHover, cartIconRef] = useHover();
  const [cartIconClassName, setCartIconClassName] = useState('');
  const [cartIconNumClassName, setCartIconNumClassName] = useState('');
  function handleClickCart() {
    if (user) {
      setIsCartOpen((prevIsCartOpen) => !prevIsCartOpen);
    } else {
      toggleSignOpen(true);
    }
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
  function calculateTotal() {
    let totalPrice = cartItems
      .map((item) => item.price * MEMBER_DISCOUNT)
      .reduce((acc, price) => acc + price, 0);
    totalPrice = totalPrice.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' });
    setTotal(totalPrice);
  }
  useEffect(() => {
    // *配合 localStorge 之條件
    if (!allProducts.length) {
      const apiURL =
        'https://raw.githubusercontent.com/chhesnin/tshapeof-application-products/main/products.json';
      fetch(apiURL)
        .then((res) => res.json())
        .then((data) => setAllProducts(data));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('tshapeof-allProducts', JSON.stringify(allProducts));
  }, [allProducts]);
  useEffect(() => {
    calculateTotal();
    localStorage.setItem('tshapeof-cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isCartOpen]);
  useEffect(() => {
    if (user) {
      if (cartItems.length) {
        setCartIconClassName('fill');
        setCartIconNumClassName('');
      } else {
        setCartIconClassName('line');
        setCartIconNumClassName('trans');
      }
    } else {
      setCartIconClassName('line');
      setCartIconNumClassName('trans');
    }
  }, [user, cartItems]);
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
  return (
    <main className="products">
      <i
        className={`ri-shopping-cart-${cartIconClassName} ri-fw ri-2x cart`}
        // ref={cartIconRef}
        onClick={handleClickCart}
        role="presentation">
        <h6 className={`cart-items-num ${cartIconNumClassName}`}>{cartItems.length}</h6>
      </i>
      <div className="container">
        <h1 className="title">
          選購陶器
          <span className="subtitle">| Products</span>
        </h1>
        <div className="products-container">{productElements}</div>
      </div>
      <div
        className={isCartOpen ? 'cart-page opened' : 'cart-page'}
        onClick={handleClickCart}
        role="presentation">
        <div className="container">
          <h1 className="title">
            購物車
            <span className="subtitle">| Cart</span>
          </h1>
          {cartItems.length ? (
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
