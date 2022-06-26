import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom";
export function Reg(props){
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const onSubmit = data =>{
        console.log(data);
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("lastname", data.lastname);
        formData.append("email", data.email);
        formData.append("pass", data.pass);
        fetch("/reg", {
            method: "POST",
            body: formData
        }).then(response=>response.json())
            .then(result=>{
                if(result.result === 'success'){
                    navigate('/');
                }
            })
    }
    return (
        <div className="container">
            <h1 className="text-center">Регистрация</h1>
            <div className="col-sm-5 mx-auto">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <input {...register('name', {required: true})} type="text" className="form-control" placeholder="Имя"/>
                    </div>
                    <div className="mb-3">
                        <input {...register('lastname', {required: true})} type="text" className="form-control" placeholder="Фамилия"/>
                    </div>
                    <div className="mb-3">
                        <input {...register('email', {required: true})} type="text" className="form-control" placeholder="E-mail"/>
                    </div>
                    <div className="mb-3">
                        <input {...register('pass', {required: true})} type="password" className="form-control" placeholder="Пароль"/>
                    </div>
                    <div className="mb-3">
                        <input type="submit" className="form-control btn btn-primary" value="Зарегистрироваться"/>
                    </div>
                </form>
            </div>
        </div>
    )
}