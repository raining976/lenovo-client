const Notice = (msg, type ) => ElNotification({
    title: type,
    message: msg,
    type:type
})

const successNotice = (msg) => Notice(msg, 'success')
const errorNotice = (msg) => Notice(msg, 'error')
const warningNotice = (msg) => Notice(msg, 'warning')
const infoNotice = (msg) => Notice(msg, 'info')

export {
    successNotice,
    errorNotice,
    warningNotice,
    infoNotice
}