import {
  faAngleDown,
  faAngleUp,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPromoChosenDonuts,
  decrementPromoChosenQuantity,
  incrementPromoChosenQuantity,
  removeFromCart,
  removePromoChosenDonuts,
} from "../../../redux/features/cart/cartSlice";
import { incrementStock } from "../../../redux/features/donuts/donutsSlice";
import Quantity from "../Quantity/Quantity";
import TotalPrice from "../TotalPrice/TotalPrice";

import s from "./CartItemCard.module.scss";
import ChooseDonut from "./ChooseDonut/ChooseDonut";

export default function CartItemCard({ cartItem }) {
  const dispatch = useDispatch();
  const [showDonuts, setShowDonuts] = useState(false);
  const [chooseDonuts, setChooseDonuts] = useState(false);

  const single_donuts = useSelector((state) => state.donuts.single_donuts);

  const handleRemoveFromCart = () => {
    if (cartItem.donutsQuantity) {
      //si es una promo
      const qty = cartItem.donutsPromo.map((promo) => ({
        id: promo.donutId,
        qty: promo.donutQuantity,
      }));

      qty.map((el) =>
        dispatch(incrementStock({ id: el.id, qty: el.qty * cartItem.quantity }))
      );
    } else {
      //si es una single
      dispatch(incrementStock({ id: cartItem.id, qty: cartItem.quantity }));
    }
    dispatch(removeFromCart(cartItem.id));
  };



  return (
    <div className={s.container}>
      <div className={s.cart}>
        <div className={s.cart_flex}>
          {cartItem.donutsQuantity ? (
            <div className={s.cart_item_promo}>
              <div className={s.flex}>
                <p>Promo N°</p>
                <p className={s.name}>{cartItem.name}</p>
              </div>
              <div className={s.flex}>
                <p>Donas:</p>
                <p>{cartItem.donutsQuantity}</p>
              </div>
              <button onClick={() => setShowDonuts(!showDonuts)}>
                <p>VER DONAS</p>
                <p className={s.donas_mobile}>DONAS</p>
                <FontAwesomeIcon
                  icon={showDonuts ? faAngleUp : faAngleDown}
                  className={s.arrow_icon}
                />
              </button>
              {cartItem.id === "cl41rwcbi0205gcuwzxa71511" && (
                <button
                  className={s.choose_donuts_btn}
                  onClick={() => setChooseDonuts(!chooseDonuts)}
                >
                  ELEGIR <span>DONAS</span>
                </button>
              )}
              <p className={s.promo_price}>${cartItem.price}</p>
              <p className={s.promo_total_price}>
                ${cartItem.price * cartItem.quantity}
              </p>
            </div>
          ) : (
            <div key={cartItem.id} className={s.cart_item_single}>
              <p className={s.name}>{cartItem.name}</p>
              {!cartItem.donutsQuantity && (
                <div className={s.stock_container}>
                  <p>
                    <span>stock:</span>
                    {
                      single_donuts.filter(
                        (donut) => donut.id === cartItem.id
                      )[0].stock
                    }
                  </p>
                </div>
              )}
              <p className={s.single_price}>${cartItem.price}</p>
              <p className={s.single_total_price}>
                ${cartItem.price * cartItem.quantity}
              </p>
            </div>
          )}
          <div className={s.qty_and_trash}>
            <Quantity
              quantity={cartItem.quantity}
              id={cartItem.id}
              promo={cartItem.donutsQuantity}
            />
            <FontAwesomeIcon
              icon={faTrashCan}
              className={s.trash_icon}
              onClick={handleRemoveFromCart}
            />
          </div>
        </div>

        {showDonuts && (
          <div className={s.donuts_list}>
            {cartItem.id === "cl41rwcbi0205gcuwzxa71511" ? (
              <>
                <p>4 azucarada</p>
                <p>4 oreo</p>
                <p>4 rellenas a elección</p>
              </>
            ) : (
              cartItem.donutsPromo.map((promoDonut, i) => {
                return (
                  <p key={i}>
                    {promoDonut.donutQuantity} {promoDonut.donut.name}
                  </p>
                );
              })
            )}
          </div>
        )}

        {chooseDonuts && (
          <ChooseDonut single_donuts={single_donuts} cartItem={cartItem} />
        )}
      </div>
      <TotalPrice price={cartItem.price} quantity={cartItem.quantity} />
    </div>
  );
}
