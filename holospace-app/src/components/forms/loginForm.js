import React from 'react';
//import Validator from 'validator';

class Loginform extends React.Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = (data) => {
    const errors = {};
    //if (!Validator.isWmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Cannot be blank";
    return errors;
  }

  render() {
    const { data, errors, loading } = this.state;

    return (
      <form className="form login-form" onSubmit={this.onSubmit} loading={loading}>
        { errors.global &&
          <div className="error-message">
            <header>Something went wrong</header>
            <p className="message-body">{errors.global}</p>
          </div>
        }
        <div className="group" error={!!errors.email}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder=" "
            value={data.email}
            onChange={this.onChange}
            required
          />
          <label>Email</label>
          {/*errors.email && <span>errors.email</span>*/}
        </div>

        <div className="group" error={!!errors.password}>
          <input
            type="password"
            id="password"
            name="password"
            placeholder=" "
            value={data.password}
            onChange={this.onChange}
            required
          />
          <label>Password</label>
          {/*errors.password && <span>errors.password</span>*/}
        </div>
      </form>
    );
  }
}

export default LoginForm;
