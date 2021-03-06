import { DotPulse } from "@uiball/loaders";

import s from "./LoadingButton.module.scss";

export default function LoadingButton({
  loading,
  type,
  handleClick,
  children,
}) {
  return (
    <button
      type={type}
      onClick={handleClick ? handleClick : null}
      className={s.btn}
    >
      {loading ? (
        <div>
          <DotPulse size={40} speed={1.3} color="white" />
        </div>
      ) : (
        children
      )}
    </button>
  );
}
