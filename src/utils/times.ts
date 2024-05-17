import dayjs from "dayjs";


export function formatDateTime(dateTime: Date|number|string) {
    if (!dateTime) return ''
    let today = dayjs().format("YYYY-MM-DD")
    let time = dayjs(dateTime).format("YYYY-MM-DD")
    const format = time === today ? 'HH:mm': 'YYYY-MM-DD HH:mm'
    return dayjs(dateTime).format(format);
}