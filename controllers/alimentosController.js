const {
  encontraAlimentosPorGrupo,
} = require('../services/alimentosService');

const converteAlimentoParaJson= (alimento) => ({
  nome: alimento.nome,
  imagem: alimento.imgUrl,
  tipo: alimento.tipo,
  corredor: alimento.corredor,
});


const listaAlimentosPorGrupo = async () => {
 const alimentos = await encontraAlimentosPorGrupo();
 return alimentos.bebidas.map((alimento) => converteAlimentoParaJson(alimento));
};

 const listaCuidadosPessoais = async () => {
  const alimentos = await encontraAlimentosPorGrupo();
  return alimentos.cuidadosPessoais.map((alimento) => converteAlimentoParaJson(alimento));
 };

 const listaCuidadosComroupas = async () => {
  const alimentos = await encontraAlimentosPorGrupo();
  return alimentos.cuidadosComRoupas.map((alimento) => converteAlimentoParaJson(alimento));
 };

 const listaBiscoitos = async () => {
  const alimentos = await encontraAlimentosPorGrupo();
  return alimentos.biscoitos.map((alimento) => converteAlimentoParaJson(alimento));
 };

 const listaDoces = async () => {
  const alimentos = await encontraAlimentosPorGrupo();
  return alimentos.doces.map((alimento) => converteAlimentoParaJson(alimento));
 };

 const listaMassas= async () => {
  const alimentos = await encontraAlimentosPorGrupo();
  return alimentos.massas.map((alimento) => converteAlimentoParaJson(alimento));
 };

 const listaMolhos = async () => {
  const alimentos = await encontraAlimentosPorGrupo();
  return alimentos.molhos.map((alimento) => converteAlimentoParaJson(alimento));
 };

 const listaFrutas = async () => {
  const alimentos = await encontraAlimentosPorGrupo();
  return alimentos.frutas.map((alimento) => converteAlimentoParaJson(alimento));
 }

 const listaCongelados= async () => {
  const alimentos = await encontraAlimentosPorGrupo();
  return alimentos.congelados.map((alimento) => converteAlimentoParaJson(alimento));
 }

module.exports.listaAlimentosPorGrupo = listaAlimentosPorGrupo;
module.exports.listaCuidadosPessoais = listaCuidadosPessoais;
module.exports.listaCuidadosComroupas = listaCuidadosComroupas;
module.exports.listaBiscoitos = listaBiscoitos;
module.exports.listaDoces = listaDoces;
module.exports.listaMassas = listaMassas;
module.exports.listaMolhos = listaMolhos;
module.exports.listaFrutas = listaFrutas;
module.exports.listaCongelados = listaCongelados;


