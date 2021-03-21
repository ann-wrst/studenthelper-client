import {API_BASE_URL} from "../constants/api"

function isLoggedin() {
let isAuthenticated=false;
 fetch(API_BASE_URL+'/isAuthenticated', {
            credentials: 'include',
            method: 'GET',
        }).then(
            async response => {
                let res = await response.json();
                if(res.isAuthenticated) isAuthenticated=true;
                console.log("The user isAuthenticated? " + isAuthenticated);
            }
        )
        return isAuthenticated;
}
export default isLoggedin;