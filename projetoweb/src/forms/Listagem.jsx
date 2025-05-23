function Listagem({ itens, onModificar, onRemover }) {
  return (
    <table className="tabela-contatos">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Telefone</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {itens.map((contato) => (
          <tr key={contato.id}>
            <td>{contato.nome}</td>
            <td>{contato.telefone}</td>
            <td>
              <button
                className="btn btn-primary"
                onClick={() => onModificar(contato.id)}
              >
                Modificar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => onRemover(contato.id)}
              >
                Remover
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Listagem;
