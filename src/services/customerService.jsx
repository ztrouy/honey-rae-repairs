export const getCustomerDetails = (customerId) => {
    return fetch(`http://localhost:8088/customers?userId=${customerId}&_expand=user`).then(res => res.json())
}

export const updateCustomer = (customer) => {
    const putOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
    }

    return fetch(`http://localhost:8088/customers/${customer.id}`, putOptions)
}