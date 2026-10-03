export default function Navbar(){
    return(
        <nav className = "navbar">
            <div className = "logo">
                <h2>ADM</h2>
            </div>

            <ul className = "nav-links">
                <li>Dashboard</li>
                <li>Cuentas</li>
                <li>Presupuesto</li>
            </ul>

            <button className = "boton-sketch">NUEVO GASTO</button>
        </nav>
    )
}