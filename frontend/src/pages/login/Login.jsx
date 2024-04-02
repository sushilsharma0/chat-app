import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center">
          Login
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">username</span>
            </label>
            <input
              type="text"
              className="w-full input input-bordered h-10"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">password</span>
            </label>
            <input
              type="password"
              className="w-full input input-bordered h-10"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link
            to={"/signup"}
            className="text-sm hover:underline hover:text-blue-700 mt-2 inline-block"
          >
            Don't have an account ?
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
                "Sign in"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// starter code for this file
// export const Login = () => {
//     return (
//       <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//         <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//           <h1 className="text-3xl font-semibold text-center">
//             Login
//             <span className="text-blue-500"> ChatApp</span>
//           </h1>

//           <form>
//             <div>
//               <label className="label p-2">
//                 <span className="text-base label-text">username</span>
//               </label>
//               <input
//                 type="text"
//                 className="w-full input input-bordered h-10"
//                 placeholder="Enter username"
//               />
//             </div>
//             <div>
//               <label className="label p-2">
//                 <span className="text-base label-text">password</span>
//               </label>
//               <input
//                 type="password"
//                 className="w-full input input-bordered h-10"
//                 placeholder="Enter password"
//               />
//             </div>
//             <a
//               href="#"
//               className="text-sm hover:underline hover:text-blue-700 mt-2 inline-block"
//             >
//               Don't have an account ?
//             </a>
//             <div>
//               <button className="btn btn-block btn-sm mt-2">Login</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   };
