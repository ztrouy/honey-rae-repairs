import { useEffect, useState } from "react"
import "./Form.css"
import { getCustomerDetails, updateCustomer } from "../../services/customerService.jsx"
import { useNavigate } from "react-router-dom"

export const CustomerForm = ({ currentUser }) => {
    const [customer, setCustomer] = useState({})


    useEffect(() => {
        getCustomerDetails(currentUser.id).then(customerArray => {
            const customerObj = customerArray[0]
            setCustomer(customerObj)
        })
    }, [currentUser])


    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const stateCopy = {...customer}
        stateCopy[event.target.name] = event.target.value
        setCustomer(stateCopy)
    }

    const handleSave = (event) => {
        event.preventDefault()

        const editedCustomer = {
            id: customer.id,
            address: customer.address,
            phoneNumber: customer.phoneNumber,
            userId: customer.userId
        }

        updateCustomer(editedCustomer).then(() => {
            navigate("/tickets")
        })
    }
    


    return (
        <form className="profile">
            <h2>Update Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label>Address:</label>
                    <input 
                        type="text"
                        name="address"
                        value={customer?.address ? customer.address : ""}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input 
                        type="text"
                        name="phoneNumber"
                        value={customer?.phoneNumber ? customer.phoneNumber : ""}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button
                        className="form-btn btn-primary"
                        onClick={handleSave}
                    >Save Profile</button>
                </div>
            </fieldset>
        </form>
    )
}