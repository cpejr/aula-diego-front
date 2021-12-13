import { message } from "antd";

const defaultErrors = {
  400: "Erro de validação",
  401: "Não autorizado",
  404: "Não encontrado",
  403: "Acesso negado",
  408: "Tempo limite excedido",
  409: "Conflito",
  422: "Erro de validação",
  429: "Limite de requisições excedido",
  500: "Erro interno do servidor",
  502: "Erro de comunicação",
  503: "Serviço indisponível",
  504: "Tempo limite excedido",
};

export default function handleError(error, messageContent) {
  const { response } = error;
  if (response && response.status > 299) {
    const { status } = response;
    const messageError =
      response.data.message || messageContent || defaultErrors[status];
    message.error(messageError);
  }
}
