export const BASE_URL = 'http://146.70.88.25:8082/api/v1/'

export const SMS_URL = `${BASE_URL}sms/`
export const TEMPLATE_URL = `${SMS_URL}template`

export const getVariables = () => {
    return (
        fetch(`${SMS_URL}variable`)
        .then(res => res.json())
        .then(data => data)
    )
}

export const getTemplate = id => {
    return (
        fetch(`${TEMPLATE_URL}/${id}`)
        .then(res => res.json())
        .then(data => data)
    )
}

export const getSMSTypes = () => {
    return (
        fetch(`${TEMPLATE_URL}/smstype`)
        .then(res => res.json())
        .then(data => data)
    )
}

export const getLanguageTypes = () => {
    return (
        fetch(`${TEMPLATE_URL}/languagetype`)
        .then(res => res.json())
        .then(data => data)
    )
}

export const getFileSeparator = () => {
    return (
        fetch(`${TEMPLATE_URL}/fileseparator`)
        .then(res => res.json())
        .then(data => data)
    )
}

export const getDeliveryStatus = () => {
    return (
        fetch(`${SMS_URL}message/template/status`)
        .then(res => res.json())
        .then(data => data)
    )
}