import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { DELETE_USER, EDIT_USER } from '../store/types/hookType';

export default function Management() {

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer)
  const [keyword, setKeyWord] = useState("")

  const setSelectedUser = (user) => {
    console.log(user)
    dispatch({
        type: EDIT_USER,
        payload: user
    })
  }

  const deleteUser = (user) => {
    dispatch({
        type: DELETE_USER,
        payload: user,
    })
  }

  const renderContent = () => {
    console.log(userState.userList)
    
    const fileredData = userState.userList.filter((ele) => {
        console.log(keyword)
        return (ele.fullName.toLowerCase().indexOf(keyword.toLowerCase()) !== -1)
    })

    return fileredData.map((element, idx) => {
    return (
        <tr key={idx} className="bg-light">
        <td>{idx + 1}</td>
        <td>{element.username}</td>
        <td>{element.fullName}</td>
        <td>{element.email}</td>
        <td>{element.phoneNumber}</td>
        <td>{element.type}</td>
        <td>
            <button onClick={() => setSelectedUser(element)} className="btn btn-info mr-2">
                EDIT
            </button>
            <button onClick={() => deleteUser(element)}className="btn btn-danger">
                DELETE
            </button>
        </td>
    </tr>)
    })
  }

  return (
    <div className="card p-0 mt-3">
    <div className="card-header font-weight-bold">
        USER MANAGEMENT
    </div>
    <div className="row mt-4 px-3 ">
        <div className="col-4">
            <div className="form-group mb-0">
                <input
                    type="text"
                    placeholder="Search by full name..."
                    className="form-control"
                    onChange={(event) => setKeyWord(event.target.value)}
                />
            </div>
        </div>
        <div className="col-3 ml-auto">
            <div className="form-group mb-0">
                <select className="form-control">
                    <option>All</option>
                    <option>Client</option>
                    <option>Admin</option>
                </select>
            </div>
        </div>
    </div>
    <div className="card-body">
        <table className="table">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Username</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Type</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {renderContent()}
            </tbody>
        </table>
    </div>
</div>
  )
}
