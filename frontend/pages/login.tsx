import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import React,{useContext, useState} from "react";
import { AuthContext } from "contexts/authcontext"
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";


const schema = yup.object({
    email: yup.string().email("Invalid E-mail").required("E-mail is required"),
    password: yup
      .string()
      .required("Password is required")
  });

const Login = () => {
    const [backEndErrors, setBackEndErrors] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { signIn } = useContext(AuthContext);

  const getFormErrorMessage = (name: keyof typeof errors) => {
    return errors && errors[name] ? (
      <p className="p-error">{errors[name]?.message}</p>
    ) : (
      <p className="p-error">&nbsp;</p>
    );
  };

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

  const onSubmit = async (data: any) => {
    setLoading(true);
    await signIn(data);
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6 d-flex align-items-center h-100">
          <main className="form-signin w-100 m-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="h3 mb-3 fw-normal">Sign in</h1>

              
              <Controller
                  control={control}
                  name="email"
                  rules={{ required: "Email is required" }}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <div className="form-floating mb-3">
                <input
                {...field}
                  type="email"
                  className={`form-control ${errors.email}`}
                  id="email"
                  placeholder="email"
                />
                <label htmlFor="email">Email address</label>
              </div>
                    
                  )}
                />
              <Controller
                control={control}
                name="password"
                rules={{ required: "Password is required" }}
                defaultValue=""
                render={({ field, fieldState }) => (
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

              <button className="btn btn-primary py-2" type="submit" disabled={loading}>
                Sign in
              </button>
            </form>
            <Link className="my-3" href={`signup`} >Dont have account? Sign Up</Link>

          </main>
        </div>
      </div>
    </div>
  );
};

export default Login;

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
  
