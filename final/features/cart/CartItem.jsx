import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './DeleteItem';
import UpdateItemQuantity from './UpdateItemQuantity';
// eslint-disable-next-line react/prop-types
function CartItem({ item }) {
  // eslint-disable-next-line react/prop-types
  const { pizzaId, name, quantity, totalPrice } = item;
  return (
    <li className="flex items-center justify-between py-2">
      <p className='mb-1 font-semibold'>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-center gap-4">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
      <UpdateItemQuantity pizzaId={pizzaId}/>
      <DeleteItem pizzaId={pizzaId}/>
      </div>
    </li>
  );
}

export default CartItem;
