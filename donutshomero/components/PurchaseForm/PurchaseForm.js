import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerData } from "../../redux/features/customerData/customerDataSlice";

import s from "./PurchaseForm.module.scss";
import GoBackButton from "../GoBackButton/GoBackButton";
import { useState } from "react";
import axios from "axios";
import LoadingButton from "../LoadingButton/LoadingButton";

const schema = yup.object().shape({
  fullName: yup.string().required("Nombre Completo es requiredo").min(2),
  phone: yup
    .number("Deben ser Números")
    .required("Número de celular es requerido")
    .min(9),
  address: yup.string().required("Dirección es requerida"),
  number: yup.number().required("Numeración es requerida"),
  addressLink: yup.string(),
  paymentMethod: yup
    .string()
    .typeError("Debe elegir un método de pago!")
    .required(),
  purchase: yup.array(),
});

export default function PurchaseForm({ setConfirmOrder, setShowCustomerForm }) {
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.customerData.data);

  const [showPhoneForm, setShowPhoneForm] = useState(
    customerData.phone ? false : true
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleGoBack = () => {
    setShowCustomerForm(false);
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const checkNumber = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        process.env.NODE_ENV === "production"
          ? `https://donutshomero.vercel.app/api/users`
          : `http://localhost:3000/api/users`,
        { number: phoneNumber }
      );

      if ((res.data.message = "user not found")) {
        dispatch(setCustomerData({ phone: phoneNumber }));
        setShowPhoneForm(false);
      }

      if (res.data.phone === phoneNumber) {
        dispatch(
          setCustomerData({
            addressLink: res.data.ubiLink,
            number: res.data.addressNumber,
            address: res.data.address,
            phone: res.data.phone,
            fullName: `${res.data.name} ${res.data.surname}`,
          })
        );
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      dispatch(setCustomerData(data));
      setConfirmOrder(true);
      setShowCustomerForm(false);
    } catch (e) {
      console.log({ onSubmitError: e });
    }
  };

  return (
    <div className={s.container}>
      <GoBackButton handleOnClick={handleGoBack} />
      <p>TUS DATOS</p>
      {showPhoneForm && (
        <form onSubmit={checkNumber} className={s.phone_form}>
          <label>Número Celular:</label>
          <input
            type="text"
            id="phone"
            value={phoneNumber}
            onChange={(e) => handlePhoneChange(e)}
          />
          {errors && <span className={s.error}>{errors.phone?.message}</span>}
          <div className={s.btn_container}>
            <LoadingButton loading={loading} text="SIGUIENTE" type="submit" />
          </div>
        </form>
      )}
      {!showPhoneForm && (
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <label htmlFor="fullName">
            Nombre Completo:<span>*</span>
          </label>
          <input
            type="text"
            id="fullName"
            defaultValue={customerData.fullName}
            {...register("fullName")}
          />
          {errors && (
            <span className={s.error}>{errors.fullName?.message}</span>
          )}

          <label htmlFor="phone">
            Número Celular:<span>*</span>
          </label>
          <input
            type="text"
            id="phone"
            defaultValue={customerData.phone}
            {...register("phone")}
          />
          {errors && <span className={s.error}>{errors.phone?.message}</span>}

          <label htmlFor="address">
            Dirección:<span>*</span>
          </label>
          <input
            type="text"
            id="address"
            defaultValue={customerData.address}
            {...register("address")}
          />
          {errors && <span className={s.error}>{errors.address?.message}</span>}

          <label htmlFor="number">
            Numeración:<span>*</span>
          </label>
          <input
            type="text"
            id="number"
            defaultValue={customerData.number}
            {...register("number")}
          />
          {errors && <span className={s.error}>{errors.number?.message}</span>}

          <label htmlFor="addressLink">Link Ubicación:</label>
          <input
            type="text"
            id="addressLink"
            defaultValue={customerData.addressLink}
            placeholder="opcional"
            {...register("addressLink")}
          />
          {errors && (
            <span className={s.error}>{errors.addressLink?.message}</span>
          )}

          <p>
            Método de Pago:<span>*</span>
          </p>
          <div className={s.payment_method}>
            <div>
              <input
                type="radio"
                id="cash"
                value="efectivo"
                {...register("paymentMethod")}
              />
              <label htmlFor="cash">EFECTIVO</label>
            </div>
            <div>
              <input
                type="radio"
                id="mercadopago"
                value="mercadopago"
                {...register("paymentMethod")}
              />
              <label htmlFor="mercadopago">MERCADO PAGO</label>
            </div>
            {errors && (
              <span className={s.error}>{errors.paymentMethod?.message}</span>
            )}
          </div>
          {/* </div> */}
          <div className={s.btn_container}>
            <button type="submit">SIGUIENTE</button>
          </div>
        </form>
      )}
    </div>
  );
}
