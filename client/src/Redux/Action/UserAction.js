import { READ_USER_DATA } from './../Types';

export const fetchUser = () => {
    return (dispatch) => {
        fetch(`http://localhost:5000`).then(response => response.json()).then(data => {
            console.log(data)
            dispatch({
                type: READ_USER_DATA,
                data: data
            })
        }).catch(function(error) {
            console.log(error)
        })
    }
}