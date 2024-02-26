import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketService.jsx"
import { Ticket } from "./Ticket.jsx"
import { TicketFilterBar } from "./TicketFilterBar.jsx"
import "./Tickets.css"

export const TicketList = () => {
    const [allTickets, setAllTickets] = useState([])
    const [filteredTickets, setFilteredTickets] = useState([])
    const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    

    useEffect(() => {
        getAllTickets().then(ticketsArray => {
        setAllTickets(ticketsArray)
        console.log("Tickets are set!")
        })
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


    return <div className="tickets-container">
        <h2>Tickets</h2>
        <TicketFilterBar setShowEmergencyOnly={setShowEmergencyOnly} setSearchTerm={setSearchTerm} />
        <article className="tickets">
        {filteredTickets.map(ticketObj => {
            return <Ticket ticket={ticketObj} key={ticketObj.id}/>
        })}
        </article>
    </div>
}