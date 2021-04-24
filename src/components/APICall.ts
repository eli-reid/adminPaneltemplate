import { NOTINITIALIZED } from 'dns';

export namespace API {
  export interface apiCall<DataType> {
    Get(): Promise<DataType>;
    Post(): any;
  }

  export class Call<DataType> implements apiCall<DataType> {
    private _url: string;

    constructor(URL: string) {
      this._url = 'http://127.0.0.1:5000/' + URL;
    }

    async Get(): Promise<DataType> {
      const eventLoadedSuccess = new CustomEvent('fetchLoading');

      try {
        let response = await fetch(this._url);
        if (response.status == 200) {
          const eventLoadedSuccess = new CustomEvent('fetchLoaded');
          let Json: any = response.json();
          return <DataType>Json;
        }
        return response.statusText as any;
      } catch (e) {
        const eventLoadedError = new CustomEvent('fetchError');
        return e;
      }
    }

    Post(): never {
      throw 'Post Not implemented!';
    }
  }
}
