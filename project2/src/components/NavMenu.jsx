const NavMenu = () => {
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if(el) {
            window.scrollTo({
                top: el.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav className="nav-menu">
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a>
            <a href="#degrees" onClick={(e) => { e.preventDefault(); scrollTo('degrees'); }}>Degrees</a>
            <a href="#minors" onClick={(e) => { e.preventDefault(); scrollTo('minors'); }}>Minors</a>
            <a href="#employment" onClick={(e) => { e.preventDefault(); scrollTo('employment'); }}>Employment</a>
            <a href="#people" onClick={(e) => { e.preventDefault(); scrollTo('people'); }}>People</a>
        </nav>
    );
};

export default NavMenu;