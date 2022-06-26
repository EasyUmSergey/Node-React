import {useNavigate} from "react-router-dom";


export function Logout(props) {
    const navigate = useNavigate();
    fetch("/logout", {
        method: "GET"
    }).then(response=>response.json())
        .then(result=>{
            if(result.result === 'success'){
                navigate('/');
            }
        })
}