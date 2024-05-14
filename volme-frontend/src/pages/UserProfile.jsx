import {useGetUserByUsernameQuery} from "../features/users/usersApiSlice";
import {useParams} from "react-router-dom";
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import CircularProgress from '@mui/material/CircularProgress';

import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    profileContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const UserProfile = () => {
    const {profileContainer} = useStyles()

    const { username } = useParams();

    const {
        data: user,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUserByUsernameQuery(username)

    let content

    if (isLoading) {
        content = <p><CircularProgress />Loading...</p>
    }

    if (isError) {
        content = (
            <p>
                <ErrorRoundedIcon />
                {error?.data?.message}
            </p>
        )
    }

    if (isSuccess) {

        console.log(user)

        content = (
            <div className={profileContainer}>
                <h1>User Profile</h1>
                <div>
                    <p>
                        {user.username}
                    </p>
                </div>
            </div>

        )
    }

    return (
        content
    );
}

export default UserProfile;