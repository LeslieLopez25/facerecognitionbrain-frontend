import React from "react";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    fetch("https://facerecognitionbrain-api-ral3.onrender.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((resp) => resp.json())
      .then((user) => {
        if (user && user.email) {
          this.props.loadUser(user);
          this.onRouteChange("home");
        }
      })
      .catch(console.log);
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-40 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 white">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black white bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign In"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange("register")}
                className="f6 link dim white db pointer"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
