// In backend/database-applications.js
import ravendb from 'ravendb';

// Destructure DocumentStore from the imported module
const { DocumentStore } = ravendb;

// Separate database for application-specific data
const applicationsStore = new DocumentStore(
    process.env.RAVENDB_URL || 'http://127.0.0.1:8080', 
    process.env.RAVENDB_APPLICATIONS_DATABASE || 'Applicants'
);
applicationsStore.initialize();

console.log(`RavenDB Applications store initialized for database: ${process.env.RAVENDB_APPLICATIONS_DATABASE || 'Applicants'} at ${process.env.RAVENDB_URL || 'http://127.0.0.1:8080'}`);

export default applicationsStore;