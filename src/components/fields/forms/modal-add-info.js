export const ModalContato = [
    {
        id: 1,
        title: "Add Contato",
        name: "addcontato",
        fields: [
            {
                id: 1,
                title: "Nome Contato",
                name: "nomecontato",
                type: "email",
            },{
                id: 2,
                title: "Telefone",
                name: "telcontato",
                type: "email",
            },{
                id: 3,
                title: "Celular",
                name: "celcontato",
                type: "email",
            },{
                id: 4,
                title: "Tipo Contato",
                name: "tipocontato",
                type: "select",
                select: [
                    {
                        id: 1,
                        name: "Atendimento",
                        value: "Atendimento"
                    },{
                        id: 2,
                        name: "Comercial",
                        value: "Comercial"
                    },{
                        id: 3,
                        name: "Emergencia",
                        value: "Emergencia"
                    },{
                        id: 4,
                        name: "Financeiro",
                        value: "Financeiro"
                    }
                ]
            }
        ]
    }
]

export const ModalEndereco = [
    {
        id: 2,
        title: "Add Endereço",
        name: "Add Endereço",
        fields: [
            {
                id: 1,
                title: "Rua",
                name: "rua",
                type: "email",
            },{
                id: 7,
                title: "Complemento",
                name: "complemento",
                type: "email",   
            },{
                id: 2,
                title: "Bairro",
                name: "bairro",
                type: "email",
            },{
                id: 3,
                title: "Cidade",
                name: "cidade",
                type: "email",
            },{
                id: 4,
                title: "Estado",
                name: "estado",
                type: "email",   
            },{
                id: 5,
                title: "País",
                name: "pais",
                type: "email",   
            },{
                id: 6,
                title: "CEP",
                name: "cep",
                type: "email",   
            }
        ]
    }
]
