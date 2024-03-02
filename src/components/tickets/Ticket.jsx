import { useEffect, useState } from "react"

export const Ticket = ({ ticket, allEmployees, currentUser }) => {
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
                <div className="btn-container">
                    {/* If the logged in user is an employee, and no associated employee ticket */}
                    {/* Then display a button to claim the ticket */}

                    {/* If the logged in user is the assigned employee for the ticket, and there is no dateCompleted */}
                    {/* Then display a button to close the ticket */}
                </div>
            </footer>
        </section>
    )
}