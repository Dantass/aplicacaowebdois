import { useContext, useEffect, useState } from "react";
import { buscarTodos, remover } from "../services/ContatoService.js";
import { RotaContext } from "../contexts/RotaContext.jsx";
import Listagem from "../forms/Listagem.jsx";

function Listar() {
  const [contatos, setContatos] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const { setRota } = useContext(RotaContext);

  const carregar = async () => {
    setCarregando(true);
    const resposta = await buscarTodos();
    if (resposta.sucesso) {
      setContatos(resposta.dados);
      setErro("");
    } else {
      setErro(resposta.mensagem);
    }
    setCarregando(false);
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

      {carregando ? (
        <p>Carregando contatos...</p>
      ) : contatos.length === 0 ? (
        <p style={{ color: "#999" }}>
          Nenhum contato encontrado. Clique em <strong>Novo Contato</strong> para começar.
        </p>
      ) : (
        <Listagem
          itens={contatos}
          onModificar={handleModificar}
          onRemover={handleRemover}
        />
      )}

      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </>
  );
}

export default Listar;
