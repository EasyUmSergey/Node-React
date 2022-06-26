import React from "react";
export class SinglePost extends React.Component{
    constructor(props) {
        super(props);
        this.state = {content: ''}
    }
    componentDidMount() {
        let id = window.location.pathname.split('/')[2]
        fetch(`/article/${id}`)
            .then(response=>response.json())
            .then(result=>{
                console.log(result);
                document.getElementById("h1Title").innerText = result.title;
                this.setState({
                    content: result.content
                })
            });
    }

    render() {
        return(
            <article className="mb-4">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7"
                             dangerouslySetInnerHTML={{__html: this.state.content}}/>
                    </div>
                </div>
            </article>
        )
    }
}