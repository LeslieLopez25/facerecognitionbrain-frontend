import React, { useState } from "react";
import LoadingScreen from "react-loading-screen";

export default function Register({ loadUser, onRouteChange }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
    loading: false,
  });

  const { email, password, name, loading } = userData;

  const onNameChange = (event) => {
    setUserData({ ...userData, name: event.target.value });
  };

  const onEmailChange = (event) => {
    setUserData({ ...userData, email: event.target.value });
  };

  const onPasswordChange = (event) => {
    setUserData({ ...userData, password: event.target.value });
  };

  const onSubmitSignIn = () => {
    setUserData({ ...userData, loading: true });
    fetch("https://facerecognitionbrain-api-ral3.onrender.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          onRouteChange("home");
        }
      })
      .catch(console.log)
      .finally(() => {
        setUserData({ ...userData, loading: false });
      });
  };

  return (
    <LoadingScreen
      loading={loading}
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
                  onChange={onNameChange}
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
                  onChange={onEmailChange}
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
                  onChange={onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={onSubmitSignIn}
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
