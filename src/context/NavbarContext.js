import { createContext, useState, useContext } from 'react';

const NavbarContext = createContext();

export function NavbarProvider({ children }) {
    const [isNavbarDisabled, setIsNavbarDisabled] = useState(false);

    return (
        <NavbarContext.Provider value={{ isNavbarDisabled, setIsNavbarDisabled }}>
            {children}
        </NavbarContext.Provider>
    );
}

export function useNavbar() {
    return useContext(NavbarContext);
}