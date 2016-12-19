import React, {PropTypes, Component} from "react";
import AppCtx from "AppCtx";
import TinyMCE from "react-tinymce";


export default class Introduction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            introduction: {},
            error: '',
        };
    }

    componentDidMount() {
        if (this.props.preview) {
            this.setState({
                error: null,
                introduction: {
                    text: this.props.preview.introductionDescription,
                },
            });
            return;
        }

        const id = this.props.params.id;
        let self = this,
            loginReq = new Request(AppCtx.serviceBasePath + 'api/competitions/' + id + '/description/introduction', {
                method: 'GET',
            });

        AppCtx.doWithToken(self.context, loginReq, "/competition/" + id + "/introduction").then((response) => {
            if (response.status !== 200) {
                console.log('unexpected response status: ' + response.status);
                response.json().then((data) => {
                    let err;
                    if (data.error) {
                        err = data.error;
                    } else {
                        err = data.message;
                    }
                    this.setState({
                        error: err,
                        introduction: {},
                    })
                });
                return;
            }
            response.json().then((data) => {
                this.setState({
                    introduction: data,
                    error: null,
                })
            });
        }).catch(reason => {
            this.setState({
                error: reason,
                formula: {},
            })
        });
    }

    edit = () => {
        this.setState({
            edit: true,
        })
    };
    save = () => {
        const id = this.props.params.id;
        let loginReq = new Request(AppCtx.serviceBasePath + '/api/competitions/' + id + '/description/introduction', {
            method: 'PUT',
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                body: this.state.introduction.text,
            })
        });

        AppCtx.doWithToken(self.context, loginReq, "/competition/" + id + "/introduction").then((response) => {
            if (response.status !== 204) {
                console.log('unexpected response status: ' + response.status);
                response.json().then(function (data) {
                    console.log("Err response body: ", data);
                });
                return;
            }
            this.setState({
                edit: false,
            })
        }).catch((reason) => {
            console.log(reason);
        });
    };

    printEditOpt = () => {
        if (this.state.edit) {
            return (
                <button className="pull-right btn btn-next" style={{borderWidth: "0px", paddingRight: "45px"}}
                        onClick={this.save}>
                    <i className="pe-7s-diskette" aria-hidden="true"/>Save
                </button>
            )
        }

        return (
            <button className="pull-right btn" style={{borderWidth: "0px", paddingRight: "45px"}}
                    onClick={this.edit}>
                <div><i className="pe-7s-pen"/> Edit</div>
            </button>
        )
    };

    handleEditorChange = (e) => {
        e.target.save();
        this.setState({
            introduction: {
                text: e.target.getContent(),
            },
        });
    };

    render() {
        return (
            <div className="card">
                <div className="header">
                    {this.props.owner && this.printEditOpt() }
                    <h4 className="title">Introduction</h4>
                    <p className="category">Full description about this competition</p>
                </div>
                <div className="content">
                    {this.state.error &&
                    <div className="content">
                        <div className="alert alert-danger fade in"><span><b>Error - </b> {this.state.error}</span>
                        </div>
                    </div>
                    }
                    <br/>
                    {this.state.edit ?
                        <TinyMCE
                            content={this.state.introduction.text}
                            config={{
                                height: "330px",
                                skin_url: '/dist/css/light',
                                insert_toolbar: ' quicktable',
                                plugins: 'image table link paste contextmenu textpattern autolink',
                                selection_toolbar: 'bold italic | quicklink h2 h3 blockquote | image',
                                content_css: [
                                    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                                    '//www.tinymce.com/css/codepen.min.css'
                                ]
                            }}
                            id="introductionDescription"
                            className="tiny-border"
                            onChange={this.handleEditorChange}
                        /> :
                        <div className="content" dangerouslySetInnerHTML={{__html: this.state.introduction.text}}></div>

                    }
                    <div className="footer">
                        <div className="legend">
                        </div>
                        <hr/>
                        <div className="stats">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

Introduction.contextTypes = {
    router: PropTypes.object.isRequired
};
