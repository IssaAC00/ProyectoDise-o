import { User } from '../Model/User'

class AdminUser{
    private _users: User[];

    constructor(){}

    private search(email: string): User{
        for(const user of this._users){
            if (user.email === email) {
                return user;
            }
        }
        return null!;
    }

    public add(user: User):boolean{
        this._users.push(user);
        return true;
    }

    public see(email: string): User{
        return this.search(email);

    }

    public modify(user: User):boolean{
        this._users.forEach((item, index, arr) => {
            if (item.email === user.email){
                arr[index] = user;
            }
        });
        return true;
    }

    public delete(user: User):boolean{
        this._users = this._users.filter(item => item !== user);
        return true;
    }
}

export{ AdminUser };