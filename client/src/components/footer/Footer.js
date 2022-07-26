import React from "react";

import "./footer.css";

export default function Footer() {

    return(
        <div className="footer">
            © {new Date().getFullYear()}. All rights reserved.
        </div>
    );
}