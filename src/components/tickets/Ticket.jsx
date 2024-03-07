import { useEffect, useState } from "react"
import { assignTicket, deleteTicket, updateTicket } from "../../services/ticketService.jsx"

export const Ticket = ({ ticket, allEmployees, currentUser, getAndSetTickets }) => {
    const [assignedEmployee, setAssignedEmployee] = useState({})
    
    useEffect(() => {
        const foundEmployee = allEmployees.find(
            employee => employee.id === ticket.employeeTickets[0]?.employeeId
        )

        setAssignedEmployee(foundEmployee)
    }, [ticket, allEmployees])

    const handleClaim = () => {
        const currentEmployee = allEmployees.find(employee => employee.userId === currentUser.id)
        
        const newEmployeeTicket = {
            employeeId: currentEmployee.id,
            serviceTicketId: ticket.id
        }

        assignTicket(newEmployeeTicket).then(() => {
            getAndSetTickets()
        })
    }

    const handleClose = () => {
        const closedTicket = {
            id: ticket.id,
            userId: ticket.userId,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: new Date()
        }

        updateTicket(closedTicket).then(() => {
            getAndSetTickets()
        })
    }

    const handleDelete = () => {
        deleteTicket(ticket.id).then(() => {
            getAndSetTickets()
        })
    }
    
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
                    {currentUser.isStaff && !assignedEmployee ? (
                        <button 
                            className="btn btn-secondary"
                            onClick={handleClaim}
                        >Claim
                        </button>
                    ) : (
                        ""
                    )}

                    {/* If the logged in user is the assigned employee for the ticket, and there is no dateCompleted */}
                    {/* Then display a button to close the ticket */}
                    {assignedEmployee?.userId === currentUser.id && !ticket.dateCompleted ? (
                        <button 
                            className="btn btn-warning"
                            onClick={handleClose}
                        >Close
                        </button>
                    ) : (
                        ""
                    )}
                    {!currentUser.isStaff && (
                        <button 
                            className="btn btn-warning"
                            onClick={handleDelete}
                        >Delete
                        </button>
                    )}
                </div>
            </footer>
        </section>
    )
}