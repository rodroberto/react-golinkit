type LinkType = {
    _id?: string;
    imageName: string;
    title: string;
    url: string;
    userId?: string;
    stats?: any[];
}

type UserType = {
    _id: string;
    backgroundImage?: string;
    bio?: string;
    email: string;
    profileImage?: string;
    profileLink?: string;
    username: string;
}