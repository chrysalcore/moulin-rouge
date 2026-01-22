type Event = {
    name: string,
    desc: string,
    discount: number,
    date: string,
    img: string
}

const data: Event[] = [
    {
        name: 'San Valentin',
        desc: '',
        discount: 15,
        date: '14/2',
        img: 'valentin.png'
    },
    {
        name: 'Halloween',
        desc: '',
        discount: 25,
        date: '31/10',
        img: 'halloween.jpg'
    },
    {
        name: 'Christmas',
        desc: '',
        discount: 50,
        date: '24/12 - 31/12',
        img: 'christmas.jpg'
    },
    {
        name: 'New Year',
        desc: '',
        discount: 40,
        date: '1/1',
        img: 'halloween.jpg'
    },
    {
        name: "King's Day",
        desc: '',
        discount: 20,
        date: '6/1',
        img: 'christmas.jpg'
    }
]

export default data