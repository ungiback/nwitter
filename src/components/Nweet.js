import React from "react";
import PropTypes from "prop-types";
import { store, fstorage } from "fbase";
import { useState } from "react/cjs/react.development";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Delete?");
        if (ok) {
            await store.deleteDoc(store.doc(store.getFirestore(), "nweets", `${nweetObj.id}`))
            await fstorage.deleteObject(fstorage.ref(fstorage.getStorage(), nweetObj.attachmentUrl))
        }
    }
    const toggleEditing = () => setEditing(prev => !prev)
    const onChange = (event) => {
        const { target: { value } } = event;
        setNewNweet(value)
    }
    const onSubmit = async () => {
        await store.updateDoc(store.doc(store.getFirestore(), "nweets", `${nweetObj.id}`), {
            text: newNweet
        })
        setEditing(false)
    }
    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="Edit your nweet" onChange={onChange} value={newNweet} required />
                        <input type="submit" value="Update Nweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="70px" height="70px" />}
                    {isOwner ? <>
                        <button onClick={onDeleteClick}>delete</button>
                        <button onClick={toggleEditing}>edit</button>
                    </> : ""}
                </>
            )}
        </div>
    )
}
Nweet.propTypes = {
    nweetObj: PropTypes.object.isRequired,
    isOwner: PropTypes.bool,
}

export default Nweet;
