import { User } from "../../../common/model/user.i";

export interface Post {
    userId: string;
    id: string;
    title: string;
    body: string;
}

export interface PostWithUser extends Post {
    user: User | undefined;
}