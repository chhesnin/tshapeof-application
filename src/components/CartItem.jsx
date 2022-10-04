import '../style/CartItem.scss';
import { useContext } from 'react';
import Context from '../Context';

function CartItem({ item, deleteFromCart }) {
  const { MEMBER_DISCOUNT } = useContext(Context);
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
      <h4 className="price">NT: ${item.price * MEMBER_DISCOUNT}</h4>
    </div>
  );
}

export default CartItem;
