import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import WebViewer from "@pdftron/webviewer";

export const Curriculum = () => {
    const auth = useContext(AuthContext);
    const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
    const viewerDiv = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchPDF = async () => {
            try {
                const pdfBlob = await auth.getPDF(); // Agora é apenas um Blob diretamente
                if (pdfBlob instanceof Blob) { // Verifica se é um Blob
                    console.log("Recebido PDF do backend");

                    setPdfBlob(pdfBlob);

                    if (viewerDiv.current) {
                        const blobUrl = URL.createObjectURL(pdfBlob);
                        WebViewer({
                            path: '/lib',
                            initialDoc: blobUrl,
                            // Outras configurações e props necessárias para o visualizador de PDF
                        }, viewerDiv.current);
                    }
                } else {
                    console.error("Resposta inválida do servidor");
                }
            } catch (error) {
                console.error('Erro ao buscar PDF:', error);
            }
        };
        fetchPDF();
    }, [auth]);

    const handlePDFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPdfBlob(e.target.files[0]);
        }
    };

    const uploadPDF = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (pdfBlob) {
            try {
                const fileName = '';
                const file = new File([pdfBlob], fileName, { type: 'application/pdf' }); // Cria um novo objeto File
                await auth.uploadPDF(file);
                console.log('PDF enviado com sucesso!');
            } catch (error) {
                console.error('Erro ao enviar PDF:', error);
            }
        } else {
            console.error('Nenhum PDF selecionado');
        }
    };

    return (
        <div>
            <h2>Meu currículo</h2>
            <p>Olá {auth.user?.name}!, como vai?</p>
            <form onSubmit={uploadPDF}>
                <div><input type="file" name="pdf" accept="application/pdf" onChange={handlePDFChange} required /></div>
                <div><button type="submit">Salvar</button></div>
            </form>
            <div className="webviewer" ref={viewerDiv}></div>
        </div>
    );
};
