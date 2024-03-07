import { Outlet, Route, Routes } from "react-router"
import { NavBar } from "../components/nav/EmployeeNav.jsx"
import { Welcome } from "../components/welcome/Welcome.jsx"
import { TicketList } from "../components/tickets/TicketList.jsx"
import { CustomerList } from "../components/customers/CustomerList.jsx"
import { CustomerDetails } from "../components/customers/CustomerDetails.jsx"
import { EmployeeList } from "../components/employees/EmployeeList.jsx"
import { EmployeeDetails } from "../components/employees/EmployeeDetails.jsx"
import { useEffect, useState } from "react"
import { EmployeeForm } from "../components/forms/EmployeeForm.jsx"
import { EmployeeViews } from "./EmployeeViews.jsx"
import { CustomerViews } from "./CustomerViews.jsx"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    setCurrentUser(honeyUserObject)
  }, [])
  
  return currentUser.isStaff ? <EmployeeViews currentUser={currentUser} /> : <CustomerViews currentUser={currentUser} />
}
