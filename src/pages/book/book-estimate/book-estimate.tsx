import { useForm } from "react-hook-form";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import s from "./book-estimate.module.scss";
import { Button } from "../../../common/button";
import { getUserId } from "../../../redux-toolkit/auth/auth-selectos";
import { AppDispatch, AppStateType } from "../../../redux-toolkit/store";
import { changeComment, sendComment } from "../../../redux-toolkit/commenting/commenting-thunks";
import { getBook } from "../../../redux-toolkit/books/books-thunks";


export const BookEstimate: FC<BookEstimateType> = ({
                                                       toggleEstimateModule,
                                                       bookId,
                                                       userEstimate,userComment,
                                                       reloadBookPage,
                                                       isUserComment,
                                                       commentId
                                                   }) => {
    const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: { errors, isValid }
    } = useForm<FormValueEstimate>({ mode: "onChange" });
    const userId = useSelector(getUserId);


    // get user info from LocalStorage
    const userFirstName = useSelector((state: AppStateType) => state.authBranch.user?.firstName);
    // get user info from LocalStorage
    const userLastName = useSelector((state: AppStateType) => state.authBranch.user?.lastName);

    const dispatch = useDispatch<AppDispatch>();
    const [selectedStar, setSelectedStar] = useState<number>(userEstimate || 0);


    const onSubmit = async (data: FormValueEstimate) => {
        if (!isUserComment) {
            await dispatch(sendComment({
                rating: selectedStar === 0 ? 1 : selectedStar,
                text: data.text,
                book: bookId,
                user: String(userId),
                userFirstName,
                userLastName
            })).then(() => toggleEstimateModule());
        }
        else {

            await dispatch(changeComment({
                data: {
                    rating: selectedStar === 0 ? 1 : selectedStar,
                    text: data.text,
                    book: bookId,
                    user: String(userId),
                    userFirstName,
                    userLastName
                },
                commentId


            })).then(() => toggleEstimateModule());
        }
    };

    const selectCountStar = (star: number) => {
        setSelectedStar(star);
    };

    return <div role="presentation" data-test-id="modal-outer" className={s.bookLayout}>
        <div role="presentation" onClick={toggleEstimateModule} className={s.exitCover} />
        <div data-test-id="modal-rate-book" className={s.container}>
            <div role="presentation" data-test-id="modal-close-button"
                 onClick={toggleEstimateModule} className={s.closeButton}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="24" fill="#F9F9FA" />
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M30.7071 17.2929C31.0976 17.6834 31.0976 18.3166 30.7071 18.7071L18.7071 30.7071C18.3166 31.0976 17.6834 31.0976 17.2929 30.7071C16.9024 30.3166 16.9024 29.6834 17.2929 29.2929L29.2929 17.2929C29.6834 16.9024 30.3166 16.9024 30.7071 17.2929Z"
                          fill="url(#paint0_linear_25102_7177)" />
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M17.2929 17.2929C17.6834 16.9024 18.3166 16.9024 18.7071 17.2929L30.7071 29.2929C31.0976 29.6834 31.0976 30.3166 30.7071 30.7071C30.3166 31.0976 29.6834 31.0976 29.2929 30.7071L17.2929 18.7071C16.9024 18.3166 16.9024 17.6834 17.2929 17.2929Z"
                          fill="url(#paint1_linear_25102_7177)" />
                    <defs>
                        <linearGradient id="paint0_linear_25102_7177" x1="23.7479" y1="-9.03125"
                                        x2="-30.36" y2="33.8817"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#F83600" />
                            <stop offset="1" stopColor="#F9D423" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_25102_7177" x1="23.7479" y1="-9.03125"
                                        x2="-30.36" y2="33.8817"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#F83600" />
                            <stop offset="1" stopColor="#F9D423" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div data-test-id="modal-title" className={s.title}><span> Оцените книгу </span></div>

            <div className={s.subTitle}>Ваша оценка</div>

            <div className={s.rating}>
                <div data-test-id="rating" className={s.star_container}>
                    <div data-test-id="star" role="presentation" onClick={() => selectCountStar(5)}
                         className={`${s.star_item} ${selectedStar >= 5 && s.star_full}`}>
                        <svg data-test-id={selectedStar >= 1 && "star-active"} width="36"
                             height="34" viewBox="0 0 36 34" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.7046 1.1957C17.8135 0.934767 18.1865 0.934765 18.2954 1.1957L22.5496 11.388C22.7401 11.8443 23.1701 12.155 23.6625 12.1943L34.7049 13.0765C34.9909 13.0993 35.1005 13.4506 34.8878 13.6322L26.4747 20.8136C26.0986 21.1346 25.9338 21.6389 26.049 22.1201L28.6193 32.8576C28.6838 33.1271 28.3877 33.3508 28.141 33.2006L18.6872 27.4466C18.2652 27.1898 17.7348 27.1898 17.3128 27.4466L7.85899 33.2006C7.6123 33.3508 7.31615 33.1271 7.38067 32.8576L9.95101 22.1201C10.0662 21.6389 9.90136 21.1345 9.52531 20.8136L1.1122 13.6322C0.899474 13.4506 1.00913 13.0993 1.29514 13.0765L12.3375 12.1943C12.8299 12.155 13.2599 11.8443 13.4504 11.388L17.7046 1.1957Z"
                                stroke="#FFBC1F" />
                        </svg>

                    </div>
                    <div data-test-id="star"
                         className={`${s.star_item} ${selectedStar >= 4 && s.star_full}`}
                         role="presentation" onClick={() => selectCountStar(4)}>
                        <svg data-test-id={selectedStar >= 2 && "star-active"} width="36"
                             height="34" viewBox="0 0 36 34" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.7046 1.1957C17.8135 0.934767 18.1865 0.934765 18.2954 1.1957L22.5496 11.388C22.7401 11.8443 23.1701 12.155 23.6625 12.1943L34.7049 13.0765C34.9909 13.0993 35.1005 13.4506 34.8878 13.6322L26.4747 20.8136C26.0986 21.1346 25.9338 21.6389 26.049 22.1201L28.6193 32.8576C28.6838 33.1271 28.3877 33.3508 28.141 33.2006L18.6872 27.4466C18.2652 27.1898 17.7348 27.1898 17.3128 27.4466L7.85899 33.2006C7.6123 33.3508 7.31615 33.1271 7.38067 32.8576L9.95101 22.1201C10.0662 21.6389 9.90136 21.1345 9.52531 20.8136L1.1122 13.6322C0.899474 13.4506 1.00913 13.0993 1.29514 13.0765L12.3375 12.1943C12.8299 12.155 13.2599 11.8443 13.4504 11.388L17.7046 1.1957Z"
                                stroke="#FFBC1F" />
                        </svg>

                    </div>
                    <div data-test-id="star"
                         className={`${s.star_item} ${selectedStar >= 3 && s.star_full}`}
                         role="presentation" onClick={() => selectCountStar(3)}>
                        <svg data-test-id={selectedStar >= 3 && "star-active"} width="36"
                             height="34" viewBox="0 0 36 34" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.7046 1.1957C17.8135 0.934767 18.1865 0.934765 18.2954 1.1957L22.5496 11.388C22.7401 11.8443 23.1701 12.155 23.6625 12.1943L34.7049 13.0765C34.9909 13.0993 35.1005 13.4506 34.8878 13.6322L26.4747 20.8136C26.0986 21.1346 25.9338 21.6389 26.049 22.1201L28.6193 32.8576C28.6838 33.1271 28.3877 33.3508 28.141 33.2006L18.6872 27.4466C18.2652 27.1898 17.7348 27.1898 17.3128 27.4466L7.85899 33.2006C7.6123 33.3508 7.31615 33.1271 7.38067 32.8576L9.95101 22.1201C10.0662 21.6389 9.90136 21.1345 9.52531 20.8136L1.1122 13.6322C0.899474 13.4506 1.00913 13.0993 1.29514 13.0765L12.3375 12.1943C12.8299 12.155 13.2599 11.8443 13.4504 11.388L17.7046 1.1957Z"
                                stroke="#FFBC1F" />
                        </svg>

                    </div>
                    <div data-test-id="star"
                         className={`${s.star_item} ${selectedStar >= 2 && s.star_full}`}
                         role="presentation" onClick={() => selectCountStar(2)}>
                        <svg data-test-id={selectedStar >= 4 && "star-active"} width="36"
                             height="34" viewBox="0 0 36 34" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.7046 1.1957C17.8135 0.934767 18.1865 0.934765 18.2954 1.1957L22.5496 11.388C22.7401 11.8443 23.1701 12.155 23.6625 12.1943L34.7049 13.0765C34.9909 13.0993 35.1005 13.4506 34.8878 13.6322L26.4747 20.8136C26.0986 21.1346 25.9338 21.6389 26.049 22.1201L28.6193 32.8576C28.6838 33.1271 28.3877 33.3508 28.141 33.2006L18.6872 27.4466C18.2652 27.1898 17.7348 27.1898 17.3128 27.4466L7.85899 33.2006C7.6123 33.3508 7.31615 33.1271 7.38067 32.8576L9.95101 22.1201C10.0662 21.6389 9.90136 21.1345 9.52531 20.8136L1.1122 13.6322C0.899474 13.4506 1.00913 13.0993 1.29514 13.0765L12.3375 12.1943C12.8299 12.155 13.2599 11.8443 13.4504 11.388L17.7046 1.1957Z"
                                stroke="#FFBC1F" />
                        </svg>

                    </div>
                    <div data-test-id="star"
                         className={`${s.star_item} ${selectedStar >= 1 && s.star_full}`}
                         role="presentation" onClick={() => selectCountStar(1)}>
                        <svg data-test-id={selectedStar >= 5 && "star-active"} width="36"
                             height="34" viewBox="0 0 36 34" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.7046 1.1957C17.8135 0.934767 18.1865 0.934765 18.2954 1.1957L22.5496 11.388C22.7401 11.8443 23.1701 12.155 23.6625 12.1943L34.7049 13.0765C34.9909 13.0993 35.1005 13.4506 34.8878 13.6322L26.4747 20.8136C26.0986 21.1346 25.9338 21.6389 26.049 22.1201L28.6193 32.8576C28.6838 33.1271 28.3877 33.3508 28.141 33.2006L18.6872 27.4466C18.2652 27.1898 17.7348 27.1898 17.3128 27.4466L7.85899 33.2006C7.6123 33.3508 7.31615 33.1271 7.38067 32.8576L9.95101 22.1201C10.0662 21.6389 9.90136 21.1345 9.52531 20.8136L1.1122 13.6322C0.899474 13.4506 1.00913 13.0993 1.29514 13.0765L12.3375 12.1943C12.8299 12.155 13.2599 11.8443 13.4504 11.388L17.7046 1.1957Z"
                                stroke="#FFBC1F" />
                        </svg>

                    </div>
                </div>
            </div>

            <div className={s.comment}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <textarea data-test-id="comment" defaultValue={userComment || ''}   {...register("text", {})}
                              placeholder="Оставить отзыв" />
                </form>
            </div>

            <div className={s.button}>
                <Button id="button-comment" clickEvent={async () => {
                    await handleSubmit(onSubmit)().then(() => {
                        reloadBookPage();
                    });

                }} textClass="textClassEstimate" height="52px" margin="0"
                        bookPageText="ОЦЕНИТЬ" /></div>

        </div>


    </div>;
};


type FormValueEstimate = {
    text: string
}

type BookEstimateType = {
    toggleEstimateModule: () => void;
    bookId: string | undefined
    userComment: string | null
    userEstimate: number | null
    reloadBookPage: () => void
    isUserComment: boolean
    commentId: number | null
}
