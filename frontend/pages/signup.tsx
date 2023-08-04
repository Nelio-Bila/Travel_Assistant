import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import React, {  useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";

import Router from "next/router";
import { signup } from "@/services/UserService";

const schema = yup.object({
  email: yup.string().email("Invalid E-mail").required("E-mail is required"),
  password: yup.string().required("Password is required"),
});

const Signup = () => {
  const [backEndErrors, setBackEndErrors] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    reValidateMode: "onBlur",
    resolver: yupResolver(schema),
  });

  const getFormErrorMessage = (name: keyof typeof errors) => {
    return errors && errors[name] ? (
      <p className="invalid-feedback text-danger">{errors[name]?.message}</p>
    ) : (
      <p className="invalid-feedback text-danger">&nbsp;</p>
    );
  };

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await signup(data);
      if (
        response !== null &&
        typeof response === "object" &&
        response.hasOwnProperty("message") &&
        response.hasOwnProperty("user")
      ) {
        Router.push("login");
      } else {
        setBackEndErrors(response.response.data.errors);
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6 d-flex align-items-center h-100">
          <main className="form-signin w-100 m-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="h3 mb-3 fw-normal">Sign up</h1>

              {backEndErrors.length > 0 &&(<div className="alert alert-danger" role="alert">
                {backEndErrors.length > 0
                  ? backEndErrors.map((error: any) => (
                      <p key={error.param}>
                        {" "}
                        {error.msg}{" "}
                      </p>
                    ))
                  : null}
              </div>)}
              <Controller
                control={control}
                name="email"
                rules={{ required: "Email is required" }}
                defaultValue=""
                render={({ field }) => (
                  <div className="form-floating mb-3">
                    <input
                      {...field}
                      type="email"
                      className={`form-control ${errors.email}`}
                      id="email"
                      placeholder="email"
                    />
                    <label htmlFor="email">Email address</label>
                    {getFormErrorMessage(field.name)}
                  </div>
                )}
              />
              <Controller
                control={control}
                name="password"
                rules={{ required: "Password is required" }}
                defaultValue=""
                render={({ field }) => (
                  <div className="form-floating mb-3">
                    <input
                      {...field}
                      type="password"
                      className={`form-control`}
                      id="password"
                      placeholder="Password"
                    />
                    <label htmlFor="password">Password</label>
                    {getFormErrorMessage(field.name)}
                  </div>
                )}
              />

              <button
                className="btn btn-primary py-2"
                type="submit"
                disabled={loading}
              >
               {loading ? (
                <>
                  <div className="spinner-border text-white me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  Processing
                  </>
                ) : (
                  <span>Sign up</span>
                )}
              </button>
            </form>
            <Link className="my-3" href={`login`}>
              Already have account? Sign In
            </Link>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Signup;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["assistant_token"]: token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
