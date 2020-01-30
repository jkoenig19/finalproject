import React, { Component } from "react";
import { Input, FormBtn } from "../components/Form";
import API from "../utils/API";
import './style.css';
import Footer from "../components/Footer";


class SignupBakery extends Component {
    state = {
        username: "",
        password: "",
        name: "",
        phone: "",
        email: "",
        location: "",
        message: ""
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleBakeryNewSubmit = event => {
        event.preventDefault();
        API.getBakeries()
            .then(res => {
                const allBakeries = res.data;
                const usernameDuplicate = allBakeries.filter(bakery => bakery.username === this.state.username)
                if (usernameDuplicate.length !== 0) {
                    this.setState({ message: "Username already taken, please try again!" })
                    this.setState({ username: "" });
                }
                else {
                    API.saveBakery({
                        username: this.state.username,
                        password: this.state.password,
                        name: this.state.name,
                        location: this.state.location
                    })
                        .catch(err => console.log(err));
                    const user_variable = this.state.username;
                    sessionStorage.clear();
                    sessionStorage.setItem("username", user_variable)
                    sessionStorage.setItem("registered", "bakery")
                    this.setState({ message: "Success!" })
                    window.location.replace("/bakery")
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>  
                <div className="top">
                    <nav class="navbar navbar-expand-lg">
                        <i className="material-icons">cake</i> <a class="navbar-brand" href="/">Bakery Link</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav ml-auto">
                                <a className="nav-item nav-link active" href="/login-customer">Customer Log In <span class="sr-only">(current)</span></a>
                                <a className="nav-item nav-link active" href="/login-bakery">Bakery Log In</a>
                            </div>
                        </div>
                    </nav>
                </div>
        <div className="container-fluid">
        <div className="signup1">
            <p class="signUpP">Message: {this.state.message ? this.state.message : "None"}</p>
            <form>
                <div className="bakerSignup"></div>
                <p class="signUpP">Bakery sign up</p>
                <Input
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    name="username"
                    placeholder="username"
                />
                <Input
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    name="password"
                    placeholder="password"
                    type="password"
                />
                <Input
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    name="name"
                    placeholder="name"
                />
                <Input
                    value={this.state.location}
                    onChange={this.handleInputChange}
                    name="location"
                    placeholder="location"
                />
                <FormBtn
                    onClick={this.handleBakeryNewSubmit}
                >
                    Submit
                </FormBtn>
            </form>
            <br></br>
            <br></br>
            </div>
            <div className="images">
            <img className="loginPic"src={require("../images/white-round-cake-topped-with-yellow-slice-fruit-140831.jpg")} alt="yellowslice"/>            <img className="loginPic2"src={require("../images/baked-pastries-2872882.jpg")} alt="pastries"/>            <img className="loginPic3"src={require("../images/close-up-photo-of-brownies-3026804.jpg")}alt="brownie"/>
         
            </div>
            </div>
            <Footer></Footer>
            </div>
        )
    }
}

export default SignupBakery;