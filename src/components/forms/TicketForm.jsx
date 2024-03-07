import { useEffect, useState } from "react"
import "./Form.css"
import { createTicket, getTicketById, updateTicket } from "../../services/ticketService.jsx"
import { useNavigate, useParams } from "react-router-dom"

export const TicketForm = ({ currentUser }) => {
    const [ticket, setTicket] = useState({ description: "", emergency: false })

    const { ticketId } = useParams()

    const navigate = useNavigate()
    
    const handleSave = (event) => {
        event.preventDefault()
        
        if (ticketId && ticket.description) {
            const updatedTicket = {...ticket}
            updateTicket(updatedTicket).then(() => {
                navigate("/tickets")
            })
        } else if (ticket.description) {
            const newTicket = {
                userId: currentUser.id,
                description: ticket.description,
                emergency: ticket.emergency,
                dateCompleted: ""
            }
    
            createTicket(newTicket).then(() => {
                navigate("/tickets")
            })
        } else {
            window.alert("Please fill out the description!")
        }
    }

    useEffect(() => {
        if (ticketId) {
            getTicketById(ticketId).then(ticketObj => {
                setTicket(ticketObj)
            })
        }
    }, [])
    
    return (
        <form>
            <h2>New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={event => {
                            const ticketCopy = {...ticket}
                            ticketCopy.description = event.target.value
                            setTicket(ticketCopy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>
                        Emergency:
                        <input 
                            type="checkbox"
                            checked={ticketId ? ticket.emergency : false}
                            onChange={event => {
                                const ticketCopy = {...ticket}
                                ticketCopy.emergency = event.target.checked
                                setTicket(ticketCopy)
                            }}
                        />
                    </label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button className="form-btn btn-info" onClick={handleSave}>
                        {ticketId ? "Edit Ticket" : "Submit Ticket"}
                    </button>
                </div>
            </fieldset>
        </form>
    )
}