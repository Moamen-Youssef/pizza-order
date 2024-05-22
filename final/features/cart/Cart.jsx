import CartItem from './CartItem';
import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice';
import EmptyCart from './EmptyCart';

function Cart() {
  const cart = useSelector(getCart);
  const userName = useSelector((state) => state.user.userName);
  const dispatch = useDispatch();
  if (!cart.length) return <EmptyCart />
  return (
    <div className="px-3 py-2">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mb-4 mt-9 text-lg font-bold">Your cart, {userName}</h2>
      <ul className="divide-y divide-stone-200 border-b ">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>
      <div className="mt-4 space-x-3">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>

        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
