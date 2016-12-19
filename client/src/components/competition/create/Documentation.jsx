import React, {PropTypes, Component} from "react";
import {observer} from "mobx-react";
import TinyMCE from "react-tinymce";
import {Tabs, Tab} from "material-ui/Tabs";

@observer
export default class Data extends Component {
    constructor(props) {
        super(props);
        this.updateProperty = this.updateProperty.bind(this);
        this.state = {
            files: null,
            error: "",
        };
        this.default = {
            msg: {
                formulaDescription: '<p>Here you can put all information about your competition rules.</p>',
                datasetDescription: '<p>Here you should describe your data set -all information which are be useful for other user. </p>',
                introductionDescription: '<p>All information about your competition, which metric will be used to check uploaded solution etc.</p>',
            }
        };
    }

    updateProperty = (event) => {
        this.props.data.competition[event.target.name] = event.target.value;
    };

    handleEditorChange = (e) => {
        e.target.save();
        this.props.data.competition[e.target.id] = e.target.getContent();
    };
    nextFormWrapper = () => {
        var self = this,
            BreakException = {};
        try {
            ['formula', 'dataset', 'introduction'].forEach(name => {
                if (this.props.data.competition[name + 'Description'] == "") {
                    this.setState({
                        error: name + " description is required.",
                    });
                    throw BreakException;
                }
            });
        } catch (e) {
            return
        }

        ['formulaDescription', 'datasetDescription', 'introductionDescription'].forEach(function (entry) {
            if (typeof self.props.data.competition[entry] == 'undefined') {
                self.props.data.competition[entry] = self.default.msg[entry];
            }
        });
        this.props.nextForm()
    };

    render() {
        const {data, prevForm} = this.props;
        return (

            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                {/* control nav-bar */}
                                <div className="container-fluid nav-background">
                                    <div className="row nav-box">
                                        <div className="col-md-4 nav-left col-sm-4 col-xs-4">
                                            <button className="btn" onClick={prevForm}>
                                                <span className="fa fa-angle-left"/>Back
                                            </button>
                                        </div>
                                        <div className="col-md-4 nav-center col-sm-4 col-xs-4">
                                            <h4 className="title">Documentation</h4>

                                        </div>
                                        <div className="col-md-4 nav-right col-sm-4 col-xs-4">
                                            <button className="btn btn-next" onClick={this.nextFormWrapper}>
                                                Next<span className="fa fa-angle-right"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {this.state.error &&
                                <div className="alert alert-danger fade in">
                                    <span><b>Error - </b> {this.state.error}</span>
                                </div>
                                }
                                <Tabs
                                    value={this.state.tab}
                                    onChange={this.handleChange}
                                    inkBarStyle={{background: 'grey'}}>
                                    <Tab className="title" style={{color: "black !important", backgroundColor: "white"}}
                                         label="Full Description" value="a">
                                        <div className="form-group" style={{marginTop: "30px"}}>
                                            <TinyMCE
                                                content={data.competition.introductionDescription || this.default.msg.introductionDescription}
                                                config={{
                                                    height:"330px",
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
                                            />
                                        </div>
                                    </Tab>
                                    <Tab className="title" style={{color: "black !important", backgroundColor: "white"}}
                                         label="Dataset description" value="b">
                                        <div className="form-group" style={{marginTop: "30px"}}>
                                            <TinyMCE
                                                content={data.competition.datasetDescription || this.default.msg.datasetDescription}
                                                config={{
                                                    height:"330px",
                                                    skin_url: '/dist/css/light',
                                                    insert_toolbar: ' quicktable',
                                                    plugins: 'image table link paste contextmenu textpattern autolink',
                                                    selection_toolbar: 'bold italic | quicklink h2 h3 blockquote | image',
                                                    content_css: [
                                                        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                                                        '//www.tinymce.com/css/codepen.min.css'
                                                    ]
                                                }}
                                                id="datasetDescription"
                                                className="tiny-border"
                                                onChange={this.handleEditorChange}
                                            />
                                        </div>
                                    </Tab>
                                    <Tab className="title" style={{color: "black !important", backgroundColor: "white"}}
                                         label="Competition formula" value="c">
                                        <div className="form-group" style={{marginTop: "30px"}}>
                                            <TinyMCE
                                                content={data.competition.formulaDescription || this.default.msg.formulaDescription}
                                                config={{
                                                    height:"330px",
                                                    skin_url: '/dist/css/light',
                                                    insert_toolbar: ' quicktable',
                                                    plugins: 'image table link paste contextmenu textpattern autolink',
                                                    selection_toolbar: 'bold italic | quicklink h2 h3 blockquote | image',
                                                    content_css: [
                                                        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                                                        '//www.tinymce.com/css/codepen.min.css'
                                                    ]
                                                }}
                                                id="formulaDescription"
                                                className="tiny-border"
                                                onChange={this.handleEditorChange}
                                            />
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>

                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Data.propTypes = {
    nextForm: PropTypes.func.isRequired,
    prevForm: PropTypes.func.isRequired,
    competition: PropTypes.shape({
        introductionDescription: PropTypes.string,
        formulaDescription: PropTypes.string,
        datasetDescription: PropTypes.string,

    })
};