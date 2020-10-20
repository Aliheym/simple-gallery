const DB_NAME = 'gallery';
const DB_VERSION = 1;

const wrap = (request) => {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const dbPromise = new Promise((resolve, reject) => {
  const connection = indexedDB.open(DB_NAME, DB_VERSION);

  connection.onsuccess = () => resolve(connection.result);
  connection.onerror = () => reject(connection.error);
  connection.onupgradeneeded = (evt) => {
    const db = connection.result;

    switch (evt.oldVersion) {
      case 0:
        const photos = db.createObjectStore('photos', { keyPath: 'id' });
        db.createObjectStore('collections', { keyPath: 'id' });

        photos.createIndex('collectionId', 'collectionId');
        break;

      default:
        reject(connection.error);
        return;
    }
  };
});

class DB {
  constructor(promise) {
    this._dbPromise = promise;
  }

  add(store, obj) {
    return this._dbPromise.then((db) => {
      const request = db
        .transaction(store, 'readwrite')
        .objectStore(store)
        .put(obj);

      return wrap(request);
    });
  }

  addMany(store, objs) {
    return this._dbPromise.then((db) => {
      let transaction = db.transaction(store, 'readwrite');

      objs.forEach((obj) => {
        transaction.objectStore(store).put(obj);
      });

      return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      });
    });
  }

  get(store, key) {
    return this._dbPromise.then((db) => {
      let request = db
        .transaction(store, 'readonly')
        .objectStore(store)
        .get(key);

      return wrap(request);
    });
  }

  getAll(store, key) {
    return this._dbPromise.then((db) => {
      let request = db
        .transaction(store, 'readonly')
        .objectStore(store)
        .getAll(key);

      return wrap(request);
    });
  }

  getWhere(store, field, value) {
    return this._dbPromise.then((db) => {
      let request = db
        .transaction(store, 'readonly')
        .objectStore(store)
        .index(field)
        .getAll(value);

      return wrap(request);
    });
  }

  count(store) {
    return this._dbPromise.then((db) => {
      let request = db
        .transaction(store, 'readonly')
        .objectStore(store)
        .count();

      return wrap(request);
    });
  }

  countWhere(store, field, value) {
    return this._dbPromise.then((db) => {
      let request = db
        .transaction(store, 'readonly')
        .objectStore(store)
        .index(field)
        .count(value);

      return wrap(request);
    });
  }

  delete(store, key) {
    return this._dbPromise.then((db) => {
      let request = db
        .transaction(store, 'readwrite')
        .objectStore(store)
        .delete(key);

      return wrap(request);
    });
  }

  deleteMany(store, keys) {
    return this._dbPromise.then((db) => {
      let transaction = db.transaction(store, 'readwrite');

      keys.forEach((key) => {
        transaction.objectStore(store).delete(key);
      });

      return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      });
    });
  }

  clear(store) {
    return this._dbPromise.then((db) => {
      let request = db
        .transaction(store, 'readwrite')
        .objectStore(store)
        .clear();

      return wrap(request);
    });
  }
}

export default new DB(dbPromise);
