import Logo from "../assets/imgs/logo.png"

function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <div className="flex flex-col items-center mt-30 mb-3 gap-1">
        <img className="w-40" src={Logo} alt="Pokédev" />
        <p> Copyright &copy; {currentYear} Kaiodev</p>
    </div>
  )
}

export default Footer