import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error('putDb not implemented');

  // open the db and its version
  const jateDB = await openDB('jate', 1);

  //create new transaction in db for read and write operations
  const tx = jateDB.transaction('jate', 'readwrite');

  //accessing jate object store 
  const store = tx.objectStore('jate');

   //pass inputs into db
  const request = store.add({ content});

  const result = await request; 
  console.log('content saved to your db', result);

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => { 
  console.error('getDb not implemented');

  //create connection to db and the version we want
  const jateDB = await openDB('jate', 1);

  // create new transaction and specify the db
  const tx = jateDB.transaction('jate', 'readonly');

  // open the object store for selected object
  const store = tx.objectStore('jate');

  //get all data in db
  const request = store.getAll();
  
  //get confirmation of requst
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
