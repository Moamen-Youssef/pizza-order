import { formatCurrency } from '../../utils/helpers';

// eslint-disable-next-line react/prop-types
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  // eslint-disable-next-line react/prop-types
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-2 space-y-1">

      <div className="flex items-center justify-between">
        <p>
          <span className="font-semibold">{quantity}&times;</span> {name}
        </p>
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm capitalize italic text-stone-500">
        {/*eslint-disable-next-line react/prop-types*/}
        {isLoadingIngredients ? 'Loading...' : ingredients.join(', ')}
      </p>
    </li>
  );
}

export default OrderItem;
