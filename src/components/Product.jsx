import '../style/Product.scss';
import useHover from '../hooks/useHover';

function Product({ product, cartItems, toggleFavorite, addToCart, deleteFromCart }) {
  const { isHover, ref } = useHover();
  function getHeartIcon() {
    let value;
    if (product.isFavorite) {
      value = 'ri-heart-fill favorite';
    } else if (isHover) {
      value = 'ri-heart-line favorite';
    }
    return value;
  }
  // *同時處理兩個icon的樣式及方法
  function handleAddIcon() {
    let icon;
    let event;
    const cartHaveThisItem = cartItems.find((item) => item.id === product.id);
    if (cartHaveThisItem) {
      icon = 'ri-shopping-cart-fill add';
      event = () => deleteFromCart(cartHaveThisItem.id);
    } else if (isHover) {
      icon = 'ri-add-circle-line add';
      event = () => addToCart(product);
    }
    return { icon, event };
  }
  const { icon, event } = handleAddIcon();
  return (
    <div className="product">
      <div ref={ref} className="img-container" style={{ backgroundImage: `url(${product.url})` }}>
        <i
          className={getHeartIcon()}
          onClick={() => toggleFavorite(product.id)}
          role="presentation"
        />
        <i className={icon} onClick={event} role="presentation" />
      </div>
      <h3 className="name">{product.name}</h3>
      <h5 className="price">NT ${product.price}</h5>
    </div>
  );
}

export default Product;
