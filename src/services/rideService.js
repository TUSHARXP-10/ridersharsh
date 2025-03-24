import { db } from '../firebase/config';
import { collection, addDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';

export const createRide = async (userId, rideData) => {
  try {
    const ride = {
      ...rideData,
      userId,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    const docRef = await addDoc(collection(db, 'rides'), ride);
    return { success: true, rideId: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getUserRides = async (userId) => {
  try {
    const q = query(collection(db, 'rides'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const rides = [];
    querySnapshot.forEach((doc) => {
      rides.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, rides };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateRideStatus = async (rideId, status) => {
  try {
    await updateDoc(doc(db, 'rides', rideId), { status });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};