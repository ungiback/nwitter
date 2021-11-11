import React, { useState } from 'react'
import { store, fstorage } from 'fbase';
import { v4 as uuidv4 } from 'uuid';

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = fstorage.ref(fstorage.getStorage(), `${userObj.uid}/${uuidv4()}`);
            const response = await fstorage.uploadString(attachmentRef, attachment, 'data_url');
            attachmentUrl = await fstorage.getDownloadURL(fstorage.ref(fstorage.getStorage(), response.ref));
        }
        const nweetObje = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        }
        try {
            await store.addDoc(store.collection(store.getFirestore(), "nweets"), nweetObje);
            setNweet("");
            setAttachment("")
        } catch (error) {
            console.log(error);
        }
    }
    const onChange = (event) => {
        const { target: { value } } = event;
        setNweet(value);
    }
    const onFileChange = (event) => {
        const { target: { files } } = event;
        const thefile = files[0];
        const reader = new FileReader();

        reader.readAsDataURL(thefile);
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result } } = finishedEvent;
            setAttachment(result)
        }
    }
    const onClearAttachment = () => setAttachment(null);
    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="What's a on your mind?" onChange={onChange} value={nweet} maxLength={120} />
            <input type="file" accept="image/*" onChange={onFileChange} />
            <input type="submit" value="Nweet" />
            {attachment && <div>
                <img src={attachment} width="50px" height="50px" />
                <button onClick={onClearAttachment}>Clear</button>
            </div>}
        </form>
    )
}

export default NweetFactory;