import { useState } from "react";
import axios from "axios";

const Register = () => {
  // const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const regis = async (event) => {
    // Prevent default is to prevent the default behavior
    event.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/register`,
        {
          email,
          name,
          password,
        }
      );
      const { data } = response.data;
      const { token } = data;

      // Save our token
      localStorage.setItem("token", token);

      // Redirect to home
      // navigate("/");

      // Redirect to home or reload the home
      // This is temporary solution, the better solution is using redux
      window.location.replace("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error?.response?.data?.message);
        return;
      }

      alert(error?.message);
    }
  };

  return (
    <section className="flex justify-center items-center bg-[url('/login_page.jpg')] bg-cover py-8 min-h-screen w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 bg-slate-100 rounded-md gap-10 px-10 py-14">
        <div className="flex flex-col text-center justify-center">
          <h1 className="text-4xl font-bold my-2 text-slate-600">
            Access your account now!
          </h1>
          <h3 className="text-2xl font-semibold my-2 text-red-500">
            Please log in to your account.
          </h3>
          <p className="text-red-300">
            Enter your email and password to access everything we have to offer.
          </p>
        </div>
        <div>
          <form
            onSubmit={regis}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <h1 className="block text-gray-700 font-bold mb-5 text-2xl text-center">
                Login in to Your Account
              </h1>
              <input
                className="shadow appearance-none focus:border-red-400 border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none focus:border-red-400 border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-6">
              <input
                className="shadow focus:border-red-400 appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <p className="text-red-500 text-xs italic">
                Please enter your password.
              </p>
            </div>
            <div className="text-center">
              <button
                className=" bg-red-600 w-full hover:bg-red-700 md:px-6 md:py-2 text-white font-bold py-2 px-3 rounded-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </div>
            <div className="text-center">
              <p className="my-5 text-gray-700">or Sign Up Using</p>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="flex items-center gap-1 text-gray-700 "
                >
                  <img src="/google.svg" width={32} />
                  Google
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
