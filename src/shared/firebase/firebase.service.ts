import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private _db: admin.firestore.Firestore;

  private get db() {
    if (!this._db) {
      // Init db instance just the first time to optimize performance
      this._db = admin.firestore();
    }

    return this._db;
  }

  constructor() {
    /** */
  }

  async getCollection<T>(collectionName: string) {
    const snap = await this.db.collection(collectionName).get();

    const data = snap.docs.map((doc: any) => doc.data() as T);

    return data;
  }

  async getDocument<T>(collectionName: string, docId: string) {
    const snap = await this.db.collection(collectionName).doc(docId).get();

    return snap.exists ? (snap.data() as T) : undefined;
  }

  getDocRef(collectionName: string, docId: string) {
    return this.db.collection(collectionName).doc(docId);
  }

  getCollectionRef(
    collectionName: string,
  ): admin.firestore.Query<admin.firestore.DocumentData> {
    return this.db.collection(collectionName);
  }

  setDocument(collectionName: string, docId: string, data: any) {
    return this.db
      .collection(collectionName)
      .doc(docId)
      .set(data, { merge: true });
  }

  initBatch() {
    return this.db.batch();
  }
}
