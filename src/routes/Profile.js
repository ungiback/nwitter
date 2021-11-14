import { auth } from 'fbase'
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

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
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input type="text" value={newDisplayName} onChange={onChange} placeholder="Display name" autoFocus className="formInput" />
                <input type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }} />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    )
}

Profile.propTypes = {
    refreshUser: PropTypes.func,
    userObj: PropTypes.object
}