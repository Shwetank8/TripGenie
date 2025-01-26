export interface BudgetOption {
    id:number,
    title:string,
    desc: string,
    icon:string,
}
export interface PeopleOption {
    id:number,
    title:string,
    desc:string,
    icon:string,
    people:string,
}
export interface FormValues {
    destination:string,
    days:number,
    budget:string,
    people:string,
}
