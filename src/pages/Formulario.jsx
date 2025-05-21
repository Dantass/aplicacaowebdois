import { useState, useEffect } from "react";
import InputNome from "../components/InputNome.jsx";
import InputTelefone from "../components/InputTelefone.jsx";

function Formulario(props) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erroNome, setErroNome] = useState("");
  const [erroTelefone, setErroTelefone] = useState("");

  useEffect(() => {
    if (props.valores) {
      setNome(props.valores.nome || "");
      setTelefone(props.valores.telefone || "");
    }
  }, [props.valores]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let validado = true;

    if (!nome) {
      setErroNome("Nome é obrigatório");
      validado = false;
    } else {
      setErroNome("");
    }

    if (!telefone) {
      setErroTelefone("Telefone é obrigatório");
      validado = false;
    } else {
      setErroTelefone("");
    }

    if (validado) {
      props.onSubmit({ nome, telefone });
      setNome("");
      setTelefone("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputNome valor={nome} onChange={(e) => setNome(e.target.value)} erro={erroNome} />
      <InputTelefone valor={telefone} onChange={(e) => setTelefone(e.target.value)} erro={erroTelefone} />
      <button type="submit">Salvar</button>
    </form>
  );
}

export default Formulario;
