import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerData } from "../../redux/features/customerData/customerDataSlice";

import s from "./PurchaseForm.module.scss";
import GoBackButton from "../GoBackButton/GoBackButton";

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
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <label htmlFor="fullName">Nombre Completo:</label>
        <input
          type="text"
          id="fullName"
          defaultValue={customerData.fullName}
          {...register("fullName")}
        />
        {errors && <span className={s.error}>{errors.fullName?.message}</span>}

        <label htmlFor="phone">Número Celular:</label>
        <input
          type="text"
          id="phone"
          defaultValue={customerData.phone}
          {...register("phone")}
        />
        {errors && <span className={s.error}>{errors.phone?.message}</span>}

        <label htmlFor="address">Dirección:</label>
        <input
          type="text"
          id="address"
          defaultValue={customerData.address}
          {...register("address")}
        />
        {errors && <span className={s.error}>{errors.address?.message}</span>}

        <label htmlFor="number">Numeración:</label>
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
          {...register("addressLink")}
        />
        {errors && (
          <span className={s.error}>{errors.addressLink?.message}</span>
        )}

        <p>Método de Pago:</p>
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
    </div>
  );
}
