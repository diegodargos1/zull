export function formatData(datas){
    let array = [];
    let mesInicial;
    for(let x in datas){
        let dataFormatado = datas[x].Data.split("/");
        if(x == 0)mesInicial =  new Date(dataFormatado[2], dataFormatado[1]-1);
        array.push(new Date(dataFormatado[2], dataFormatado[1]-1, dataFormatado[0]));
    }
    return {mesInicio: mesInicial, selectedDays: array}
}