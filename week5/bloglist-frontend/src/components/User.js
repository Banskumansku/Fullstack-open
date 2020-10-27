import React from 'react'

const User = ({ user }) => {
    const userStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        marginBottom: 5
    }
    
    if (!user) return null
    
    return (
        <div style={userStyle}>
            <div>
                {user.name} {user.blogs.length}
            </div>
        </div>
    )
}

export default User