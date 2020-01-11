import React, { Component } from 'react'
import { login } from './UserFunctions'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
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
        let email_error = "";
        let password_error = "";
   
   
       if (!this.state.email.includes("@")) {
         email_error = "invalid email";
       }
       if (!this.state.password) {
           password_error = "password cannot be blank";
       }
   
       if (email_error || password_error) {
         this.setState({ email_error, password_error });
         return false;
       }
   
       return true;
     };

    onSubmit (e) {
        e.preventDefault()

        const isValid = this.validate();
        if (isValid) {
            const user = {
                email: this.state.email,
                password: this.state.password
            }

            login(user).then(res => {
            // console.log(res.error)
                if (!res.error) {
                    this.props.history.push(`/profile`)
            }
            })
            //.catch(function () { 
            // console.log('Some error has occured'); 
        // }); 
        };
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
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
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login