import { useParams } from "react-router-dom"

export const CustomerDetails = () => {
    // /customer/3
    // path="/customers/:customerId"

    const { customerId } = useParams() // { customerId: 3}

    return (
        <div>Customer #{customerId}</div>
    )
}