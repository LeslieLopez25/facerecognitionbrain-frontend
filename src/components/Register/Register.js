import React from "react";
import LoadingScreen from "react-loading-screen";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      loading: false,
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSignIn = async () => {
    this.setState({ loading: true });
    try {
      const response = await fetch(
        "https://facerecognitionbrain-api-ral3.onrender.com/register",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
          }),
        }
      );

      const user = await response.json();

      if (user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange("home");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <LoadingScreen
        loading={this.state.loading}
        bgColor="transparent"
        spinnerColor="#ffffff"
        textColor="#ffffff"
        logoSrc=""
        text="Loading..."
        className="text-xl w-fit mx-auto backdrop-blur-sm"
      >
        <article className="br3 ba b--black-40 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
          <main className="pa4 white">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0 center">Register</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    name="name"
                    id="name"
                    onChange={this.onNameChange}
                  />
                </div>
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
                  value="Register"
                />
              </div>
            </div>
          </main>
        </article>
      </LoadingScreen>
    );
  }
}

export default Register;
