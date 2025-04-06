const NavMenu = () => {
    const handleClick = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            // Calculate offset based on your sticky header height
            const offset = 80; // Adjust this value based on your header height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Update URL hash without jumping
            window.history.pushState(null, null, `#${id}`);
        }
    };

    return (
        <nav className="nav-menu">
            <a href="#about" onClick={(e) => handleClick(e, 'about')}>About</a>
            <a href="#degrees" onClick={(e) => handleClick(e, 'degrees')}>Degrees</a>
            <a href="#minors" onClick={(e) => handleClick(e, 'minors')}>Minors</a>
            <a href="#employment" onClick={(e) => handleClick(e, 'employment')}>Employment</a>
            <a href="#people" onClick={(e) => handleClick(e, 'people')}>People</a>
        </nav>
    );
};

export default NavMenu;