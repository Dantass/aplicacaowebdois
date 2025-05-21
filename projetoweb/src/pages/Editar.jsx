import { useContext, useEffect, useState } from "react";
import { buscarPorId, modificar } from "../services/ContatoService.js";
import { RotaContext } from "../contexts/RotaContext.jsx";
import Formulario from "./Formulario.jsx";

function Editar() {
  const { rota, setRota } = useContext(RotaContext);
  const [contato, setContato] = useState({});
  const [erro, setErro] = useState("");
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
      setRota("/listar");
    } else {
      setErro(resposta.mensagem);
    }
  };

  return (
    <>
      <h2>Editar Contato</h2>
      <Formulario onSubmit={handleSalvar} valores={contato} />
      {erro && <p>{erro}</p>}
    </>
  );
}

export default Editar;
