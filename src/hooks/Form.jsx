import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_USER, UPDATE_USER } from "../store/types/hookType";

export default function Form() {
    const dispatch = useDispatch();
    const hookState = useSelector((state) => state.userReducer);
    const [isDisabled, setIsDisabled] = useState(false)

    const formRef = useRef();

    const [form, setForm] = useState({
        values: {
            username: "",
            fullName: "",
            password: "",
            phoneNumber: "",
            email: "",
            type: "Client",
        },
        errors: {
            username: "",
            fullName: "",
            password: "",
            phoneNumber: "",
            email: "",
            type: "",
        },
    });

    // useEffect(() => {
    //     if (hookState.selectedUser) {
    //         setForm(prevForm => {
    //             if (prevForm.values.username !== hookState.selectedUser.username) {
    //                 return {
    //                     values: {...hookState.selectedUser},
    //                 }
    //             }
    //             return prevForm;
    //         });
    //     }
    // }, [hookState.selectedUser]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        setForm({
            ...form,
            values: {
                ...form.values,
                [name]: value,
            },
        });
        console.log(form);
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        const isValid = event.target.checkValidity()
        console.log(isValid)
        if (!isValid) {
            alert("Your form doesn't have valid format")
            return;
        }

        if (hookState.selected_user) {
            dispatch({
                type: UPDATE_USER,
                payload: form.values,
            });
        } else
            dispatch({
                type: ADD_USER,
                payload: form.values,
            });

        event.target.reset()
        setIsDisabled(false)
    };

    const handleReset = () => {
        setForm({
            values: {
                username: "",
                fullName: "",
                password: "",
                phoneNumber: "",
                email: "",
                type: "Client",
            },
            errors: {
                username: "",
                fullName: "",
                password: "",
                phoneNumber: "",
                email: "",
                type: "",
            }
        });
    };

    const handleBlur = (event) => {
        let message = "";
        const {
            validationMessge,
            name,
            validity,
            title,
            minLength,
            maxLength,
        } = event.target;
        const { valueMissing, tooShort, tooLong, patternMismatch } = validity;

        if (valueMissing) {
            message = `${title} is required`;
        }

        if (tooLong || tooShort) {
            message = `${title} from ${minLength}-${maxLength} characters`;
        }

        if (patternMismatch) {
            message = `${title} has invalid pattern`;
        }

        setForm({
            ...form,
            errors: {
                ...form.errors,
                [name]: message,
            },
        });
    };

    useEffect(() => {
        console.log(
            hookState.selected_user &&
                form.values.username !== hookState.selected_user.username
        );
        console.log(
            "selected user" + hookState.selected_user,
            "form" + form.values.username,
            "hookstate" + hookState.selected_user.username
        );
        if (
            hookState.selected_user &&
            form.values.username !== hookState.selected_user.username
        ) {
            setForm({
                ...form,
                values: hookState.selected_user,
            });
            setIsDisabled(true)
        }
    }, [hookState.selected_user])
    
    useEffect(() => {
        if (isDisabled && (!hookState.selected_user)) {
            handleReset()
            setIsDisabled(false)
        }
    }, [hookState.selected_user, hookState.userList])

    const {
        username = "",
        fullName = "",
        password = "",
        phoneNumber = "",
        email = "",
        type = "",
    } = form.values || {};
    return (
        <div className="card p-0">
            <div className="card-header bg-warning text-white font-weight-bold">
                REGISTER FORM
            </div>
            <div className="card-body">
                <form ref={formRef} noValidate onSubmit={handleSubmit} onReset={handleReset}>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    value={username}
                                    title="Username"
                                    name="username"
                                    required
                                    disabled={isDisabled}
                                    // minLength={7}
                                    // maxLength={10}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                />
                                <span className="text-danger">
                                    {form.errors.username}
                                </span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    value={fullName}
                                    title="Full name"
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="fullName"
                                    type="text"
                                    className="form-control"
                                />
                                <span className="text-danger">
                                    {form.errors.fullName}
                                </span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    title='Password'
                                    value={password}
                                    name="password"
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                />
                                <span className="text-danger">
                                    {form.errors.password}
                                </span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    title='Phone number'
                                    value={phoneNumber}
                                    name="phoneNumber"
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                />
                                <span className="text-danger">
                                    {form.errors.phoneNumber}
                                </span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    title='Email'
                                    value={email}
                                    name="email"
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                />
                                <span className="text-danger">
                                    {form.errors.email}
                                </span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Type</label>
                                <select
                                    title='Type'
                                    value={type}
                                    name="type"
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className="form-control"
                                >
                                    <option>Client</option>
                                    <option>Admin</option>
                                </select>
                                <span className="text-danger">
                                    {form.errors.type}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-muted">
                        <button disabled={!formRef.current?.checkValidity()} className="btn btn-warning mr-2">SAVE</button>
                        <button type="reset" className="btn btn-outline-dark">
                            RESET
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
