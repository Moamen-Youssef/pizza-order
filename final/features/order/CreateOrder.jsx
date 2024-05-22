import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import store from '../../src/store';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import EmptyCart from '../cart/EmptyCart';
import { fetchAddress } from '../user/userSlice';
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const {
    userName,
    status: statusAddress,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);

  const formErrors = useActionData();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const isAddressLoading = statusAddress === 'loading';
  const isSubmitting = navigation.state === 'submitting';

  
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-3 py-2">
      <h2 className="mb-7 mt-2 text-2xl font-bold">Ready to order? Lets go!</h2>

      <Form method="POST" action="/order/new">
        <div className="mb-4 flex flex-col  gap-2 sm:flex-row sm:items-center ">
          <label className="sm:basis-40 ">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={userName}
          />
        </div>

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-200 p-1 text-xs font-bold text-red-500">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-4 flex flex-col  gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
              defaultValue={address}
            />
          </div>
          {!position.longitude && !position.latitude && (
            <span className="absolute right-[3px] top-[33px]  sm:right-0 md:right-[3px] md:top-[2px]">
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                disabled={isAddressLoading}
              >
                get position
              </Button>
            </span>
          )}
        </div>
        {statusAddress === 'error' && (
          <p className="mt-2 rounded-md bg-red-200 p-1 text-xs font-bold text-red-500">
            {errorAddress}
          </p>
        )}
        <div className="mb-10 mt-5 flex items-center gap-4 font-semibold ">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400
             focus:outline-none focus:ring
             focus:ring-yellow-300 
             focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting
              ? 'creating order....'
              : `Order now with ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
      </Form>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };
  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      'please give us your correct phone number. we might need it to contact you';
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.data.id}`);
}

export default CreateOrder;
