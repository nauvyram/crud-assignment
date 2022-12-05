import { FunctionComponent } from "react";
import { useSelector } from 'react-redux'
import { TAppState } from "../../store/rootReducer";
import './Alert.scss'

const Alert: FunctionComponent = () => {
    const { show, type, msg } = useSelector((state: TAppState) => state.alert)
    return (
        show ? (<div role="alert" className={"alert alert--" + type}>{msg}</div>) : <></>
    );
}

export default Alert;