import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketService.jsx"
import { Ticket } from "./Ticket.jsx"
import { TicketFilterBar } from "./TicketFilterBar.jsx"
import "./Tickets.css"
import { getAllEmployees } from "../../services/employeeService.jsx"

export const TicketList = ({ currentUser }) => {
    const [allTickets, setAllTickets] = useState([])
    const [filteredTickets, setFilteredTickets] = useState([])
    const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [allEmployees, setAllEmployees] = useState([])
    
    const getAndSetTickets = () => {
        getAllTickets().then(ticketsArray => {
            setAllTickets(ticketsArray)
        })
    }

    useEffect(() => {
        getAndSetTickets()
    }, []) // ONLY runs on initial render of component, as array is empty

    useEffect(() => {
        if (showEmergencyOnly) {
            const emergencyTickets = allTickets.filter(ticket => ticket.emergency === true)
            setFilteredTickets(emergencyTickets)
        } else {
            setFilteredTickets(allTickets)
        }
    }, [showEmergencyOnly, allTickets])

    useEffect(() => {
        const foundTickets = allTickets.filter(ticket => ticket.description.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredTickets(foundTickets)
    }, [searchTerm, allTickets])

    useEffect(() => {
        getAllEmployees().then(employeesArray => {
            setAllEmployees(employeesArray)
        })
    }, [])


    return <div className="tickets-container">
        <h2>Tickets</h2>
        <TicketFilterBar setShowEmergencyOnly={setShowEmergencyOnly} setSearchTerm={setSearchTerm} />
        <article className="tickets">
        {filteredTickets.map(ticketObj => {
            return (
                <Ticket 
                    ticket={ticketObj} 
                    allEmployees={allEmployees} 
                    currentUser={currentUser} 
                    getAndSetTickets={getAndSetTickets} 
                    key={ticketObj.id}
                />
            )
        })}
        </article>
    </div>
}