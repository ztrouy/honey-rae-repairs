import { useEffect, useState } from "react"

export const Ticket = ({ ticket, allEmployees }) => {
    const [assignedEmployee, setAssignedEmployee] = useState({})
    
    useEffect(() => {
            const foundEmployee = allEmployees.find(
                employee => employee.id === ticket.employeeTickets[0]?.employeeId
            )
            
            setAssignedEmployee(foundEmployee)
    }, [ticket, allEmployees])

    return (
        <section className="ticket">
            <header className="ticket-info">#{ticket.id}</header>
            <div>{ticket.description}</div>
            <footer>
                <div>
                    <div className="ticket-info">assignee</div>
                    <div>
                        {assignedEmployee ? assignedEmployee.user?.fullName : "None"}
                    </div>
                </div>
                <div>
                    <div className="ticket-info">emergency</div>
                    <div>{ticket.emergency ? "yes" : "no"}</div>
                </div>
            </footer>
        </section>
    )
}