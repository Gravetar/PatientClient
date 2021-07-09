export class Appointment{
    constructor(
        public id:string, 
        public date?:string, 
        public fiodoctor?:string, 
        public time?:string,
        public office?: string
        ){}
}