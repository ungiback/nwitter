import React, { useEffect, useState } from 'react'
import { auth } from 'fbase';
import AppRouter from 'components/Router';

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(auth.getAuth().currentUser)
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(auth.getAuth(), (user) => {
      if (user) {
        setIsLoggedIn(true)
        // setUserObj({
        //   displayName: user.displayName,
        //   uid: user.uid,
        //   updateProfile: (args) => auth.updateProfile(user, args),
        // })
        setUserObj(user)
      }
      else {
        setUserObj(null)
      }
      setInit(true)
    })
  }, []);

  const refreshUser = () => {
    const user = auth.getAuth().currentUser;
    // setUserObj({
    //   displayName: user.displayName,
    //   uid: user.uid,
    //   updateProfile: (args) => auth.updateProfile(user, args),
    // })
    setUserObj({ ...user })
  }

  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..."}
    </>
  );
}

export default App;
