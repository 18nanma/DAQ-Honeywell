import React, { Component } from 'react'
import { register } from './UserFunctions'


class Register extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            first_name_error: "",
            last_name_error: "",
            email_error: "",
            password_error: ""
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
          [event.target.name]: isCheckbox
            ? event.target.checked
            : event.target.value
        });
      };

      validate = () => {
         let first_name_error = "";
         let last_name_error = "";
         let email_error = "";
         let password_error = "";
    
        if (!this.state.first_name) {
          first_name_error = "first name cannot be blank";
        }
        if (!this.state.first_name) {
            last_name_error = "last name cannot be blank";
          }
    
        if (!this.state.email.includes("@")) {
          email_error = "invalid email";
        }
        if (!this.state.password) {
            password_error = "password cannot be blank";
        }
    
        if (email_error || first_name_error || last_name_error || password_error) {
          this.setState({ email_error, first_name_error,last_name_error, password_error });
          return false;
        }
    
        return true;
      };

    onSubmit (e) {
        e.preventDefault()

        const isValid = this.validate();
        if (isValid) {
            const newUser = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password
            }
            register(newUser).then(res => {
                this.props.history.push(`/login`)
            })
        };

        
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                            <div className="form-group">
                                <label htmlFor="first_name">First Name</label>
                                <input type="text"
                                    className="form-control"
                                    name="first_name"
                                    placeholder="Enter First Name"
                                    value={this.state.first_name}
                                    onChange={this.onChange} />
                                     <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.first_name_error}
                            </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                <input type="text"
                                    className="form-control"
                                    name="last_name"
                                    placeholder="Enter Last Name"
                                    value={this.state.last_name}
                                    onChange={this.onChange} />
                                     <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.last_name_error}
                                     </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={this.state.email}
                                    onChange={this.onChange} />
                                     <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.email_error}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password </label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={this.state.password}
                                    onChange={this.onChange} />
                                     <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.password_error}
                                </div>
                            </div>

                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register