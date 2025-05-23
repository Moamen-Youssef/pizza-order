import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder() {
    const fetcher = useFetcher();

    return (
        <fetcher.Form method='PATCH' className='text-right'>
            <Button type="primary" disabled={fetcher.state === 'loading'}>Make Priority</Button>
        </fetcher.Form>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action ({params}) {
    const data = {priority : true}
    await updateOrder(params.orderId, data);
    return null;
}
export default UpdateOrder;
