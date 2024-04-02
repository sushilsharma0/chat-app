import { Link } from "react-router-dom";
import CheckGender from "./CheckGender";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleGenderChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const { signup, loading } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center">
          SignUp
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">full name</span>
            </label>
            <input
              type="text"
              className="w-full input input-bordered h-10"
              placeholder="Full Name"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">username</span>
            </label>
            <input
              type="text"
              className="w-full input input-bordered h-10"
              placeholder="username"
              value={inputs.userName}
              onChange={(e) =>
                setInputs({ ...inputs, userName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="email"
              className="w-full input input-bordered h-10"
              placeholder="Email"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">password</span>
            </label>
            <input
              type="password"
              className="w-full input input-bordered h-10"
              placeholder="password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">confirm password</span>
            </label>
            <input
              type="password"
              className="w-full input input-bordered h-10"
              placeholder="confirm password"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>
          <CheckGender
            onHandleGenderChange={handleGenderChange}
            selectedGender={inputs.gender}
          />
          <Link
            to={"/login"}
            className="text-sm hover:underline hover:text-blue-700 mt-2 inline-block"
          >
            Already have an account ?
          </Link>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner spinner-loading"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
