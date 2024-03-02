import { Outlet, Route, Routes } from "react-router"
import { NavBar } from "../components/nav/NavBar.jsx"
import { Welcome } from "../components/welcome/Welcome.jsx"
import { TicketList } from "../components/tickets/TicketList.jsx"
import { CustomerList } from "../components/customers/CustomerList.jsx"
import { CustomerDetails } from "../components/customers/CustomerDetails.jsx"
import { EmployeeList } from "../components/employees/EmployeeList.jsx"
import { EmployeeDetails } from "../components/employees/EmployeeDetails.jsx"
import { useEffect, useState } from "react"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    setCurrentUser(honeyUserObject)
  }, [])
  
  return (
    <Routes>
      <Route path="/" element={
          <>
            <NavBar/>
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
        </Route>
    </Routes>
  )
}
