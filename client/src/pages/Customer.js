import React from "react";
import Button from 'react-bootstrap/Button';
import Footer from "../components/Footer";
import './style.css';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';


function Customer() {
    return (
        <div>
            <div className="top">
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a className="navbar-brand" href="/">
                        Bakery Link
      </a>
                </nav>
            </div>
            <div className="order">
                <Form>
                    <h1>Customer Order</h1>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="email" placeholder="name" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Date of pick up</Form.Label>
                        <Form.Control type="email" placeholder="date of pick up" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Size</Form.Label>
                        <Form.Control as="select">
                            <option>6" (feeds up to 8)</option>
                            <option>9" (feeds 12-14)</option>
                            <option>12" (feeds up to 28)</option>
                            <option>14" (feeds 34-40)</option>
                            <option>1/4 Sheet (feeds 18-20)</option>
                            <option>1/2 Sheet (feeds 35-40)</option>
                            <option>Tiered</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Flavor</Form.Label>
                        <Form.Control as="select">
                            <option>Vanilla</option>
                            <option>Chocolate</option>
                            <option>Carrot</option>
                            <option>Red velvet</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Buttercream Inside</Form.Label>
                        <Form.Control as="select">
                            <option>Vanilla</option>
                            <option>Chocolate</option>
                            <option>Almond</option>
                            <option>Blackberry</option>
                            <option>Mocha</option>
                            <option>Mint</option>
                            <option>Strawberry</option>
                            <option>Caramel</option>
                            <option>Blackberry</option>
                            <option>Peanut Butter</option>
                            <option>Raspberry</option>
                            <option>Blueberry</option>
                            <option>Cream Cheese</option>
                            <option>Ganache</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Buttercream Outside</Form.Label>
                        <Form.Control as="select">
                            <option>Vanilla</option>
                            <option>Chocolate</option>
                            <option>Almond</option>
                            <option>Blackberry</option>
                            <option>Mocha</option>
                            <option>Mint</option>
                            <option>Strawberry</option>
                            <option>Caramel</option>
                            <option>Blackberry</option>
                            <option>Peanut Butter</option>
                            <option>Raspberry</option>
                            <option>Blueberry</option>
                            <option>Cream Cheese</option>
                            <option>Ganache</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Writing on cake</Form.Label>
                        <Form.Control as="textarea" rows="3" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Decorations on cake</Form.Label>
                        <Form.Control as="textarea" rows="3" />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Cookie Quantity</Form.Label>
                        <Form.Control type="" placeholder="0" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Cupcake Quantity</Form.Label>
                        <Form.Control type="" placeholder="0" />
                    </Form.Group>
                    <div ClassName="submitOrder">
                        <Button as="input" type="submit" value="Submit" />
                    </div>
                </Form>
            </div>

        </div>

    );
}

export default Customer;