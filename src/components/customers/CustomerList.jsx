import { useEffect, useState } from "react"
import { getNonStaffUsers } from "../../services/userService.jsx"
import { User } from "../../users/User.jsx"
import "./Customers.css"
import { Link } from "react-router-dom"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        getNonStaffUsers().then(customerArray => {
            setCustomers(customerArray)
        })
    }, [])

    return (
        <div className="customers">
            {customers.map(customerObj => {
                return (
                    <Link to={`/customers/${customerObj.id}`}>
                        <User user={customerObj} key={customerObj.id} />
                    </Link>
                )
            })}
        </div>
        
        
    )
}