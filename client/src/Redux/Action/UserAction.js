import { READ_USER_DATA } from './../Types';

export const fetchUser = () => {
    return (dispatch) => {
        fetch(`https://ahmed-radi-bank-system-api.herokuapp.com`).then(response => response.json()).then(data => {
            dispatch({
                type: READ_USER_DATA,
                data: data
            })
        }).catch(function(error) {
            console.log(error)
        })
    }
}