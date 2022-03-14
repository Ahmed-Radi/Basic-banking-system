import { READ_USER_DATA } from './../Types';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case READ_USER_DATA:
            return { ...state,userInfo: action.data  }
        default:
            return state;
    }
}

export default userReducer;