import React from "react";
import "./ImageLinkForm.css";

export default function ImageLinkForm({ onInputChange, onButtonSubmit }) {
  return (
    <div>
      <p className="image-link-form-text">
        {"This Magic Brain will detect faces in your pictures. Give it a try."}
      </p>
      <div className="image-link-form-container">
        <div className="image-link-form-input-container form">
          <input
            className="image-link-form-input"
            type="text"
            onChange={onInputChange}
          />
          <button className="image-link-form-button" onClick={onButtonSubmit}>
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}
