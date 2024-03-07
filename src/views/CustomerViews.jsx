import { Outlet, Route, Routes } from "react-router-dom"
import { Welcome } from "../components/welcome/Welcome.jsx"
import { CustomerNav } from "../components/nav/CustomerNav.jsx"
import { TicketList } from "../components/tickets/TicketList.jsx"
import { TicketForm } from "../components/forms/TicketForm.jsx"
import { CustomerForm } from "../components/forms/CustomerForm.jsx"

export const CustomerViews = ({ currentUser }) => {
    return (
        <Routes>
            <Route path="/" element={
            <>
                <CustomerNav/>
                <Outlet/>
            </>
        }>
                <Route index element={<Welcome/>}/>
                <Route path="tickets">
                    <Route index element={<TicketList currentUser={currentUser}/>} />
                    <Route path="create" element={<TicketForm currentUser={currentUser} />} />
                    <Route path=":ticketId" element={<TicketForm currentUser={currentUser} />} />
                </Route>
                <Route path="profile" element={<CustomerForm currentUser={currentUser} />} />
            </Route>
        </Routes>
    )
}