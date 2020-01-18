import React from "react";
import Button from 'react-bootstrap/Button';
import Footer from "../components/Footer";
import './style.css';


var Bakery = () => {
    return (
        <div className="bg">
            <div className="container">
            
            <div className="button">
                <Button className="my-3" variant="primary" size="lg" block>Create New Order</Button>
            </div>
            <div className="button">
                <Button className="my-3" variant="primary" size="lg" block>List Orders</Button>
            </div>
            <div className="button">
                <Button className="my-3" variant="primary" size="lg" block>Inventory</Button>
            </div>
        </div>
            <Footer />
        </div>
    );
}


export default Bakery;