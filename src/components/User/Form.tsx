import { FunctionComponent } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";

import '../../theme/helper.scss'
import './Form.scss'
import { IUser } from '../../store/user/types';
import { useSelector } from 'react-redux';
import { TAppState } from '../../store/rootReducer';
import { sagaActions } from '../../store/user/sagaActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideAlert, showAlert } from '../../store/alert/reducer';
import { IFormProps, IFormErrorProps } from './types'

const validate = (values: IFormProps) => {
    const errors: IFormErrorProps = {};

    Object.keys(values).every((k: string) => {
        if ((values[k as keyof IFormProps] === null || '')) {
            errors[k as keyof IFormErrorProps] = 'Required'
        }
        return true
    })

    // email validate
    if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }

    // zip
    if (
        !/^\d{5}(?:[-\s]\d{4})?$/i.test(values.addressZipcode)
    ) {
        errors.addressZipcode = 'Invalid Zipcode';
    }

    return errors;
}

interface IUserFormProps {
    type?: string
}

const UserForm: FunctionComponent<IUserFormProps> = ({ type }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const data = useSelector((state: TAppState) => state.user.user)
    const isEdit = (type === 'edit')

    const initValues: IFormProps = {
        name: isEdit ? data?.name || '' : '',
        email: isEdit ? data?.email || '' : '',
        addressSuite: isEdit ? data?.address?.suite || '' : '',
        addressStreet: isEdit ? data?.address?.street || '' : '',
        addressCity: isEdit ? data?.address?.city || '' : '',
        addressZipcode: isEdit ? data?.address?.zipcode || '' : '',
    }

    return (
        <Formik
            initialValues={initValues}
            validate={validate}
            onSubmit={(values, { setSubmitting }) => {
                let user: IUser = {
                    ...data,
                    "id": isEdit ? data?.id : Math.floor(Math.random() * (1000 - 100) + 100),
                    "name": values.name,
                    "email": values.email,
                    "address": {
                        "street": values.addressStreet,
                        "suite": values.addressSuite,
                        "city": values.addressCity,
                        "zipcode": values.addressZipcode,
                    },
                }
                if (isEdit) {
                    dispatch({
                        type: sagaActions.EDIT_USER_SAGA,
                        payload: user
                    });
                } else {
                    dispatch({
                        type: sagaActions.ADD_USER_SAGA,
                        payload: user
                    });
                }
                navigate('/')
                dispatch(showAlert({
                    type: 'success',
                    msg: isEdit ? 'User updated Successfully' : "User Added Successfully"
                }))

                setTimeout(() => {
                    dispatch(hideAlert())
                }, 2000)
                setSubmitting(false);
            }}
        >

            {
                ({ isSubmitting }) => {
                    return (
                        <Form className='FormControl__wrap'>

                            <div className='FormControl grid'>
                                <label className='FormControl__lablel' htmlFor="name">Name: </label>
                                <div className='FormControl__cont'>
                                    <Field className="FormControl__input" type="text" name="name" />
                                    <ErrorMessage className='FormControl__error' name="name" component="div" />
                                </div>
                            </div>

                            <div className='FormControl grid'>
                                <label className='FormControl__lablel' htmlFor="email">Email: </label>
                                <div className='FormControl__cont'>
                                    <Field className="FormControl__input" type="email" name="email" />
                                    <ErrorMessage className='FormControl__error' name="email" component="div" />
                                </div>
                            </div>

                            <div className='FormControl grid'>
                                <label className='FormControl__lablel' htmlFor="addressSuite">Addres - Suite: </label>
                                <div className='FormControl__cont'>
                                    <Field className="FormControl__input" type="text" name="addressSuite" />
                                    <ErrorMessage className='FormControl__error' name="addressSuite" component="div" />
                                </div>
                            </div>

                            <div className='FormControl grid'>
                                <label className='FormControl__lablel' htmlFor="addressStreet">Addres - Street: </label>
                                <div className='FormControl__cont'>
                                    <Field className="FormControl__input" type="text" name="addressStreet" />
                                    <ErrorMessage className='FormControl__error' name="addressStreet" component="div" />
                                </div>
                            </div>

                            <div className='FormControl grid'>
                                <label className='FormControl__lablel' htmlFor="addressCity">Addres - City: </label>
                                <div className='FormControl__cont'>
                                    <Field className="FormControl__input" type="text" name="addressCity" />
                                    <ErrorMessage className='FormControl__error' name="addressCity" component="div" />
                                </div>
                            </div>

                            <div className='FormControl grid'>
                                <label className='FormControl__lablel' htmlFor="addressZipcode">Addres - zipcode: </label>
                                <div className='FormControl__cont'>
                                    <Field className="FormControl__input" type="tel" name="addressZipcode" />
                                    <ErrorMessage className='FormControl__error' name="addressZipcode" component="div" />
                                </div>
                            </div>

                            <div className='FormControl grid'>
                                <div></div>
                                <div>
                                    <input className='btn-primary' type="submit" disabled={isSubmitting} value={isSubmitting ? "Loading..." : isEdit ? "Update" : "Add New"} />
                                </div>
                            </div>
                        </Form>
                    )
                }
            }

        </Formik>
    );
}

export default UserForm;