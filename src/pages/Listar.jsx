import { useContext, useEffect, useState } from "react";
import { buscarTodos, remover } from "../services/ContatoService.js";
import { RotaContext } from "../contexts/RotaContext.jsx";
import Listagem from "./Listagem.jsx";

function Listar() {
  const [contatos, setContatos] = useState([]);
  const [erro, setErro] = useState("");
  const { setRota } = useContext(RotaContext);

  const carregar = async () => {
    const resposta = await buscarTodos();
    if (resposta.sucesso) {
      setContatos(resposta.dados);
      setErro("");
    } else {
      setErro(resposta.mensagem);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const handleModificar = (id) => {
    setRota(`/editar/${id}`);
  };

  const handleRemover = async (id) => {
    const resposta = await remover(id);
    if (resposta.sucesso) {
      carregar();
    } else {
      setErro(resposta.mensagem);
    }
  };

  return (
    <>
      <h2>Meus Contatos</h2>
      <Listagem itens={contatos} onModificar={handleModificar} onRemover={handleRemover} />
      {erro && <p>{erro}</p>}
    </>
  );
}

export default Listar;
