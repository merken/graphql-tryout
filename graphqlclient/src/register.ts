
interface IRegister {
    register(name: string, impl: any): void;
    resolve(name: string): any;
}

class Register implements IRegister {

    private registrations: { [name: string]: any } = {};


    register(name: string, impl: any): void {
        if (this.hasRegistration(name)) {
            return;
        }
        this.registrations[name] = impl;
    }

    resolve(name: string) {
        if (!this.hasRegistration(name)) {
            return;
        }
        //.__proto__.constructor
        return this.registrations[name];
    }

    private hasRegistration(name: string): boolean {
        return this.registrations.hasOwnProperty(name);
    }
}

const register = new Register();

export default register;