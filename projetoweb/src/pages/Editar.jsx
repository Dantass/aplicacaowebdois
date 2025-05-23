import { useContext, useEffect, useState } from "react";
import { buscarPorId, modificar } from "../services/ContatoService.js";
import { RotaContext } from "../contexts/RotaContext.jsx";
import Formulario from "../forms/Formulario.jsx";


function Editar() {
  const { rota, setRota } = useContext(RotaContext);
  const [contato, setContato] = useState({});
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(""); 
  const id = rota.replace("/editar/", "");

  useEffect(() => {
    const carregar = async () => {
      const resposta = await buscarPorId(id);
      if (resposta.sucesso) {
        setContato(resposta.dados);
        setErro("");
      } else {
        setErro(resposta.mensagem);
      }
    };
    carregar();
  }, [id]);

  const handleSalvar = async (dadosAtualizados) => {
    const resposta = await modificar(id, dadosAtualizados);
    if (resposta.sucesso) {
      setErro("");
      setSucesso("Contato atualizado com sucesso!");
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
      <h2>Editar Contato</h2>
      <Formulario onSubmit={handleSalvar} valores={contato} />
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {sucesso && <p style={{ color: "green" }}>{sucesso}</p>}
    </>
  );
}

export default Editar;
