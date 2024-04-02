import React from "react";

const CheckGender = ({ onHandleGenderChange, selectedGender }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          htmlFor="gender"
          className={`label gap-2 cursor-pointer ${
            selectedGender === "male" ? "selected" : ""
          }`}
        >
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            name="gender"
            className="checkbox checkbox-accent"
            checked={selectedGender === "male"}
            onChange={() => onHandleGenderChange("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          htmlFor="gender"
          className={`label gap-2 cursor-pointer ${
            selectedGender === "female" ? "selected" : ""
          }`}
        >
          <span className="label-text">female</span>
          <input
            type="checkbox"
            className="checkbox checkbox-secondary"
            name="gender"
            checked={selectedGender === "female"}
            onChange={() => onHandleGenderChange("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default CheckGender;
