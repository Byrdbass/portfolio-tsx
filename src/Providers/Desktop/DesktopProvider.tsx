import React from "react";

const DesktopContext = React.createContext<{
    DesktopView: boolean;
    setDesktopView: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    DesktopView: false,
    setDesktopView: () => {},
});

export default DesktopContext;