import { DBConfig } from 'ngx-indexed-db';

export function migrationFactory() {
    return {
        1: (_db: IDBDatabase, transaction: IDBTransaction) => {
            const store = transaction.objectStore('files');
            store.createIndex('name', 'name', { unique: true });
        }
    };
}

export const DB_NAME = 'files';
export const FILES_STORE_NAME = 'files';
export const FILES_INDEX_NAME = 'name';

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
