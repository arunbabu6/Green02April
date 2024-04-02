import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/Loader";

function SignUp() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const handleRegisteration = async (e) => {
        e.preventDefault();

        await axios
            .post("http://127.0.0.1:8000/api/accounts/register/", {
                username: userName,
                email: userEmail,
                password: userPassword,
                password2: userPassword,
            })
            .then((res) => {
                console.log(res.data);
                const token = res.data.token;
                localStorage.setItem("authToken", token);

                const t = localStorage.getItem("authToken");
                if (t) {
                    setLoading(true);
                    console.log("token --> ", t);
                    setTimeout(() => {
                        setLoading(false);
                        navigate("/signin");
                    }, 1800);
                } else {
                    console.log((e) => {
                        console.error("error with user registeration", e);
                    });
                }
            })
            .catch((e) => {
                console.error(e);
            });
    };

    return (
        <div className="fixed h-screen w-full bg-lime-50">
            <div className="h-2/4 w-100 p-20 font-extrabold text-[240px] bg-green-500 ">
                Nausicca&apos;s.
            </div>
            <div className="h-2/4 w-100 px-[700px] font-extrabold text-[240px] bg-lime-50">
                Green.
            </div>
            {/* <div className="blur-md"> */}
            <form
                className="absolute bg-opacity-30 hover:drop-shadow-2xl hover:bg-green-300 backdrop-filter h-3/4 w-auto p-6 bg-green-200 top-[10%] left-[32%] rounded-lg grid grid-flow-row gap-0 items-center"
                onSubmit={handleRegisteration}
            >
                <h1 className="text-green-700 text-4xl font-bold pt-4">
                    Nausicca&apos;s
                </h1>
                <div className="grid grid-flow-row gap-4 w-[400px]">
                    <label className="block">
                        <input
                            className="border-slate-200 placeholder:indent-4 placeholder-slate-400 h-12 outline-none w-full rounded-md "
                            type="text"
                            value={userName}
                            placeholder="Username"
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </label>
                    <label htmlFor="email">
                        <input
                            className="border-slate-200 placeholder:indent-4 placeholder-slate-400 outline-none h-12 w-full rounded-md "
                            type="text"
                            value={userEmail}
                            placeholder="Email"
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </label>
                    <label htmlFor="username">
                        <input
                            className="border-slate-200 placeholder:indent-4 placeholder-slate-400 outline-none h-12 w-full rounded-md "
                            type="password"
                            value={userPassword}
                            placeholder="Password"
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                    </label>
                </div>
                <button
                    className="rounded-lg text-green-700 h-12 hover:bg-green-400 hover:text-white"
                    type="submit"
                >
                    Sign Up
                </button>
                {loading && <>Loading........</>}
                <p>
                    Already have an account? <Link to="/signin">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default SignUp;
