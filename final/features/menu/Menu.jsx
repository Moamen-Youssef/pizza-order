import { useLoaderData } from "react-router";
import MenuItem from "../menu/MenuItem";
import { getMenu } from "../../services/apiRestaurant";
function Menu() {
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const menu = getMenu();
  return menu;
}

export default Menu;
