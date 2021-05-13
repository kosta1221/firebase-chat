import React from 'react'

function Profile({user}) {

    console.log(user);

    return (
        <div>
            {user && user.displayName}
        </div>
    )
}

export default Profile
