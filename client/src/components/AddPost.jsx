import SunEditor from "suneditor-react";
import {useForm} from "react-hook-form";
import 'suneditor/dist/css/suneditor.min.css';
import {useRef} from "react";
import {useNavigate} from "react-router-dom";


export function AddPost(){
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const editor = useRef();
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };
    const onSubmit = data =>{
        console.log(data);
        console.log(editor.current.getContents());
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("author", data.author);
        formData.append("content", editor.current.getContents());
        fetch("/addArticle", {
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
            <h1 className="text-center">Добавить статью</h1>
            <div className="col-sm-7 mx-auto">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <input {...register('title', {required: true})} type="text" className="form-control" placeholder="Заголовок"/>
                    </div>
                    <div className="mb-3">
                        <SunEditor
                            height="300px"
                            getSunEditorInstance={getSunEditorInstance}
                            setOptions={{
                                buttonList: [
                                    [
                                        'undo', 'redo',
                                        'font', 'fontSize', 'formatBlock',
                                        'paragraphStyle', 'blockquote',
                                        'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript',
                                        'fontColor', 'hiliteColor', 'textStyle',
                                        'removeFormat',
                                        'outdent', 'indent',
                                        'align', 'horizontalRule', 'list', 'lineHeight',
                                        'table', 'link', 'image', 'video', 'audio', /** 'math', */ // You must add the 'katex' library at options to use the 'math' plugin.
                                        /** 'imageGallery', */ // You must add the "imageGalleryUrl".
                                        'fullScreen', 'showBlocks', 'codeView',
                                        'preview', 'print', 'save', 'template',
                                        /** 'dir', 'dir_ltr', 'dir_rtl' */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
                                    ]
                                ]
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <input {...register('author', {required: true})} type="text" className="form-control" placeholder="Автор"/>
                    </div>
                    <div className="mb-3">
                        <input type="submit" className="form-control btn btn-primary" value="Добавить"/>
                    </div>
                </form>
            </div>
        </div>
    )
}