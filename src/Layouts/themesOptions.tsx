import { API } from '../components/APICall';

export interface ThemeLabel {
  value: String;
  icon: {
    name: String;
    options: JSON;
  };
}

export interface theme {
  value: string;
  label: JSX.Element;
  jsonLabel: ThemeLabel;
}

export interface themeOptions {
  //datatype from json data from api
  themes: theme[];
}

export default async function getThemes(): Promise<theme[]> {
  //gets Menuitem <MenuItemType[]> from api
  const Call: API.apiCall<themeOptions> = new API.Call<themeOptions>('themes');
  let themes = await (await Call.Get()).themes;
  return themes ? themes : [];
}
