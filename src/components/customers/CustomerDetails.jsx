import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCustomerDetails } from "../../services/customerService.jsx"
import "./Customer.css"

export const CustomerDetails = () => {
    // /customer/3
    // path="/customers/:customerId"

    const { customerId } = useParams() // { customerId: 3}

    const baseObj = {
        id: 0,
        address: "",
        phoneNumber: "",
        userId: 0,
        user: {
            id: 0,
            fullName: "",
            email: "",
            isStaff: false
        }
    }

    const [customer, setCustomer] = useState(baseObj)

    useEffect(() => {
        getCustomerDetails(customerId).then(customerArray => {
            setCustomer(customerArray[0])
        })
    }, [])

    console.log(customer)

    return (
        <section className="customer">
            <div className="customer-header">{customer.user.fullName}</div>
            <div>
                <span className="customer-info">Address: </span>
                <span>{customer.address}</span>
            </div>
            <div>
                <span className="customer-info">Phone Number: </span>
                <span>{customer.phoneNumber}</span>
            </div>
            <div>
                <span className="customer-info">Email: </span>
                <span>{customer.user.email}</span>
            </div>
        </section>
    )
}