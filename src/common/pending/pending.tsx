import s from "./pending.module.scss";
import spinner from "../../assets/images/spinner/spinner.svg";

export const Pending = () =>
    (
        <div className={s.pending} data-test-id="loader">

            <div className={s.spinner}>
                <img loading='eager' src={spinner} alt="spinner" />
            </div>

        </div>
    );

