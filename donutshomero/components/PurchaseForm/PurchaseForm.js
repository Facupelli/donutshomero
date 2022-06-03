import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import s from "./PurchaseForm.module.scss";

const schema = yup.object().shape({
  fullName: yup.string().required("Nombre Completo es requiredo").min(2),
  phone: yup.number("Deben ser Números").required("Número de celular es requerido").min(9),
  address: yup.string().required("Dirección es requerida"),
  number: yup.number().required("Numeración es requerida"),
  addressLink: yup.string(),
  paymentMethod: yup.string().required(),
  purchase: yup.array(),
});

export default function PurchaseForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("DATOS USUARIO", data);
    try {
    } catch (e) {
      console.log({ onSubmitError: e });
    }
  };

  return (
    <div className={s.container}>
      <p>TUS DATOS</p>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <label htmlFor="fullName">Nombre Completo:</label>
        <input type="text" id="fullName" {...register("fullName")} />
        {errors && <span className={s.error}>{errors.fullName?.message}</span>}

        <label htmlFor="phone">Número Celular:</label>
        <input type="text" id="phone" {...register("phone")} />
        {errors && <span className={s.error}>{errors.phone?.message}</span>}

        <label htmlFor="address">Dirección:</label>
        <input type="text" id="address" {...register("address")} />
        {errors && <span className={s.error}>{errors.address?.message}</span>}

        <label htmlFor="number">Numeración:</label>
        <input type="text" id="number" {...register("number")} />
        {errors && <span className={s.error}>{errors.number?.message}</span>}

        <label htmlFor="addressLink">Link Ubicación:</label>
        <input type="text" id="addressLink" {...register("addressLink")} />
        {errors && <span className={s.error}>{errors.addressLink?.message}</span>}

        <p>Método de Pago:</p>
        <div className={s.payment_method}>
          <div>
            <input
              type="radio"
              id="cash"
              value="cash"
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
        </div>
        {/* </div> */}
        <div className={s.btn_container}>
          <button type="submit">SIGUIENTE</button>
        </div>
      </form>
    </div>
  );
}
