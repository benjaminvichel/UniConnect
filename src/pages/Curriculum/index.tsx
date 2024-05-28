import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

export const Curriculum = () => {
    const auth = useContext(AuthContext);
    const [image, setImage] = useState<File | null>(null);



    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const uploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (image) {
            auth.uploadImage(image);
        } else {
            console.error('Nenhuma imagem selecionada');
        }
    };

    return (
        <div><h2>Meu curriculo</h2>
            <p>Olá {auth.user?.name}!, como vai?</p>
            <form onSubmit={uploadImage}>
                <input type="file" name="image" onChange={handleImageChange} />
                <button type="submit">Salvar</button>
            </form>
            <img
                src={`data:image/jpeg;base64,${auth?.user?.profilePicture}`}
                alt="Imagem de Perfil"
            />
        </div>

    )
}
