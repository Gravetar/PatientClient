export class CardView{
    constructor(
        public diagnose?:string, 
        public namedoctor?:string, 
        public surnamedoctor?:string,
        public patronymicdoctor?: string,
        public date?: string,
        public type?: string
        ){}
}