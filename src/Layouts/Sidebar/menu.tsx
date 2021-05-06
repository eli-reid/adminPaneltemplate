import { API } from '../../components/APICall';
import { MenuItemType } from '@paljs/ui';

interface menuItems {
  //datatype from json data from api
  menus: MenuItemType[];
}

async function getMenu(): Promise<MenuItemType[]> {
  //gets Menuitem <MenuItemType[]> from api
  const menuCall: API.apiCall<menuItems> = new API.Call<menuItems>('menus');
  return await (await menuCall.Get()).menus;
}

export default getMenu;
