import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";



export const Curriculum = () => {
    const auth = useContext(AuthContext);
    return (
        <div><h2>Meu curriculo</h2>
            <p>Olá {auth.user?.name}!, como vai?</p>


        </div>

    )
}
