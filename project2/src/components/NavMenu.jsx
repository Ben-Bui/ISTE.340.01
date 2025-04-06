const NavMenu = () => {
    const handleClick = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
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