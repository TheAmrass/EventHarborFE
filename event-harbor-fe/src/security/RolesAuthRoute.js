import {Navigate} from "react-router-dom";

function RolesAuthRoute({ children, allowedRoles }) {
    const userRole = localStorage.getItem('role'); // Funkce, která získá uživatelské role

    const rolePermissions = {
        USER: ['USER'],
        MODERATOR: ['USER', 'MODERATOR'],
        ADMIN: ['USER', 'MODERATOR', 'ADMIN'],
    };

    // Zkontroluj, zda je userRole definováno v rolePermissions
    if (!rolePermissions.hasOwnProperty(userRole)) {
        console.error(`Undefined role: ${userRole}`);
        return <Navigate to="/forbidden" />;
    }

    function canAccess(userRole, requiredRoles) {
        return requiredRoles.every(role => rolePermissions[userRole].includes(role));
    }

    if (canAccess(userRole, allowedRoles)) {
        return <>{children}</>;
    } else {
        return <Navigate to="/forbidden" />;
    }
}

export default RolesAuthRoute;
