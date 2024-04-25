export const days = [
    {
        id: 0,
        name: 'monday',
        name_r: 'Пн.',
        name_r_long: 'Понедельник',
        link: '/main/signals/monday_free',
        admin_link: '/adminpanel/signals/monday_free'
    },
    {
        id: 1,
        name: 'tuesday',
        name_r: 'Вт.',
        name_r_long: 'Вторник',
        link: '/main/signals/tuesday_free',
        admin_link: '/adminpanel/signals/tuesday_free'
    },
    {
        id: 2,
        name: 'wednesday',
        name_r: 'Ср.',
        name_r_long: 'Среда',
        link: '/main/signals/wednesday_free',
        admin_link: '/adminpanel/signals/wednesday_free'
    },
    {
        id: 3,
        name: 'thursday',
        name_r: 'Чт.',
        name_r_long: 'Четверг',
        link: '/main/signals/thursday_free',
        admin_link: '/adminpanel/signals/thursday_free'
    },
    {
        id: 4,
        name: 'friday',
        name_r: 'Пт.',
        name_r_long: 'Пятница',
        link: '/main/signals/friday_free',
        admin_link: '/adminpanel/signals/friday_free'
    }
]

export type IWeek = {
    id: number
    name: string
    link: string
    admin_link?: string
    key: string
    name_r: string
    description?: string
}