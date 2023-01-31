import { ADD_USER, DELETE_USER, EDIT_USER, UPDATE_USER } from "../types/hookType"

const DEFAULT_STATE = {
    userList: [],
    selected_user: ''
}

export const userReducer = (state = DEFAULT_STATE, action) => {
    const { type, payload } = action
    switch (type) {
        case ADD_USER: {
            state.userList.push({...payload})
            break;
        }
        case EDIT_USER: {
            state.selected_user = payload
            break;
        }
        
        case DELETE_USER: {
            state.userList = state.userList.filter(ele => ele.username === payload.username ? false: true)
            console.log((state.selected_user))
            if (state.selected_user) {
                state.selected_user = ''
            }
            console.log((state.selected_user))
            break
        }

        case UPDATE_USER: {
            state.selected_user = '';
            state.userList = state.userList.map(ele => ele.username === payload.username ? payload : ele)
            break
        }

        default:
        break
    }
    return {...state};
}