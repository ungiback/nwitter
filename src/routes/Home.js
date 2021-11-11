import React, { useEffect } from 'react'
import { useState } from 'react/cjs/react.development'
import { store } from 'fbase';
import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        store.onSnapshot(store.query(store.collection(store.getFirestore(), "nweets")), (snapshot) => {
            const nweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }))
            const arr_sorted = nweetArray.sort(function (a, b) {
                return b.createdAt - a.createdAt;
            })
            setNweets(arr_sorted)
        });
    }, []);

    return (
        <div>
            <NweetFactory userObj={userObj} />
            <div>
                {nweets.map(nweet =>
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                )}
            </div>
        </div>
    )
}

export default Home