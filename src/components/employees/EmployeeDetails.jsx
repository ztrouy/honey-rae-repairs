import { useParams } from "react-router-dom"
import { getEmployeeDetails } from "../../services/employeeService.jsx"
import { useEffect, useState } from "react"
import "./Employee.css"

export const EmployeeDetails = () => {
    const { employeeId } = useParams()
    
    const [employee, setEmployee] = useState({})
    
    useEffect(() => {
        getEmployeeDetails(employeeId).then(employee => {
            setEmployee(employee[0])
        })
    }, [])

    return (
        <section className="employee">
            <div className="employee-header">{employee.user?.fullName}</div>
            <div>
                <span className="employee-info">Email: </span>
                <span>{employee.user?.email}</span>
            </div>
            <div>
                <span className="employee-info">Specialty: </span>
                <span>{employee.specialty}</span>
            </div>
            <div>
                <span className="employee-info">Rate: </span>
                <span>{employee.rate}</span>
            </div>
            <div className="employee-footer">Currently working on {employee.employeeTickets?.length} tickets</div>
        </section>
    )
}