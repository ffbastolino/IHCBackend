const {
    encontraMinhaLista,
    encontraUsuarioAtualizaLista,
    encontraAlimentoRemoveDaLista,
  } = require('../services/usuarioService');
  
  const converteAlimentoParaJson= (alimento) => ({
    nome: alimento.nome,
    imagem: alimento.imgUrl,
    tipo: alimento.tipo,
    corredor: alimento.corredor,
  });
  
  
  const listaMinhaLista = async () => {
   const alimentos = await encontraMinhaLista();
   return alimentos.minhaLista.map(alimento => converteAlimentoParaJson(alimento));
  };

  const adicionaAlimento = (novoAlimento) => encontraUsuarioAtualizaLista(novoAlimento);

  const removeAlimento = (alimento) => encontraAlimentoRemoveDaLista(alimento);

  module.exports.listaMinhaLista=listaMinhaLista;
  module.exports.adicionaAlimento=adicionaAlimento;
  module.exports.removeAlimento=removeAlimento;