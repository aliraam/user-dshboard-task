import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";

const RoutesConfig: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            {/* Future routes can be added here */}
        </Routes>
    );
};

export default RoutesConfig;
