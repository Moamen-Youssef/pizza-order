// Test ID: IIDSAT

import { useLoaderData } from 'react-router';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import OrderItem from './OrderItem';
import { useFetcher } from 'react-router-dom';
import { useEffect } from 'react';
import UpdateOrder from './UpdateOrder';
function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();
  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
  }, [fetcher]);
  // Everyone can search for all orders, so for privacy reasons we're gonna  exclude names or address, these are only for the restaurant staff
  const {
    cart,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    id,
  } = order


  return (
    <div className="space-y-8 px-5 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">order #{id} Status</h2>

        <div className="space-x-3">
          {priority && (
            <span className="rounded-full bg-red-600 px-2 py-1 uppercase tracking-wide text-red-200">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-600 px-2 py-1 text-green-200">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-300 px-2 py-3">
        <p className="text-lg font-semibold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-sm">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem
            key={item.pizzaId}
            item={item}
            ingredients={
              fetcher.data?.find((el) => el.id === item.pizzaId)?.ingredients ??
              []
            }
            isLoadingIngredients={fetcher.state === 'loading'}
          />
        ))}
      </ul>
      <div className="space-y-3 bg-stone-300 px-2 py-3">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
     {!priority && <UpdateOrder />}
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}
export default Order;
