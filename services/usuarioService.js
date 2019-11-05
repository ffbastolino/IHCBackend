const mongoose = require('mongoose');
require('../models/Usuario');

const Usuario = mongoose.model('Usuario');

const encontraMinhaLista = () => Usuario.findOne({},
    {minhaLista: 1}    
    );

const encontraUsuarioAtualizaLista = (novoAlimento) =>Usuario.findOneAndUpdate({},
    { $push: { minhaLista: novoAlimento } },
    {
      upsert:true
    },)
    
const encontraAlimentoRemoveDaLista = (alimento) => Usuario.findOneAndUpdate({},
    {
    $pull: { "minhaLista": { 
    "nome":alimento.nome},
    
}
},
{upsert:true},);
    


module.exports.encontraMinhaLista = encontraMinhaLista;
module.exports.encontraUsuarioAtualizaLista=encontraUsuarioAtualizaLista;
module.exports.encontraAlimentoRemoveDaLista=encontraAlimentoRemoveDaLista;