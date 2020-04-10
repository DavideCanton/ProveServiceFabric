import { DBConfig } from 'ngx-indexed-db';

export function migrationFactory()
{
    return {};
}

export const DB_NAME = 'filesDb';
export const FILES_STORE_NAME = 'filesStore';
export const FILES_INDEX_NAME = 'filesNameIndex';

export const dbConfig: DBConfig = {
    name: DB_NAME,
    version: 1,
    objectStoresMeta: [{
        store: FILES_STORE_NAME,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
            { name: FILES_INDEX_NAME, keypath: 'name', options: { unique: false } }
        ]
    }],
    // provide the migration factory to the DBConfig
    migrationFactory
};
