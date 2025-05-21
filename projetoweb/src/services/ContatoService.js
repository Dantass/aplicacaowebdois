import axios from "axios";

const url = import.meta.env.VITE_API_URL;
console.log("API URL =", url);


function buscarTodos() {
  return axios
    .get(url)
    .then((response) => {
      return { sucesso: true, dados: response.data };
    })
    .catch(() => {
      return { sucesso: false, mensagem: "Erro ao buscar contatos!" };
    });
}

function buscarPorId(id) {
  return axios
    .get(`${url}/${id}`)
    .then((response) => {
      return { sucesso: true, dados: response.data };
    })
    .catch(() => {
      return { sucesso: false, mensagem: "Erro ao buscar contato!" };
    });
}

function adicionar(contato) {
  return axios
    .post(url, contato)
    .then((response) => {
      return { sucesso: true, dados: response.data };
    })
    .catch(() => {
      return { sucesso: false, mensagem: "Erro ao adicionar contato!" };
    });
}

function modificar(id, contato) {
  return axios
    .put(`${url}/${id}`, contato)
    .then((response) => {
      return { sucesso: true, dados: response.data };
    })
    .catch(() => {
      return { sucesso: false, mensagem: "Erro ao modificar contato!" };
    });
}

function remover(id) {
  return axios
    .delete(`${url}/${id}`)
    .then((response) => {
      return { sucesso: true, dados: response.data };
    })
    .catch(() => {
      return { sucesso: false, mensagem: "Erro ao remover contato!" };
    });
}

export { buscarTodos, buscarPorId, adicionar, modificar, remover };
