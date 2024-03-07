export const getAllTickets = () => {
    return fetch("http://localhost:8088/serviceTickets?_embed=employeeTickets").then(res => res.json())
}

export const assignTicket = (employeeTicket) => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employeeTicket)
    }
    
    return fetch("http://localhost:8088/employeeTickets", postOptions)
}

export const updateTicket = (ticket) => {
    const putOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ticket)
    }
    
    return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, putOptions)
}

export const deleteTicket = (ticketId) => {
    const deleteOptions = {
        method: "DELETE"
    }

    return fetch(`http://localhost:8088/serviceTickets/${ticketId}`, deleteOptions)
}