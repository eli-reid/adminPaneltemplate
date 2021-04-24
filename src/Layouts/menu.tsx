import { API } from '../components/APICall';
import { MenuItemType } from '@paljs/ui';

interface menuItems {
  menus: MenuItemType[];
}

async function getMenu(): Promise<MenuItemType[]> {
  const menuCall: API.apiCall<menuItems> = new API.Call<menuItems>('menus');
  return await (await menuCall.Get()).menus;
}

export default getMenu;
