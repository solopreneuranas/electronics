import { useNavigate } from "react-router-dom"

export default function EmptyCart(props) {

    var navigate = useNavigate()

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100%", height: "70vh" }}>
            <img src="https://cdn-icons-png.flaticon.com/512/3081/3081840.png" style={{ width: '15%' }} />
            <h3 style={{ fontWeight: 500, fontSize: 27, margin: 0 }}>
                {props.title}...
                <font style={{ color: '#00E9BF', cursor: "pointer" }} onClick={() => navigate('/')}>
                    Continue Shopping
                </font>
            </h3>
        </div>
    )
}