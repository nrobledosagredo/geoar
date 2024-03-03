import admin from 'firebase-admin';
import serviceAccount from '../lib/geoar-92b66-firebase-adminsdk-2zfdm-6c2c627e4b.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function deleteAllUsers(nextPageToken) {
    // Lista hasta 1000 usuarios a la vez.
    const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
    listUsersResult.users.forEach(async (userRecord) => {
      const uid = userRecord.uid;
      await admin.auth().deleteUser(uid);
      console.log(`Usuario con UID ${uid} eliminado.`);
    });
  
    if (listUsersResult.pageToken) {
      // Si hay más usuarios, continúa eliminando.
      deleteAllUsers(listUsersResult.pageToken);
    }
  }
  
  deleteAllUsers();
  