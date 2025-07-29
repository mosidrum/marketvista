import admin from "firebase-admin";
import {getApps} from "firebase-admin/app";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string);

if(!getApps().length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)});
}
export const adminDB = admin.firestore();

