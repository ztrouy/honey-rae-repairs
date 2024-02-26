import { useEffect, useState } from "react"
import { getStaffUsers } from "../../services/userService"
import { User } from "../../users/User.jsx"
import "./Employees.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getStaffUsers().then(employeesArray => {
            setEmployees(employeesArray)
        })
    }, [])

    return (
        <div className="employees">
            {employees.map(employeeObj => {
                return <User user={employeeObj} key={employeeObj.id} />
            })}
        </div>
    )
}