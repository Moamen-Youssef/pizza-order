import { useDispatch, useSelector } from "react-redux"
import Button from "../../ui/Button"
import { decreseItemQuantity, getCurrentQuantityById, increaseItemQuantitiy } from "./cartSlice"

// eslint-disable-next-line react/prop-types
function UpdateItemQuantity({pizzaId}) {
    const dispatch = useDispatch();
    const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

    return (
        <div className="flex gap-1 sm:gap-3 items-center">
            <Button type='round' onClick={()=> dispatch(decreseItemQuantity(pizzaId))}>-</Button>
           <span className="font-medium text-sm">{currentQuantity}</span>
            <Button type='round' onClick={()=> dispatch(increaseItemQuantitiy(pizzaId))}>+</Button>
        </div>
    )
}

export default UpdateItemQuantity
