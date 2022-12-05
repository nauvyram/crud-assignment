import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/User/Form";

const styles = {
    head: {
        justifyContent: 'space-between',
        marginBottom: '30px',
        alignItems: 'center'
    }
}
const AddPage: FunctionComponent = () => {
    let navigate = useNavigate();

    const handleBack = () => {
        navigate('/')
    }
    return (
        <>
            <div style={styles.head} className="flex">
                <h1>Add User</h1>
                <button onClick={handleBack} className="btn-primary">Back</button>
            </div>

            <UserForm />
        </>
    );
}

export default AddPage;