import React, {PropTypes, Component} from "react";
import {observer} from "mobx-react";
import DatePicker from "material-ui/DatePicker";
import TinyMCE from "react-tinymce";

@observer
export default class BasicDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
        };
        this.default = {
            msg: {
                shortDescription: "Just brief information about your competition",
            },
            startDate: () => {
                return new Date()
            },
            endDate: () => {
                let now = new Date();
                if (now.getMonth() == 11) {
                    return new Date(now.getFullYear() + 1, 0, now.getDate(), now.getHours(), now.getMinutes());
                } else {
                    return new Date(now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes());
                }
            },
        };
    }

    updateProperty = (event) => {
        this.setState({}); //required to refresh input
        this.props.data.competition[event.target.name] = event.target.value;
    };

    handleEndDate = (event, date) => {
        this.setState({}); //required to refresh input
        this.props.data.competition.endDate = date;
    };

    handleStartDate = (event, date) => {
        this.setState({}); //required to refresh input
        this.props.data.competition['startDate'] = date;
    };

    handleEditorChange = (e) => {
        e.target.save();
        this.props.data.competition[e.target.id] = e.target.getContent();
    };

    nextFormWrapper = (e) => {
        e.preventDefault();
        var self = this;

        if (this.props.data.competition.shortDescription == "") {
            this.setState({
                error: "Short description is required.",
            });
            return;
        }
        if (typeof this.props.data.competition.shortDescription == 'undefined') {
            this.props.data.competition.shortDescription = this.default.msg.shortDescription;
        }
        ['startDate', 'endDate']
            .forEach(function (entry) {
                if (typeof self.props.data.competition[entry] == 'undefined') {
                    self.props.data.competition[entry] = self.default[entry]();
                }
            });
        this.props.nextForm()
    };

    render() {
        const {data} = this.props;
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <form onSubmit={this.nextFormWrapper}>
                                    {/* control nav-bar */}
                                    <div className="container-fluid nav-background">
                                        <div className="row nav-box">
                                            <div className="col-md-4 nav-left">
                                            </div>
                                            <div className="col-md-4 nav-center">
                                                <h4 className="title">Basic Details</h4>

                                            </div>
                                            <div className="col-md-4 nav-right">
                                                <button className="btn btn-next" type="submit">
                                                    Next<span className="fa fa-angle-right"/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* form body */}
                                    <div className="content">
                                        <div>
                                            {this.state.error &&
                                            <div className="alert alert-danger fade in">
                                                <span><b>Error - </b> {this.state.error}</span>
                                            </div>
                                            }
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Competition name</label>
                                                        <input type="text"
                                                               className="form-control"
                                                               placeholder="Competition name"
                                                               required
                                                               name="name"
                                                               onChange={this.updateProperty}
                                                               value={data.competition.name}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-2 col-md-offset-1">
                                                    <div className="form-group">
                                                        <label>Competition Start</label>
                                                        <DatePicker
                                                            name="startDate"
                                                            minDate={new Date()}
                                                            textFieldStyle={{width: '100%'}}
                                                            value={this.props.data.competition.startDate || this.default.startDate()}
                                                            onChange={this.handleStartDate}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-2 ">
                                                    <div className="form-group has-error">
                                                        <label>Competition Deadline</label>
                                                        <DatePicker
                                                            name="endDate"
                                                            minDate={new Date()}
                                                            textFieldStyle={{width: '100%'}}
                                                            value={this.props.data.competition.endDate || this.default.endDate()}
                                                            onChange={this.handleEndDate}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label>Short Description</label>
                                                        <TinyMCE
                                                            content={data.competition.shortDescription || this.default.msg.shortDescription}
                                                            config={{
                                                                theme: 'inlite',
                                                                inline: true,
                                                                insert_toolbar: '',
                                                                plugins: '',
                                                                selection_toolbar: '',
                                                                content_css: [
                                                                    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                                                                    '//www.tinymce.com/css/codepen.min.css'
                                                                ]
                                                            }}
                                                            id="shortDescription"
                                                            className="tiny-border"
                                                            onChange={this.handleEditorChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

BasicDetails.propTypes = {
    nextForm: PropTypes.func.isRequired,
    data: PropTypes.shape({
        competition: PropTypes.shape({
            name: PropTypes.string,
            shortDescription: PropTypes.string,
        })
    })
};