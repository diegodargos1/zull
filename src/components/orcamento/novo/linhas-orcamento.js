import React from 'react';

export function handleAddLinha(c, v, f, d, servicos, categorias, obj = false){
    const displayNome = (obj.FK_Produto == 0) ? "block" : "none";

    return (
        <tr id={"linha_"+c}>
            <td>
                <select 
                className="form-control"
                name={"itemOrcamento_"+c} 
                id={"itemOrcamento_"+c} 
                defaultValue={(obj.FK_Produto == 0) ? "outro" : obj.FK_Produto}
                onChange={(e) => f(c, e)}
                >
                    <option>Select</option>
                    {servicos.map(opt => 
                        <option key={opt.value} value={opt.value}>{opt.name}</option>
                    )}
                     <option value="outro">Outro</option>
                </select>
                <select 
                className="form-control"
                name={"itemCategoria_"+c} 
                id={"itemCategoria_"+c} 
                style={{display: displayNome, width: "49%"}}
                onChange={(e) => f(c, e)}
                >
                    <option>Select</option>
                    {categorias.map(opt => 
                        <option key={opt.value} value={opt.value}>{opt.name}</option>
                    )}
                </select>
                <input 
                type="text"
                name={"novoItem_"+c}
                id={"novoItem_"+c}
                className={"form-control-orc"}
                style={{display: displayNome}}
                defaultValue={obj.NomeProduto}
                onChange={(e) => f(c, e)}
                />
            </td>
            <td>
                <input 
                type="number" 
                className="form-control custoTotal"
                name={"quantidadeOrcamento_"+c} 
                id={"quantidadeOrcamento_"+c} 
                defaultValue={obj.Quantidade}
                onChange={(e) => f(c, e)}
                />
            </td>
            <td>
                <input 
                type="number" 
                className="form-control custoTotal"
                name={"diariasOrcamento_"+c} 
                id={"diariasOrcamento_"+c} 
                defaultValue={obj.Diarias}
                onChange={(e) => f(c, e)}
                />
            </td>
            <td>
                <input 
                type="number" 
                className="form-control custoTotal"
                name={"quatidadelocalOrcamento_"+c} 
                id={"quatidadelocalOrcamento_"+c} 
                defaultValue={obj.QuantidadeLocais}
                onChange={(e) => f(c, e)}
                />
            </td>
            <td>
                <input 
                type="number" 
                className="form-control custoTotal"
                name={"custoOrcamento_"+c}
                id={"custoOrcamento_"+c} 
                defaultValue={obj.CustoProduto}
                onKeyUp={(e) => f(c, e)}
                />
            </td>
            <td>
                <input 
                type="number" 
                className="form-control"
                name={"custototalOrcamento_"+c} 
                id={"custototalOrcamento_"+c}
                defaultValue={obj.CustoTotal}
                onChange={(e) => f(c, e)}
                readOnly
                />
            </td>
            <td>
                <input 
                type="text" 
                className="form-control margemItemOrcamento"
                name={"margemOrcamento_"+c} 
                id={"margemOrcamento_"+c} 
                onChange={(e) => f(c, e)}
                defaultValue={(obj) ? obj.Margem : v.margempadraoOrcamento}
                />
            </td>
            <td>
                <input 
                type="text" 
                className="form-control"
                name={"cobrarunitarioOrcamento_"+c} 
                id={"cobrarunitarioOrcamento_"+c} 
                defaultValue={obj.CobrarUnitario}
                onChange={(e) => f(c, e)}
                />
            </td>
            <td>
                <input 
                type="text" 
                className="form-control"
                name={"cobrartotalOrcamento_"+c} 
                id={"cobrartotalOrcamento_"+c} 
                defaultValue={obj.CobrarTotal}
                onChange={(e) => f(c, e)}
                />
            </td>
            <td>
                <input 
                type="text" 
                className="form-control"
                name={"obsOrcamento_"+c}
                onChange={(e) => f(c, e)}
                defaultValue={obj.Obs}
                />
            </td>
            <td style={{textAlign: "center"}}>
                <button 
                type="button"
                className="btn btn-danger"
                onClick={() => d(c)}
                >X</button>
            </td>
        </tr>
    )
}
