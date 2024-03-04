import { useEffect, useState } from "react"
import "./Form.css"
import { getEmployeeDetails } from "../../services/employeeService.jsx"

export const EmployeeForm = ({ currentUser }) => {
    const [employee, setEmployee] = useState({})

    useEffect(() => {
        getEmployeeDetails(currentUser.id).then(employeeArray => {
            const employeeObj = employeeArray[0]
            setEmployee(employeeObj)
        })
    }, [currentUser])

    const handleSave = () => {
        console.log("clicked")
    }

    return (
        <form className="profile">
            <h2>Update Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label>Specialty:</label>
                    <input 
                        type="text"
                        value={employee?.specialty}
                        onChange={event => {
                            const copy = { ...employee }
                            copy.specialty = event.target.value
                            setEmployee(copy)
                        }}
                        required
                        className="form-control"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Hourly Rate:</label>
                    <input 
                        type="number"
                        value={employee?.rate}
                        onChange={event => {
                            const copy = { ...employee }
                            copy.rate = event.target.value
                            setEmployee(copy)
                        }}
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