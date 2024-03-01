import { useParams } from "react-router-dom"
import { getEmployeeDetails } from "../../services/employeeService.jsx"
import { useEffect, useState } from "react"

export const EmployeeDetails = () => {
    const { employeeId } = useParams()
    
    // const baseObj = {
    //     id: 0,
    //     specialty: "",
    //     rate: "",
    //     userId: 0,
    //     employeeTickets: [],
    //     user: {
    //         id: 0,
    //         fullName: "",
    //         email: "",
    //         isStaff: true
    //     }
    // }

    const [employee, setEmployee] = useState({})
    
    useEffect(() => {
        getEmployeeDetails(employeeId).then(employee => {
            setEmployee(employee[0])
        })
    }, [])

    console.log(employee)

    return (
        <div className="employee">
            <div className="employee-header"></div>
            <div>
                <span className="employee-info">Email</span>
                <span>{employee?.user?.email}</span>
            </div>
            <div>
                <span className="employee-info">Specialty</span>
                <span>{employee?.specialty}</span>
            </div>
            <div>
                <span className="employee-info">Rate</span>
                <span>{employee?.rate}</span>
            </div>
            <div className="employee-footer">Currently working on {employee?.employeeTickets?.length} tickets</div>
        </div>
    )
}