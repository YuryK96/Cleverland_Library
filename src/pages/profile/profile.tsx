import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import s from "./profile.module.scss";
import icon_photo from "../../assets/images/profile/Icon_photo.svg";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import photo from '../../assets/images/profile/photo.jpg';
import { getUserProfile } from "../../redux-toolkit/profile/profile-selectos";
import { AppDispatch } from "../../redux-toolkit/store";
import { getUser } from "../../redux-toolkit/profile/profile-thunks";

export const Profile = () => {
    const user = useSelector(getUserProfile)
    const dispatch = useDispatch<AppDispatch> ()

    useEffect( ()=> {

        if(!user){
            dispatch(getUser())
        }

    }, [user,dispatch] )

    if (user) {
        return <div className={s.profile}>

            <section className={s.personal_photo}>
                <div className={s.photo}><img src={photo} alt="personal_photo" /></div>
                <div className={s.icon_photo}>
                    <div className={s.background_photo}><img src={icon_photo} alt="icon_photo" />
                    </div>
                </div>

                <div className={s.names}>
                    <span className={s.first_name}>{user.firstName}</span><span
                    className={s.last_name}>{user.lastName}</span>
                </div>

            </section>
            <section className={s.personal_info}> Info</section>


            <section className={s.book_booked}> book_booked</section>
            <section className={s.book_taken}> book_taken</section>
            <section className={s.book_history}> book_history</section>

        </div>;
    }

      return  <div/>

};
