interface IUser {
    id: number
    user: string
    email: string
    pass: string
    guser: boolean
    token: string
}

export class User {

    //region PUBLIC_VARIABLES
    id: number
    user: string
    email: string
    pass: string
    guser: boolean
    token: string
    //endregion PUBLIC_VARIABLES

    //region CONST
    constructor(iUser: IUser = {
        id: null,
        user: null,
        email: null,
        pass: null,
        guser: null,
        token: null
    }) {

        this.id = iUser.id
        this.user = iUser.user
        this.email = iUser.email
        this.pass = iUser.pass
        this.guser = iUser.guser
        this.token = iUser.token
    }
    //endregion CONS T
}