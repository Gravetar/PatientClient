export class Patient{
    constructor(
        public name?:string, 
        public surname?:string,
        public patronymic?: string,
        public dateofbirth?: string,
        public numberpolicy?: string,
        public numberpassport?: string,
        public phone?: string,
        public email?: string,
        public password?: string,
        public confirmPassword?: string
        ){}
}