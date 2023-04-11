import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import s from "./profile.module.scss";
import icon_photo from "../../assets/images/profile/Icon_photo.svg";
import avatar from "../../assets/images/avatar/avatar.png";


import { getUserProfile } from "../../redux-toolkit/profile/profile-selectos";
import { AppDispatch } from "../../redux-toolkit/store";
import { editProfilePhoto, getUser } from "../../redux-toolkit/profile/profile-thunks";
import { PersonalData } from "./personal-data";

export const Profile = () => {
    const user = useSelector(getUserProfile)
    const dispatch = useDispatch<AppDispatch> ()


    const choosePhoto= (e: {target:HTMLInputElement})=> {
        if (e.target?.files?.length && user) {
            dispatch(editProfilePhoto( {
                id: user.id,
                photo: e.target.files[0]
            } ) );
        }

    }

    useEffect( ()=> {

        if(!user){
            dispatch(getUser())
        }

    }, [user,dispatch] )

    if (user) {
        return <div className={s.profile}>

            <section className={s.personal_photo}>

                <div className={s.photo_wrapper}>
                <div className={s.photo}><img src={user.avatar ? `https://strapi.cleverland.by${user.avatar}` : avatar} alt="personal_photo" /></div>
                <div className={s.icon_photo}>
                    <div className={s.background_photo}><img src={ icon_photo} alt="icon_photo" />
                    </div>
                </div>
                    <input type='file' onChange={ (e)=> choosePhoto(e) } />
                </div>

                <div className={s.names}>
                    <span className={s.first_name}>{user.firstName}</span><span
                    className={s.last_name}>{user.lastName}</span>
                </div>

            </section>
           <PersonalData email={user.email} firstName={user.firstName} lastName={user.lastName} phone={user.phone} userName={user.username} userId={user.id}  />


            <section className={s.book_booked}> book_booked</section>
            <section className={s.book_taken}> book_taken</section>
            <section className={s.book_history}> book_history</section>

        </div>;
    }

      return  <div/>

};
