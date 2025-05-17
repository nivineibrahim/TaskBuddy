import React from "react";
import { database } from "../utils/firebaseConfig";
import { useContext, useEffect } from "react";
import { MainContext } from "../utils/context";
import { doc, getDoc } from "firebase/firestore";
function Home() {
  const { username, storeUsername, user, loading } = useContext(MainContext);
  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(database, "users", user.uid));
          if (userDoc.exists()) {
            storeUsername(userDoc.data().username);
          }
        } catch (error) {
          alert(error);
        }
      }
    };
    fetchUsername();
  }, [user]);
  return (
    <div className="home">
      {loading ? (
        <h1>Loading...</h1>
      ) : user ? (
        <>
          <h1>Welcome {username}</h1>
          <p>You can add tasks now!!</p>
        </>
      ) : (
        <h1>Welcome to TASK BUDDY</h1>
      )}
      {!loading && !user && <p>Please Sign Up or Login to continue.</p>}
    </div>
  );
}

export default Home;