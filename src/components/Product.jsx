import '../style/Product.scss';
import { useContext } from 'react';
import useHover from '../hooks/useHover';
import Context from '../Context';

function Product({ product, cartItems, toggleFavorite, addToCart, deleteFromCart }) {
  const { MEMBER_DISCOUNT, user, toggleSignOpen } = useContext(Context);
  const [isProductImgHover, productImgRef] = useHover();
  function getHeartIconClassName() {
    let heartIconClassName;
    if (product.isFavorite) {
      heartIconClassName = 'ri-heart-fill favorite';
    } else if (isProductImgHover || window.innerWidth < 576) {
      heartIconClassName = 'ri-heart-line favorite';
    }
    return heartIconClassName;
  }
  // *同時處理兩個 icon 的樣式及方法
  function handleAddIcon() {
    let addIconClassName;
    let addIconClickEvent;
    const cartHaveThisItem = cartItems.find((item) => item.id === product.id);
    if (cartHaveThisItem) {
      addIconClassName = 'ri-shopping-cart-fill add';
      addIconClickEvent = () => deleteFromCart(cartHaveThisItem.id);
    } else if (isProductImgHover || window.innerWidth < 576) {
      addIconClassName = 'ri-add-circle-line add';
      addIconClickEvent = () => addToCart(product);
    }
    return { addIconClassName, addIconClickEvent };
  }
  const { addIconClassName, addIconClickEvent } = handleAddIcon();
  function getPriceText() {
    if (user) {
      return (
        <>
          <h6 className="price" style={{ textDecoration: 'line-through' }}>
            NT ${product.price}
          </h6>
          <h6 className="price">會員價: NT${product.price * MEMBER_DISCOUNT}</h6>
        </>
      );
    }
    return <h6 className="price">NT ${product.price}</h6>;
  }
  return (
    <div className="product">
      <div
        ref={productImgRef}
        className="img-container"
        style={{ backgroundImage: `url(${product.url})` }}>
        <i
          className={getHeartIconClassName()}
          onClick={() => toggleFavorite(product.id)}
          role="presentation"
        />
        {user && <i className={addIconClassName} onClick={addIconClickEvent} role="presentation" />}
      </div>
      <h4 className="name">{product.name}</h4>
      {getPriceText()}
      {!user && (
        <button className="form-button" type="button" onClick={toggleSignOpen}>
          登入選購
        </button>
      )}
    </div>
  );
}

export default Product;
