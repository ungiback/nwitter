import React, { useState } from "react";
import PropTypes from "prop-types";
import { store, fstorage } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        <div className="nweet">
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input type="text"
                            placeholder="Edit your nweet"
                            onChange={onChange}
                            value={newNweet}
                            autoFocus
                            required
                            className="formInput" />
                        <input type="submit" value="Update Nweet" className="formBtn" />
                    </form>
                    <span onClick={toggleEditing} className="formBtn cancelBtn">Cancel</span>
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
                    {isOwner && (<div className="nweet__actions">
                        <span onClick={onDeleteClick}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                        <span onClick={toggleEditing}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </span>
                    </div>)}
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
