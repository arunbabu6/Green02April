import plantImge2 from "../../assets/plant2.png";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="fixed h-screen w-full bg-neutral-50">
      <div className="grid-cols- grid w-full items-center justify-center p-4 md:grid-cols-2">
        <div className="mt-10 grid place-items-center">
          <h1 className="text-5xl font-extrabold">
            Nausicca&apos;s <span className="text-green-400">Green</span>
          </h1>
          <h2 className="mt-4 text-2xl font-semibold">
            A small business is as good as good as it tools.
          </h2>
          <p className="pt-6 md:w-[70%]">
            Empowering positive change by connecting grantors with impactful
            projects. At GrantorHub, we believe in making a difference. Explore
            and support projects that align with your values and create a
            lasting impact on communities around the world.
          </p>
          <button
            className="mt-10 h-12 w-full rounded-lg bg-green-300 text-green-700 hover:bg-green-500 hover:text-white md:w-32"
            type="submit"
            onClick={() => loginWithRedirect()}
          >
            Sign Up
          </button>
          <img
            className="h-auto cursor-pointer bg-clip-border hover:drop-shadow-2xl"
            src={plantImge2}
            alt="plant2"
            srcSet=""
          />
        </div>
        <div>
          <div className="m-4 h-20 items-center justify-center rounded-xl bg-green-300 p-4">
            <h1 className="font-extrabold">Measure your performance</h1>
            <p>
              we connect passionate individuals, we connect passionate
              individuals
            </p>
          </div>
          <div className="m-4 h-20 items-center justify-center rounded-xl bg-green-300 p-4">
            <h1 className="font-extrabold">Measure your performance</h1>
            <p>
              we connect passionate individuals, we connect passionate
              individuals
            </p>
          </div>
          <div className="m-4 h-20 items-center justify-center rounded-xl bg-green-300 p-4">
            <h1 className="font-extrabold">Measure your performance</h1>
            <p>
              we connect passionate individuals, we connect passionate
              individuals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
