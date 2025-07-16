// In backend/database.js
import ravendb from 'ravendb';

// Destructure DocumentStore from the imported module
const { DocumentStore } = ravendb;

const store = new DocumentStore('http://127.0.0.1:8080', 'Applicants');
store.initialize();

console.log('RavenDB store initialized for Applicants database.');

export default store;