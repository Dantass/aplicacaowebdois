import { useContext, useState } from "react";
import { adicionar } from "../services/ContatoService.js";
import { RotaContext } from "../contexts/RotaContext.jsx";
import Formulario from "../forms/Formulario.jsx";

function Novo() {
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(""); 
  const { setRota } = useContext(RotaContext);

  const handleSalvar = async (contato) => {
    const resposta = await adicionar(contato);

    if (resposta.sucesso) {
      setErro("");
      setSucesso("Contato cadastrado com sucesso!");
      setTimeout(() => {
        setRota("/listar");
      }, 1000); 
    } else {
      setSucesso("");
      setErro(resposta.mensagem);
    }
  };

  return (
    <>
      <h2>Novo Contato</h2>
      <Formulario onSubmit={handleSalvar} />
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {sucesso && <p style={{ color: "green" }}>{sucesso}</p>}
    </>
  );
}

export default Novo;
