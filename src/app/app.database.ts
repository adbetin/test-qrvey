import { DBConfig } from 'ngx-indexed-db';
import { environment } from './../environments/environment';

export const dbConfig: DBConfig = {
  name: environment.frontDB,
  version: environment.versionDB,
  objectStoresMeta: [
    {
      store: environment.storeDB,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'code', keypath: 'code', options: { unique: true } },
      ],
    },
  ],
};
