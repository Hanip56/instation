import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register as registerUser, reset } from "../features/auth/authSlice";
import LdsSpinner from "../components/UI/LdsSpinner";
import { useEffect } from "react";

const SignUp = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isError, isLoading, message } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(reset());
  }, []);

  const onSubmit = async (data) => {
    dispatch(registerUser(data));
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
            placeholder="Fullname"
            className="input"
            type="text"
            {...register("fullname", {
              required: true,
            })}
          />
          {errors.fullname && <p className="error">Fullname is required.</p>}
          <input
            placeholder="Username"
            className="input"
            type="text"
            {...register("username", {
              required: true,
            })}
          />
          {errors.username && <p className="error">username is required.</p>}

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
          <button className="w-full text-white font-semibold bg-blue-ig rounded-md p-1 mt-3 overflow-hidden">
            {isLoading && <LdsSpinner width={"2rem"} height={"2rem"} />}
            {!isLoading && "Sign Up"}
          </button>

          {isError && <p className="error">{message}</p>}
        </form>

        <div className="contentContainer w-[20rem] p-4 px-10 ">
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/signin">
              <span className="text-blue-ig font-semibold">Sign in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
