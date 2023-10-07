import React, { useState } from "react";
import ParticlesBg from "particles-bg";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import "./App.css";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

const App = () => {
  const [user, setUser] = useState(initialState);
  const [imageUrl, setImageUrl] = useState("");
  const [route, setRoute] = useState("signin");
  const [boxes, setBoxes] = useState([]);

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
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
    setBoxes(boxes);
  };

  const onInputChange = (event) => {
    setImageUrl(event.target.value);
  };

  const onButtonSubmit = () => {
    setImageUrl(imageUrl);
    fetch("https://facerecognitionbrain-api-ral3.onrender.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: imageUrl,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        displayFaceBox(calculateFaceLocation(result));
        if (result) {
          fetch("https://facerecognitionbrain-api-ral3.onrender.com/image", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((result) => result.json())
            .then((count) => {
              setUser({ ...user, entries: count });
            });
        }
      })
      .catch((error) => console.log("error", error));
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setUser(initialState);
    } else if (route === "home") {
      setRoute(route);
    }
    setRoute(route);
  };

  return (
    <div className="App">
      <ParticlesBg type="thick" bg={true} />
      <Navigation isSignedIn={route === "home"} onRouteChange={onRouteChange} />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
        </div>
      ) : route === "signin" ? (
        <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
};
