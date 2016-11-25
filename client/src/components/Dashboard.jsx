import React from "react";

const Dashboard = () => (
    <div className="content">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <div className="card ">
                        <div className="header">
                            <h4 className="title">Competitions that you participate</h4>
                            <p className="description">List of all competitions in which you participated</p>
                        </div>
                        <div className="content content-table">
                            <table className="table  table-hover">
                                <thead>
                                <th>Competition Name</th>
                                <th>Rank</th>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Dakota Rice</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>Minerva Hooper</td>
                                    <td>2</td>
                                </tr>
                                <tr>
                                    <td>Sage Rodriguez</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>Philip Chaney</td>
                                    <td>4</td>
                                </tr>
                                <tr>
                                    <td>Doris Greene</td>
                                    <td>5</td>
                                </tr>
                                <tr>
                                    <td>Mason Porter</td>
                                    <td>6</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card">
                        <div className="header">
                            <h4 className="title">Competitions that you created</h4>
                            <p className="description">List of all competitions create by you</p>
                        </div>
                        {/*<div id="chartHours" style={{paddingTop: "20px", paddingBottom: "20px"}}>*/}
                        {/*Currently, you don't created any competition.*/}
                        {/*</div>*/}
                        <div className="content content-table">
                            <table className="table  table-hover">
                                <tbody>
                                <tr>
                                    <td>Dakota Rice</td>
                                </tr>
                                <tr>
                                    <td>Minerva Hooper</td>
                                </tr>
                                <tr>
                                    <td>Sage Rodriguez</td>
                                </tr>
                                <tr>
                                    <td>Philip Chaney</td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                        <div className="footer">
                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Dashboard;








