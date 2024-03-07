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
    const [showOpenOnly, setShowOpenOnly] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [allEmployees, setAllEmployees] = useState([])
    
    const getAndSetTickets = () => {
        getAllTickets().then(ticketsArray => {
            if (currentUser.isStaff) {
                setAllTickets(ticketsArray)
            } else {
                const customerTickets = ticketsArray.filter(
                    ticket => ticket.userId === currentUser.id)
                setAllTickets(customerTickets)
            }
        })
    }

    useEffect(() => {
        getAndSetTickets()
    }, [currentUser])

    useEffect(() => {
        if (showEmergencyOnly) {
            const emergencyTickets = allTickets.filter(ticket => ticket.emergency === true)
            setFilteredTickets(emergencyTickets)
        } else {
            setFilteredTickets(allTickets)
        }
    }, [showEmergencyOnly, allTickets])

    useEffect(() => {
        if (showOpenOnly) {
            const openTickets = allTickets.filter(ticket => ticket.dateCompleted === "")
            setFilteredTickets(openTickets)
        } else {
            setFilteredTickets(allTickets)
        }
    }, [showOpenOnly, allTickets])

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
        <TicketFilterBar 
            setShowEmergencyOnly={setShowEmergencyOnly} 
            setSearchTerm={setSearchTerm} 
            setShowOpenOnly={setShowOpenOnly}
            currentUser={currentUser} 
        />
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