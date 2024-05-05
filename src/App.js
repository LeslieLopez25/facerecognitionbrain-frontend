import React, { useState, Suspense, lazy } from "react";
import ParticlesBg from "particles-bg";
import LoadingScreen from "react-loading-screen";

import "./App.css";

const FaceRecognition = lazy(() =>
  import("./components/FaceRecognition/FaceRecognition")
);
const Navigation = lazy(() => import("./components/Navigation/Navigation"));
const Logo = lazy(() => import("./components/Logo/Logo"));
const ImageLinkForm = lazy(() =>
  import("./components/ImageLinkForm/ImageLinkForm")
);
const Rank = lazy(() => import("./components/Rank/Rank"));
const SignIn = lazy(() => import("./components/Signin/Signin"));
const Register = lazy(() => import("./components/Register/Register"));

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

export default function App() {
  const [state, setState] = useState(initialState);

  const loadUser = (data) => {
    setState((prevState) => ({
      ...prevState,
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    }));
  };

  const calculateFaceLocation = (data) => {
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return data.outputs[0].data.regions.map((face) => {
      const clarifaiFace = face.region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      };
    });
  };

  const displayFaceBox = (boxes) => {
    setState((prevState) => ({ ...prevState, boxes: boxes }));
  };

  const onInputChange = (event) => {
    setState((prevState) => ({ ...prevState, input: event.target.value }));
  };

  const onButtonSubmit = () => {
    setState((prevState) => ({
      ...prevState,
      imageUrl: prevState.input,
    }));
    fetch("https://facerecognitionbrain-api-ral3.onrender.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("https://facerecognitionbrain-api-ral3.onrender.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setState((prevState) => ({
                ...prevState,
                user: {
                  ...prevState.user,
                  entries: count,
                },
              }));
            })
            .catch(console.log);
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setState(initialState);
    } else if (route === "home") {
      setState((prevState) => ({ ...prevState, isSignedIn: true }));
    }
    setState((prevState) => ({ ...prevState, route: route }));
  };

  const { isSignedIn, imageUrl, route, boxes } = state;

  return (
    <div className="App">
      <ParticlesBg
        class="particles-bg-canvas-self"
        type="thick"
        bg={{
          position: "fixed",
          height: "100%",
          width: "100%",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <Suspense
        fallback={
          <LoadingScreen
            loading={true}
            bgColor="transparent"
            spinnerColor="#ffffff"
            textColor="#ffffff"
            logoSrc=""
            text="Loading..."
            className="text-xl w-fit mx-auto backdrop-blur-sm"
          />
        }
      >
        <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank name={state.user.name} entries={state.user.entries} />
            <ImageLinkForm
              onInputChange={onInputChange}
              onButtonSubmit={onButtonSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
        ) : (
          <Register loadUser={loadUser} onRouteChange={onRouteChange} />
        )}
      </Suspense>
    </div>
  );
}
