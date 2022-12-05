import { FunctionComponent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "../components/User/Form";
import { TAppState } from "../store/rootReducer";
import { fetchTargetUserDataInit } from "../store/user/reducer";
import { sagaActions } from "../store/user/sagaActions";

const styles = {
    head: {
        justifyContent: 'space-between',
        marginBottom: '30px',
        alignItems: 'center'
    }
}
const EditPage: FunctionComponent = () => {
    let navigate = useNavigate();
    let urlParams = useParams();
    let dispatch = useDispatch();
    const { status, error } = useSelector((state: TAppState) => state.user)
    useEffect(() => {
        dispatch(fetchTargetUserDataInit())
        dispatch({
            type: sagaActions.FETCH_TARGET_USER_SAGA,
            payload: urlParams.id?.substring(1)
        });
        // eslint-disable-next-line
    }, []);
    const handleBack = () => {
        navigate('/')
    }
    return (
        <>
            <div style={styles.head} className="flex">
                <h1>Edit User</h1>
                <button onClick={handleBack} className="btn-primary">Back</button>
            </div>

            {status === 'loading' ? <div>Loading</div> :
                status === 'error' ? <div>{error}</div> :
                    <UserForm type="edit" />
            }

        </>
    );
}

export default EditPage;