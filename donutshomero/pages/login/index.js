import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAdminUser } from "../../redux/features/adminUser/adminUserSlice";
import LoadingButton from "../../components/LoadingButton/LoadingButton";

import s from "./login.module.scss";

export default function Login() {
  const dispatch = useDispatch();
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
    try {
      setLoginErr("");
      setLoading(true);
      const response = await axios.post(
        process.env.NODE_ENV === "production"
          ? "https://donutshomero.vercel.app/api/login"
          : "http://localhost:3000/api/login",
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.token;
      dispatch(setAdminUser({ accessToken }));
      localStorage.setItem("accessToken", accessToken);
      setLoginErr("");
      router.push("/admin");
    } catch (err) {
      setLoginErr(err?.response?.data?.error);
      setLoading(false);
    }
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
