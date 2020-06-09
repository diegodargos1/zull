import React from 'react';
import { listaPais } from '../../../action/select-post';

export async function selectPais (attr = {name: "pais", id: "pais", className: "", style: "", defaultChecked: ""}, f = () => function(){} ){
    const arrayOptions = await listaPais();
    const select = <select className={attr.className} name={attr.name} style={attr.style} id={attr.id} defaultChecked={attr.defaultChecked}
                    onChange={(e) => f(e)}>
                        <option>Select</option>
                        {arrayOptions.map(pais =>
                            <option value={pais.value} key={pais.value}>{pais.name}</option>
                        )}
                    </select>
    return select
}