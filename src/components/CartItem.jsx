import '../style/CartItem.scss';

function CartItem({ item, deleteFromCart }) {
  function handleClickDeleteIcon(event) {
    deleteFromCart(item.id);
    // *阻止事件繼續冒泡(傳播)
    event.stopPropagation();
  }
  return (
    <div className="cart-item">
      <i
        className="ri-delete-bin-line delete"
        onClick={handleClickDeleteIcon}
        role="presentation"
      />
      <div className="img-container" style={{ backgroundImage: `url(${item.url})` }} />
      <h4 className="name">{item.name}</h4>
      <h4 className="price">NT: ${item.price}</h4>
    </div>
  );
}

export default CartItem;
