import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LdsSpinner from "../components/UI/LdsSpinner";
import { login, reset } from "../features/auth/authSlice";

const SignIn = () => {
  const dispatch = useDispatch();

  const { isLoading, isError, message } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(reset());
  }, []);

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <div className=" bg-[#fafafa] w-screen h-screen flex justify-center items-center">
      <div className="w-full flex flex-col gap-y-3 items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="contentContainer w-[20rem] flex flex-col text-center p-6 px-10 items-center justify-center gap-y-3"
        >
          <h1 className="text-3xl mb-6">Instation</h1>
          <input
            placeholder="username or email"
            className="input"
            type="email"
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && <p className="error">email is required.</p>}
          <input
            type="password"
            placeholder="Password"
            className="input"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password?.type === "required" && (
            <p className="error">password is required.</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="error">password minimum is 6.</p>
          )}
          <button className="w-full text-white font-semibold bg-blue-ig rounded-md p-1 mt-3 outline-none overflow-hidden">
            {isLoading && <LdsSpinner width={"2rem"} height={"2rem"} />}
            {!isLoading && "Log In"}
          </button>

          {isError && <p className="error">{message}</p>}
        </form>

        <div className="contentContainer w-[20rem] p-4 px-10 ">
          <p className="text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="text-blue-ig font-semibold">Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
