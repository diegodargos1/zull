export function calculoTabelaOrcamento(i, e, state){
    let custoTotal = (state.items[i] && state.items[i]['custototalOrcamento_'+i]) 
        ? state.items[i]['custototalOrcamento_'+i] 
        : 0;
    let custo = (document.getElementById('custoOrcamento_'+i)) ? document.getElementById('custoOrcamento_'+i).value : 0;
    let diaria = (document.getElementById('diariasOrcamento_'+i)) ? document.getElementById('diariasOrcamento_'+i).value : 0;
    let quantidade = (document.getElementById('quantidadeOrcamento_'+i)) ? document.getElementById('quantidadeOrcamento_'+i).value : 0;
    let locais = (document.getElementById('quatidadelocalOrcamento_'+i)) ? document.getElementById('quatidadelocalOrcamento_'+i).value : 0;
    let custoElement = document.getElementById('custototalOrcamento_'+i);
    let cobrarUnitarioElement = document.getElementById('cobrarunitarioOrcamento_'+i);
    let margem = document.getElementById('margemOrcamento_'+i);
    let cobrarTotal = document.getElementById('cobrartotalOrcamento_'+i);

    if(e.target.className.split(' ')[1] && e.target.className.split(' ')[1] === 'custoTotal'){
        custoTotal = (custo * diaria * quantidade * locais).toFixed(2);
        custoElement.value = custoTotal; 
    }  

    let cobrarUnitario = (custo * margem.value).toFixed(2);
    cobrarUnitarioElement.value = cobrarUnitario;
    cobrarTotal.value = (cobrarUnitario * locais * diaria * quantidade).toFixed(2);

    return ({
        custoTotal:custoTotal,
        custo:custo,
        diaria:diaria,
        quantidade:quantidade,
        locais:locais,
        custoElement: custoElement,
        cobrarUnitarioElement:cobrarUnitarioElement,
        margem:margem,
        cobrarTotal: cobrarTotal,
        cobrarUnitario: cobrarUnitario
    })
}

export function calcularCampos(custos){
    let valorPecentualOrcamento = document.getElementById('valorPercentualOrcamento');
    let valorTotalOrcamentoField = document.getElementById('valorTotalOrcamento');
    let valorImpostoOrcamentoField = document.getElementById('valorImpostoOrcamento');
    let impostoPadrao = document.getElementById('impostopadraoOrcamento');
    let valorAgenciaOrcamentoField = document.getElementById('valorAgenciaOrcamento');
    let valorRateio = document.getElementById('rateioOrcamento');
    let custo;
    let diaria;
    let quantidade;
    let locais;
    let custoElement;
    let cobrarUnitarioElement;
    let margemTbl;
    let cobrarTotal;
    let obj = {
        somaCustoTotal: 0,
        cobrarUnitario: [],
        custoTotal: [],
        margemLinha: [],
        cobrarTotalLinha: [],
        valorTotalOrcamento: 0,
        valorAgenciaOrcamento: 0,
        valorImpostoOrcamento: 0,
        pecentualOrcamento: 0,
        impostoOrcamento: 0,
        agenciaOrcamento: 0,
        rateio: document.getElementById('rateioOrcamento').value,
        size: objectSize(custos),
        rateioParcelado: 0,
        rateioParceladoCalc: 0,
    }
    if(valorRateio.value > 0)obj.rateioParcelado = valorRateio.value / obj.size;
    
    
    for (let k in custos) {
        if(custos[k] === null)continue;
        diaria = (document.getElementById('diariasOrcamento_'+k)) ? document.getElementById('diariasOrcamento_'+k).value : 0;
        quantidade = (document.getElementById('quantidadeOrcamento_'+k)) ? document.getElementById('quantidadeOrcamento_'+k).value : 0;
        locais = (document.getElementById('quatidadelocalOrcamento_'+k)) ? document.getElementById('quatidadelocalOrcamento_'+k).value : 0;
        custoElement = document.getElementById('custototalOrcamento_'+k);
        cobrarUnitarioElement = document.getElementById('cobrarunitarioOrcamento_'+k);
        margemTbl = document.getElementById('margemOrcamento_'+k);
        cobrarTotal = document.getElementById('cobrartotalOrcamento_'+k);
        custo = (document.getElementById('custoOrcamento_'+k)) ? document.getElementById('custoOrcamento_'+k).value : 0;

        obj.margemLinha[k] = margemTbl.value;

        obj.custoTotal[k] = (custo * diaria * quantidade * locais).toFixed(2);
        custoElement.value = obj.custoTotal[k]; 

        obj.rateioParceladoCalc = (obj.rateioParcelado*margemTbl.value);
        
        obj.cobrarUnitario[k] = ((custo * margemTbl.value) + Number(obj.rateioParceladoCalc)).toFixed(2);
        cobrarUnitarioElement.value = obj.cobrarUnitario[k];

        cobrarTotal.value = (obj.cobrarUnitario[k] * locais * diaria * quantidade).toFixed(2);
        obj.cobrarTotalLinha[k] = cobrarTotal.value;

        obj.valorTotalOrcamento = (Number(cobrarTotal.value) + Number(obj.valorTotalOrcamento)).toFixed(2);
        valorTotalOrcamentoField.value = obj.valorTotalOrcamento;

        obj.valorImpostoOrcamento = Number(valorTotalOrcamentoField.value) * Number(impostoPadrao.value);
        valorImpostoOrcamentoField.value = obj.valorImpostoOrcamento.toFixed(2);
        
        obj.somaCustoTotal = Number(obj.somaCustoTotal) + Number(obj.custoTotal[k]);
        
        obj.agenciaOrcamento = (Number(obj.valorTotalOrcamento) - Number(obj.valorImpostoOrcamento) - Number(obj.somaCustoTotal)).toFixed(2);
        valorAgenciaOrcamentoField.value = obj.agenciaOrcamento;
        
        obj.pecentualOrcamento = ((Number(valorAgenciaOrcamentoField.value)/Number(obj.valorTotalOrcamento)) * 100).toFixed(2);
        valorPecentualOrcamento.value = obj.pecentualOrcamento
    }

    return (obj);
}

function objectSize (obj) {
    let diaria;
    let quantidade;
    let locais;
    let size = 0;

    for (let k in obj) {
        diaria = (document.getElementById('diariasOrcamento_'+k)) ? document.getElementById('diariasOrcamento_'+k).value : 0;
        quantidade = (document.getElementById('quantidadeOrcamento_'+k)) ? document.getElementById('quantidadeOrcamento_'+k).value : 0;
        locais = (document.getElementById('quatidadelocalOrcamento_'+k)) ? document.getElementById('quatidadelocalOrcamento_'+k).value : 0;
        size += (diaria * quantidade * locais); 
    }

    // var size = 0, key;
    // for (key in obj) {
    //     if (obj.hasOwnProperty(key)){
    //         if(obj[key] !== null)size++;
    //     } 
    // }
    return size;
};
