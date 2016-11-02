import React, {PropTypes} from "react";
import "../assets/sass/blue.scss";

const Base = ({children}) => (
    <div>


        { /* child component will be rendered here */ }
        {children}

    </div>
);

Base.propTypes = {
    children: PropTypes.object.isRequired
};

export default Base;


