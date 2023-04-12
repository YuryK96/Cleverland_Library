import { AxiosResponse } from 'axios';
import { authAxios, instance } from './api';
import { CommentType } from '../redux-toolkit/commenting/commenting-type';



export const commentingAPI = {
    sendComment(  data:CommentType ) {
        return instance.post ('comments', { data}).then((res:AxiosResponse<DataType>) => res);
    },
    changeComment (data:CommentType, commentId: number | null) {
        return instance.put(`comments/${commentId}`, {data}  ).then( (res:AxiosResponse<DataType>) =>res  )
    }

};


type DataType = {
    attributes: {
        createdAt: string
        publishedAt: string
        rating: number
        text: string
        updatedAt: string
    }
    id: number
}
