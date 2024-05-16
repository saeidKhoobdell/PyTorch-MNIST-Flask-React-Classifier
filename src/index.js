import React from "react";
import {createRoot} from "react-dom";
import App from "./app.jsx";
import Footer from "./footer.jsx";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);


const footerContainer = document.getElementById("footer");
const footerRoot = createRoot(footerContainer);
footerRoot.render(<Footer />);