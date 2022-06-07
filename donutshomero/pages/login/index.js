import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";

import s from "./login.module.scss";
import LoadingButton from "../../components/LoadingButton/LoadingButton";

export default function Login() {
  const [loginErr, setLoginErr] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // if (auth.email && auth.accessToken) {
    //   setLoginErr("Ya estas logueado!");
    //   return;
    // }
    // try {
    //   setLoginErr("");
      setLoading(true);
    //   const response = await axios.post(
    //     // "http://localhost:3000/api/login",
    //     "https://www.alalacampo.com/api/login",
    //     data,
    //     {
    //       headers: { "Content-Type": "application/json" },
    //       withCredentials: true,
    //     }
    //   );
    //   const accessToken = response?.data?.token;
    //   setAuth({ email: data.email, accessToken });
    //   localStorage.setItem("accessToken", accessToken);
    //   setLoginErr("");
    //   router.push("/");
    // } catch (err) {
    //   setLoginErr(err?.response?.data?.error);
    //   setLoading(false);
    // }
  };

  return (
    <>
      <div className={s.container}>
        <p className={s.login}>HOLA DONU-ADMIN!</p>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <input
            autoFocus
            type="text"
            placeholder="alexis@gmail.com"
            required
            {...register("email")}
          />
          <input type="password" required {...register("password")} />
          <LoadingButton loading={loading} type="submit">
            LOGIN
          </LoadingButton>
        </form>
        <p className={s.err}>{loginErr && loginErr}</p>
      </div>
    </>
  );
}
