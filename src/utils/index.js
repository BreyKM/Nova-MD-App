const dateFormater = new Intl.DateTimeFormat(window.electronAPI.locale, {
    dateStyle: 'short',
    timeStyle: 'short',
})

export const formatDateFromMs = (ms) => dateFormater.format(ms)