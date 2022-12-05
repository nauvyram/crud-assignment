import { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import {
    userSelector,
} from '../../store/user/selector'
import { IUser } from '../../store/user/types'

import './List.scss'
import '../../theme/helper.scss'
import { TAppState } from '../../store/rootReducer'
import { sagaActions } from '../../store/user/sagaActions'
import { hideAlert, showAlert } from '../../store/alert/reducer'
const UserList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector(userSelector)
    const status = useSelector((state: TAppState) => state.user.status)
    const error = useSelector((state: TAppState) => state.user.error)
    const handleEdit = (user: IUser) => {
        navigate('/edit:' + user.id)
    }
    const handleDelete = (id: string | number | undefined) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch({
                type: sagaActions.DELETE_USER_SAGA,
                payload: id
            })
            dispatch(showAlert({
                type: 'success',
                msg: 'User has been deleted successfully'
            }))
        } else {
            dispatch(showAlert({
                type: 'info',
                msg: 'User not deleted!!'
            }))
        }
        setTimeout(() => dispatch(hideAlert()), 2000)
    }
    useEffect(() => {
        dispatch({ type: sagaActions.FETCH_USER_SAGA });
        // eslint-disable-next-line
    }, []);
    return (
        <>
            <div className='UserList__nav flex'>
                <Link to={'/add'} className='UserList__nav-link btn-primary'>Add new user</Link>
            </div>
            {
                (status === 'loading') ? (<div>Loading...</div>)
                    : status === 'error' ? (<div>{error}</div>)
                        :
                        (
                            <div className="UserList__wrap">
                                <table className="UserList">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Address</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            userData.map((user: IUser) => (
                                                <tr key={user.id}>
                                                    <td>{user.id}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>
                                                        {user.address?.suite}, { }
                                                        {user.address?.street}, { }
                                                        {user.address?.city} - { }
                                                        {user.address?.zipcode}
                                                    </td>
                                                    <td>
                                                        <div className='UserList__btn-grid'>
                                                            <button className='UserList__btn btn-secondary' onClick={() => handleEdit(user)}>Edit</button>
                                                            <button className='UserList__btn btn-secondary' onClick={() => handleDelete(user.id)}>Delete</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>
                        )
            }

        </>
    )
}

export default UserList