import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { User, role } from "../../types/User";

export const Admin = () => {
    const auth = useContext(AuthContext);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        auth.pendingUser();
    }, []);

    const handleRoleChange = (userId: number, selectedRole: role) => {
        if (auth.pendingUsers) {
            const user = auth.pendingUsers.find(user => user.id === userId);
            if (user) {
                setSelectedUser({ ...user, role: selectedRole });
            }
        }
    };

    const handleApproval = () => {
        if (selectedUser) {
            const approved = 'APROVADO';
            auth.ApprovedOrDeniedUsers(selectedUser.id, selectedUser.role, approved);
            console.log("Usuário aprovado:", selectedUser);
        }
    };

    const handleDenial = () => {
        if (selectedUser) {
            const approved = 'RECUSADO';
            auth.ApprovedOrDeniedUsers(selectedUser.id, selectedUser.role, approved);
            console.log("Usuário negado:", selectedUser);
        }
    };

    return (
        <div>
            <h2>Admin Page</h2>
            <div>
                {auth.pendingUsers && (
                    <ul>
                        {auth.pendingUsers.map(user => (
                            <li key={user.id} style={{ backgroundColor: selectedUser && selectedUser.id === user.id ? "lightgreen" : "transparent" }}>
                                {user.name}
                                <button style={{ marginRight: "10px" }} onClick={() => handleRoleChange(user.id, role.USER)}>USER</button>
                                <button onClick={() => handleRoleChange(user.id, role.ADMIN)}>ADMIN</button>
                                <button style={{ marginLeft: "10px" }} onClick={() => setSelectedUser(null)}>Limpar seleção</button>
                            </li>
                        ))}
                    </ul>
                )}
                <div>
                    <button onClick={handleApproval}>Aprovar</button>
                    <button onClick={handleDenial}>Negar</button>
                </div>
            </div>
        </div>
    );
};