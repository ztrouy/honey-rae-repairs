export const Ticket = (props) => {
    return (
        <section className="ticket" key={props.ticket.id}>
            <header className="ticket-info">#{props.ticket.id}</header>
            <div>{props.ticket.description}</div>
            <footer>
            <div>
                <div className="ticket-info">emergency</div>
                <div>{props.ticket.emergency ? "yes" : "no"}</div>
            </div>
            </footer>
        </section>
    )
}