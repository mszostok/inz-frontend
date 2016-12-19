import React, {PropTypes, Component} from "react";
import TinyMCE from "react-tinymce";
import {observer} from "mobx-react";
import {observable} from "mobx";
import AppCtx from "AppCtx";

@observer
export default class SendEmail extends Component {
    constructor(props, context) {
        super(props, context);
        this.data = observable({
            error: null,
            message: null,
            email: {},
        });
        this.submitEmailForm = this.submitEmailForm.bind(this);
    }

    handleEditorChange = (e) => {
        e.target.save();
        this.data.email[e.target.id] = e.target.getContent();
    };

    submitEmailForm = async function (e) {
        e.preventDefault();
        this.data.message = null;
        this.data.error = null;

        let desc = this.data.email.body;
        if (typeof desc == 'undefined' || desc == "") {
            this.data.error = "Email body is required.";
            return
        }

        const id = this.props.params.id;
        let generalInfoReq = new Request(AppCtx.serviceBasePath + '/api/emails/send-async', {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify(
                {
                    competitionId: id,
                    body: this.data.email.body,
                },
            )
        });

        try {
            let response = await AppCtx.doWithToken(this.context, generalInfoReq, '/competition/' + id + '/manage');
            if (response.status !== 202) {
                console.log('unexpected response status: ' + response.status);
                response.json().then(data => {
                    if (data.error) {
                        this.data.error = data.error;

                    } else {
                        this.data.error = data.message;
                    }
                    this.data.message = null;
                });
                return;
            }
            this.data.message = "Request was accepted";
            this.data.error = null;
        } catch (reason) {
            console.log('while sending email ', reason);
            this.data.error = "Service unavailable";
        }

    };

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="header">
                            <h4 className="title">Send email</h4>
                            <p className="description">Send email to all participants</p>
                        </div>

                        {/* form body */}
                        <div className="content" style={{paddingTop: "80px"}}>
                            <div>
                                {this.data.error &&
                                <div className="alert alert-danger fade in">
                                    <span><b>Error - </b> {this.data.error}</span>
                                </div>
                                }
                                {this.data.message &&
                                <div className="alert alert-info fade in">
                                    <span><b> Success - </b> {this.data.message}</span></div>
                                }
                                <form onSubmit={this.submitEmailForm}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <TinyMCE
                                                    content={ this.data.email.body}
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
                                                    id="body"
                                                    className="tiny-border"
                                                    onChange={this.handleEditorChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit"
                                            className="btn btn-info btn-fill pull-right">
                                        Send
                                    </button>
                                </form>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
