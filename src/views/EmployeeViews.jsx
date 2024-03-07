import { Outlet, Route, Routes } from "react-router-dom"
import { EmployeeNav } from "../components/nav/EmployeeNav.jsx"
import { Welcome } from "../components/welcome/Welcome.jsx"
import { TicketList } from "../components/tickets/TicketList.jsx"
import { CustomerList } from "../components/customers/CustomerList.jsx"
import { CustomerDetails } from "../components/customers/CustomerDetails.jsx"
import { EmployeeList } from "../components/employees/EmployeeList.jsx"
import { EmployeeDetails } from "../components/employees/EmployeeDetails.jsx"
import { EmployeeForm } from "../components/forms/EmployeeForm.jsx"

export const EmployeeViews = ({ currentUser }) => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <EmployeeNav/>
                    <Outlet/>
                </>
                } >
                <Route index element={<Welcome/>} />
                <Route path="tickets" element={<TicketList currentUser={currentUser} />} />
                <Route path="customers" >
                    <Route index element={<CustomerList/>}/>
                    <Route path=":customerId" element={<CustomerDetails/>}/> {/* /customers/:customerId */}
                </Route>
                <Route path="employees">
                    <Route index element={<EmployeeList/>} />
                    <Route path=":employeeId" element={<EmployeeDetails/>} />
                </Route>
                <Route path="profile" element={<EmployeeForm currentUser={currentUser} />}/>
            </Route>
        </Routes>
    )
}