import { auth } from 'fbase'
import React, { useState } from 'react'
import { useHistory } from 'react-router';

export const Profile = ({ refreshUser, userObj }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const history = useHistory()
    const onLogOutClick = async () => {
        await auth.signOut(auth.getAuth());
        history.push('/')
    }

    const onChange = (event) => {
        const { target: { value } } = event;
        setNewDisplayName(value)
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await auth.updateProfile(auth.getAuth().currentUser, { displayName: newDisplayName })
        }
        refreshUser();
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" value={newDisplayName} onChange={onChange} placeholder="Display name" />
                <input type="submit" value="Profile Update" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}