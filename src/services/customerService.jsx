export const getCustomerDetails = (customerId) => {
    return fetch(`http://localhost:8088/customers?userId=${customerId}&_expand=user`).then(res => res.json())
}