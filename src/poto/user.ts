interface IUser {
    email: string
    pass: string
    token: string
}

export class User {

    //region PUBLIC_VARIABLES
    email: string
    pass: string
    token: string
    //endregion PUBLIC_VARIABLES

    //region CONST
    constructor(iUser: IUser = { email: null, pass: null, token: null }) {
        this.email = iUser.email
        this.pass = iUser.pass
        this.token = iUser.token
    }
    //endregion CONS T
}