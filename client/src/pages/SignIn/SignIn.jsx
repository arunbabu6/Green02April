import Logo from "../../assets/plant.svg";
import { useAuth0 } from "@auth0/auth0-react";

function SignIn() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="grid grid-cols-2">
      <div className="flex h-screen w-full items-center justify-center bg-lime-50 p-20">
        <div className=" grid h-3/4 w-3/4 grid-cols-1 items-center justify-center gap-10 rounded-xl bg-green-200 bg-opacity-80 p-6 backdrop-filter hover:bg-green-300 hover:drop-shadow-2xl ">
          <div className="grid h-full grid-cols-1">
            <div className="grid grid-cols-1 place-items-center">
              <img className="h-14 w-14" src={Logo} alt="" />
              <h1 className="text-5xl font-bold text-green-700">
                Nausicca&apos;s
              </h1>
            </div>
            <button
              className="h-12 rounded-lg text-green-700 hover:bg-green-400 hover:text-white"
              type="submit"
              onClick={() => loginWithRedirect()}
            >
              Sign In
            </button>
            <button
              className="h-12 rounded-lg text-green-700 hover:bg-green-400 hover:text-white"
              type="submit"
              onClick={() => loginWithRedirect({ screen_hint: "signup" })}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <div className="flex h-screen items-center justify-center bg-green-500">
        {/* Green. */}
        {/* create a Carousels of images <name> */}
        {/* <Carousel /> */}
      </div>
    </div>
  );
}

export default SignIn;
