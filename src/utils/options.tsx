import { BudgetOption, PeopleOption } from "./types";

export const SelectTravelsList:PeopleOption[] = [
    {
        id:1,
        title:'Just me',
        desc:'Solo',
        icon:'✈️',
        people:'1',
    },
    {
        id:2,
        title:'Couple',
        desc:'two',
        icon:'✈️✈️',
        people:'2',
    },
    {
        id:3,
        title:'Family',
        desc:'fam',
        icon:'✈️✈️✈️',
        people:'3 to 5',
    },
    {
        id:4,
        title:'Family/Frineds',
        desc:'grp',
        icon:'🏦',
        people:'5 or more',
    }
];

export const SelectBudgetOptions:BudgetOption[] = [
    {
        id:1,
        title:'Cheap',
        desc:'No money',
        icon:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc:'thoda money',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'money',
        icon:'🏦',
    },
]