const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()

app.use(express.json())

// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
app.use(cors())

const port = 3005

// app.use(json{limit:'50mb'})
// app.use(express.bodyParser({limit: '50mb'}));

console.log('###########################################################################################################################################################');
console.log('###########################################################################################################################################################');

//ASM
//......................................................................................................................
app.post('/v1/validateSaleEntity', (req, res) => {
    console.log('body', req.body);
    axios.post('https://validate-sale-entity-activaciones-ar.apps.osen02.claro.amx/validate-sale-entity/validar-entidad', req.body)
        .then(respuesta => {
            res.status(200).send(respuesta.data)
        })
        .catch(err => { err.response ? res.status(err.response?.status).send(err.response.data) : res.status(500).send({ error: "" }) });
})

// jumbo 
app.post('/v1/validarJumbo', (req, res) => {
    axios.post('https://validate-sale-entity-activaciones-ar.apps.osen02.claro.amx/validate-sale-entity/validar-jumbo', req.body)
        .then(respuesta => {
            if (req.body.entId === '10153') {
                res.status(200).send({ resultado: 'OK' });
            } else {
                res.status(200).send(respuesta.data);
            }
        })
        .catch(err => { err.response ? res.status(400).send(err.response.data) : res.status(500).send({ error: "" }) });
})

// seller
app.post('/v1/validateSeller', (req, res) => {
    axios.post('https://business-seller-service-activaciones-ar.apps.osen02.claro.amx/sellers/valida-vendedor', req.body)
        .then(respuesta => {
            res.status(200).send(respuesta.data)
        })
        .catch(err => { err.response ? res.status(400).send(err.response.data) : res.status(500).send({ error: "" }) });
})

// getPos
app.post('/v1/getPos', (req, res) => {
    axios.post('https://business-seller-service-activaciones-ar.apps.osen02.claro.amx/pos/getPos', req.body)
        .then(respuesta => res.status(200).send(respuesta.data))
        .catch(err => { err.response ? res.status(400).send(err.response.data) : res.status(500).send({ error: "" }) });
})

// getStlParams (pagina coords)
app.post('/v1/stlParameters', (req, res) => {
    axios.post('https://app-parameters-product-dmain-bs-ar.apps.osen02.claro.amx/parameter/stlParameters', req.body)
        .then(respuesta => res.status(200).send(respuesta.data))
        .catch(err => { err.response ? res.status(400).send(err.response.data) : res.status(500).send({ error: "" }) });
})

// validate FWA
app.post('/v1/fwaCoverage', (req, res) => {
    axios.post('https://act-validations-activaciones-ar.apps.osen02.claro.amx/fwa/api/fwa-coverage', req.body)
        .then(respuesta => {
            res.status(200).send(respuesta.data)
        })
        .catch(err => { err.response ? res.status(400).send(err.response.data) : res.status(500).send({ error: "" }) });
});

app.post('/v1/getClient', (req, res) => {
    axios.post('https://activation-manager-activaciones-ar.apps.osen02.claro.amx/activation-manager/get-act-client', req.body)
        .then(respuesta => {
            res.status(200).send(respuesta.data)
        })
        .catch(err => { err.response ? res.status(err.response?.status).send(err.response.data) : res.status(500).send({ error: "" }) });
})

app.post('/v1/consultaCrediticia', (req, res) => {
    axios.post('https://activation-manager-activaciones-ar.apps.osen02.claro.amx/activation-manager/consulta-crediticia', req.body)
        .then(respuesta => res.status(200).send(respuesta.data))
        .catch(err => { err.response ? res.status(err.response?.status).send(err.response.data) : res.status(500).send({ error: "" }) });
})

app.post('/v1/ivaCondition', (req, res) => {
    console.log("respuesta.data IVA");
    axios.post('https://act-validations-activaciones-ar.apps.osen02.claro.amx/client-account/iva-lov', req.body)
        .then(respuesta => { console.log("respuesta.data", respuesta.data); res.status(200).send(respuesta.data) })
        .catch(err => { err.response ? res.status(400).send(err.response.data) : res.status(500).send({ error: "" }) });
});

app.post('/v1/validateIvaIibb', (req, res) => {
    axios.post('https://act-validations-activaciones-ar.apps.osen02.claro.amx/client-account/validate-iva-iibb', req.body)
        .then(respuesta => res.status(200).send(respuesta.data))
        .catch(err => { err.response ? res.status(400).send(err.response.data) : res.status(500).send({ error: "" }) });
});

//.......................................................................................................................

//PARAMETROS
app.get('/v1/currentDocuments', (req, res) => {
    axios.get('https://client-qualification-portabilidad-ar.apps.osen02.claro.amx/clientsqualification/current-documents')
        .then(respuesta => res.status(200).send(respuesta.data))
        .catch(err => { err.response ? res.status(400).send(err.response.data) : res.status(500).send({ error: "" }) });
});
app.post('/v1/mavParameters', (req, res) => {

    console.log("REQ BODY NORMAlIZACION", req.body);

    axios.post(`https://app-parameters-product-dmain-bs-ar.apps.osen02.claro.amx/parameter/mavParameters;`, req.body)

        .then(respuesta => {

            res.status(200).send(respuesta?.data)

        })

        .catch(err => {
            res.status(400).send(err?.response?.data)
        });
});
app.post('/v1/stlParameters', (req, res) => {
    axios.post('https://app-parameters-product-dmain-bs-ar.apps.osen02.claro.amx/parameter/stlParameters', req.body)
        .then(respuesta => res.status(200).send(respuesta.data))
        .catch(err => { err.response ? res.status(err.response?.status).send(err.response.data) : res.status(500).send({ error: "" }) });
})
// getRefParams

app.post('/v1/refCodes', (req, res) => {
    axios.post('https://app-parameters-product-dmain-bs-ar.apps.osen02.claro.amx/parameter/refCodes', req.body)
        .then(respuesta => res.status(200).send(respuesta.data))
        .catch(err => { err.response ? res.status(err.response?.status).send(err.response.data) : res.status(500).send({ error: "" }) }); 
});


//! SERVER
app.get('/', (req, res) => {
    console.log('entre al get')
    res.write('<h1>SERVER ASM!</h1>')
})

app.get('/logout', (req, res) => {
    axios.get('/logout')
        .then(res => res.status(200).send(res.data))
        .catch(err => console.log(err))
})

//! SOLAPA NEGOCIO ----------------------------------------------------------------------------------------------------------------
// userInfo
app.get('/api/userinfo', (req, res) => {
    res.status(200).send({
        country: "Argentina", // Argentina - Paraguay - Uruguay
        display_name: "Julian Alejo Perez",
        email: "jperez@cfotechlatam.com",
        family_name: "Perez",
        given_name: "Julian Alejo",
        manager: "CN=CTI3306,OU=Administradores,OU=Corporativos,OU=Usuarios de CTI,DC=ctimovil,DC=net",
        member_of: [
            'CN=VPN_Autenticacion_RSA,OU=Acceso a servicios,OU=Grupos de CTI,DC=ctimovil,DC=net',
            'CN=VPN_CHKP__AUTENTICACION,OU=Acceso a servicios,OU=Grupos de CTI,DC=ctimovil,DC=net',
            'CN=VPN_CHKP_CorpUsers,OU=Acceso a servicios,OU=Grupos de CTI,DC=ctimovil,DC=net',
            'CN=osen01-Dev,OU=Acceso a servicios,OU=Grupos de CTI,DC=ctimovil,DC=net',
            'CN=osen01-Openshift,OU=Acceso a servicios,OU=Grupos de CTI,DC=ctimovil,DC=net',
            'CN=Intranet_Users,OU=Acceso a servicios,OU=Grupos de CTI,DC=ctimovil,DC=net',
            'CN=Atlassian Users,OU=Acceso a servicios,OU=Grupos de CTI,DC=ctimovil,DC=net',
            'CN=DLP Filtro Monitoreado,OU=Acceso a servicios,OU=Grupos de CTI,DC=ctimovil,DC=net',
            // 'CN=CISCOACS-WIFICORPO,OU=Acceso a servicios,OU=Grupos de CTI,DC=ctimovil,DC=net,CN=GVP_AGENTE',
            // 'CN=CISCOACS-WIFICORPO,OU=Acceso a servicios,OU=Grupos de CTI,DC=ctimovil,DC=net,CN=VCD_TELEFONICO',
            'CN=CISCOACS-WIFICORPO,OU=Acceso a servicios,OU=Grupos de CTI,DC=ctimovil,DC=net,CN=VCD_ADMIN',
            // 'CN=CISCOACS-WIFICORPO,OU=Acceso a servicios,OU=Grupos de CTI,DC=ctimovil,DC=net,CN=VCD_PRESENCIAL',
            'CN=GVP_ADMIN',
            // 'CN=GVP_AGENTE',
            // 'GLP_CAC',
            'GLP_ADMIN',
            // 'CN=VCD_ADMIN',
        ],
       // preferred_username: "AGE000055", // GVP
        // preferred_username: "ACT12345", // ASM
        // preferred_username: "EXA72224", // Mio
        // preferred_username: "ACT12345",
        preferred_username: "AGEP10153",
        sub: "f:userstorageprovider-ldap:EXA72224",
    });
})

// userProfile
app.post('/api/userprofile/ar', (req, res) => {
    console.log("#####################")
    axios.post('https://act-validations-activaciones-ar.apps.osen02.claro.amx/activation-validations/user-profile', req.body)
        .then(respuesta => {
            res.status(200).send({
                ...respuesta.data,
                mavUser: { ...respuesta.data.mavUser, usrAEntidadesEntId: '55' }
            })
        })
        .catch(err => {
            console.log("ERR USERPROFILE", err)
            res.status(404).send(err)
        })
})
app.post('/api/userprofile/py', (req, res) => {
    console.log("#####################")
    axios.post('https://act-validations-activaciones-py.apps.osen02.claro.amx/activation-validations/user-profile', req.body)
        .then(respuesta => {
            res.status(200).send({
                ...respuesta.data,
                mavUser: { ...respuesta.data.mavUser, usrAEntidadesEntId: '55' }
            })
        })
        .catch(err => {
            console.log("ERR USERPROFILE", err)
            res.status(404).send(err)
        })
})
app.post('/api/userprofile/uy', (req, res) => {
    console.log("#####################")
    axios.post('https://act-validations-activaciones-uy.apps.osen02.claro.amx/activation-validations/user-profile', req.body)
        .then(respuesta => {
            res.status(200).send({
                ...respuesta.data,
                mavUser: { ...respuesta.data.mavUser, usrAEntidadesEntId: '55' }
            })
        })
        .catch(err => {
            console.log("ERR USERPROFILE", err)
            res.status(404).send(err)
        })
})


// app.post('/api/userprofile', (req, res) => {
//     axios.post('https://act-validations-activaciones-ar.apps.osen02.claro.amx/activation-validations/user-profile', req.body)
//         .then(respuesta => {
//             // res.status(200).send(respuesta.data)
//             res.status(respuesta.status).send({
//                 ...respuesta.data,
//                 //     //* ASM
//                 // userPlace: {...respuesta.data.userPlace, uspCentralizing: 'N'},
//                 // mavUser: {...respuesta.data.mavUser, usrAEntidadesEntId: null}, 
//                 // userEntity: null,
//                 //     //* GVP
//                 mavUser: { ...respuesta.data.mavUser, usrAEntidadesEntId: '55' }
//             })
//         })
//         .catch(err => {
//             console.log("ERR USERPROFILE", err)
//             res.status(err.response?.status).send(err)
//         })
// })


// entity
// app.post('/v1/validateEntity', (req, res) => {
//     axios.post(`https://validate-sale-entity-activaciones-ar.apps.osen02.claro.amx/validate-sale-entity/validar-entidad`, req.body)
//         .then(respuesta => {
//             // res.status(200).send({...respuesta.data, tipoCanal: 'I', deliveryEnable: 'VB', fwaEnabled: 'W', dobasigCac: 'S'})
//             res.status(200).send(respuesta.data)
//         })
//         .catch(err => {
//             console.log('ERROR ENTITY:', err.response?.data);
//             res.status(err.response?.status).send(err?.response?.data)
//         })
// })

// Jumbo
// app.post('/v1/validarJumbo', (req, res) => {
//     // axios.post('https://validate-sale-entity-activaciones-ar-desa.apps.osen02.claro.amx/validar-jumbo', req.body)
//     // .then( respuesta => res.status(200).send(respuesta?.data) )
//     // .catch( err => {
//     //     console.log('ERROR JUMBO', err.response?.data)
//     //     res.status(400).send(err.response?.data)
//     // })
//     res.status(200).send({ "resultado": "OK" })
//     // res.status(400).send({
//     //     "action": "Resultado consulta a CollectorOfCharges",
//     //     "message": "La entidad no tiene usuario COBRADOR/VENDEDOR en Jumbo",
//     //     "date": "2023-02-09T14:40:29.930533",
//     //     "messageType": "E"
//     // })
// })

// // seller
// app.post('/v1/validateSeller', (req, res) => {
//     axios.post('https://business-seller-service-activaciones-ar.apps.osen02.claro.amx/sellers/valida-vendedor', req.body)
//         // axios.post('https://business-seller-service-activaciones-ar-desa.apps.osen02.claro.amx/sellers/valida-vendedor',
//         // {"entId": "55", "dniVendedor": "12345678", "nombreComercial": "pepito chino" }) // OK
//         // {"entId": "9072", "dniVendedor": "26724827", "nombreComercial": "pepito chino" }) // error por 200
//         .then(respuesta => {
//             res.status(200).send(respuesta?.data)
//         })
//         .catch(err => {
//             console.log('ERROR SELLER:', err.response)
//             res.status(400).send(err.response?.data)
//         })
// })

// // getPos
// // app.post('/v1/getPos', (req, res) => {
// //     axios.post('https://business-seller-service-activaciones-ar.apps.osen02.claro.amx/pos/getPos', req.body)
// //         .then(respuesta => res.status(200).send(respuesta.data))
// //         .catch(err => console.log(err))
// // })

// // getRefParams

// app.post('/v1/refCodes', (req, res) => {
//     axios.post('https://app-parameters-product-dmain-bs-ar.apps.osen02.claro.amx/parameter/refCodes', req.body)
//         .then(respuesta => res.status(200).send(respuesta.data))
//         .catch(err => console.log(err))
// })

// // getStlParams (pagina coords)
// app.post('/v1/mavParameters', (req, res) => {
//     axios.post('https://app-parameters-product-dmain-bs-ar.apps.osen02.claro.amx/parameter/mavParameters', req.body)
//         .then(respuesta => res.status(200).send(respuesta.data))
//         .catch(err => console.log(err))
// })

// // validate FWA
// app.post('/v1/fwaCoverage', (req, res) => {
//     axios.post('https://act-validations-activaciones-ar.apps.osen02.claro.amx/fwa/api/fwa-coverage', req.body)
//         .then(respuesta => {
//             res.status(200).send(respuesta?.data)
//         })
//         .catch(err => {
//             res.status(400).send(err?.response?.data)
//         })
// })

//! SOLAPA CLIENTE -----------------------------------------------------------------------------------------------

// app.post('/v1/getClient', (req, res) => {
//     if (req.body.identificationNumber === '123') {
//         res.status(200).send({
//             infoDetails: [
//                 {
//                     action: 'string',
//                     code: 0,
//                     date: 'string',
//                     detail: {},
//                     message: 'string',
//                     type: 'string'
//                 }
//             ],
//             profileAccount: [
//                 {
//                     accAbtId: 'string',
//                     accAccType: 'string',
//                     accAtyId: 'string',
//                     accountId: '55555555',
//                     accountInvoiceInfo: {
//                         condition: 'ivaCondition4',
//                         cycle: 'string'
//                     },
//                     accountOwnerInfo: {
//                         cuit: '20289221523',
//                         fullName: 'Alejandro Garcia',
//                         idNumber: '28922152',
//                         idType: 'DNI'
//                     },
//                     accountStatus: 'string',
//                     accountType: 'string',
//                     activeLines: 'string',
//                     addressInfo: {
//                         city: 'San Salvador de Jujuy',
//                         district: 'Manuel Belgrano',
//                         flat: 'string',
//                         floor: 'string',
//                         geuId: 'string',
//                         number: '117',
//                         observations: 'Casa de Ale',
//                         postalCode: '4600',
//                         region: 'Norte',
//                         street: 'Trelew',
//                         suburb: 'Barrio Norte',
//                         zipCode: 'BN2356'
//                     },
//                     clientId: 'string',
//                     company: 'string',
//                     creationDate: 'string',
//                     emailVerification: [
//                         {
//                             email: 'string',
//                             verification: 'string'
//                         }
//                     ],
//                     entityId: 'string',
//                     flagTipoIva: 'string',
//                     lastModificationDate: 'string',
//                     lastUpdateUserId: 'string',
//                     lines: 'string',
//                     mainAccountId: 'string',
//                     suspendedLines: 'string',
//                     userId: 'string'
//                 }
//             ],
//             profileClient: {
//                 addToCltLeg: 'string',
//                 businessType: 'string',
//                 clientId: '00001',
//                 clientInvoiceInfo: {
//                     description: 'string',
//                     taxCategoryId: 'string',
//                     taxData: 'string'
//                 },
//                 clientSubcategory: 'string',
//                 clientSubcategoryType: 'string',
//                 clientType: 'string',
//                 clientTypeDescription: 'string',
//                 creationDate: 'string',
//                 lastUpdate: 'string',
//                 marketSegmentDescription: 'string',
//                 marketSegmentId: 'string',
//                 personalInfo: {
//                     birthDay: '2000-04-09T02:44:23.773Z',
//                     businessName: 'Jarod',
//                     cuit: '2028922152',
//                     idNumber: '28922152',
//                     idType: 'DNI',
//                     name: 'Alejandro',
//                     sex: 'M',
//                     surname: 'Garcia'
//                 },
//                 risk: 'string',
//                 scoring: 'string',
//                 segment: 'string'
//             }
//         })
//     } else {
//         res.status(404).send({
//             action: "VALIDANDO DOCUMENTO",
//             message: "Respuesta vacia",
//             type: "E",
//             date: "2023-04-17T10:54:04.870088",
//         })
//     }
//     // axios.post('https://activation-manager-activaciones-ar.apps.osen02.claro.amx/activation-manager/get-act-client', req.body)
//     //   .then(respuesta => {
//     //     console.log(respuesta)
//     //     res.status(200).send(respuesta.data)
//     //   })
//     //   .catch(err => { err.response ? res.status(400).send(err.response?.data) : res.status(500).send({ error: "" }) });
// })

// app.post('/v1/consultaCrediticia', (req, res) => {
//     axios.post('https://activation-manager-activaciones-ar-desa.apps.osen02.claro.amx/activation-manager/consulta-crediticia', req.body)
//         .then(respuesta => res.status(200).send(respuesta.data))
//         .catch(err => { err.response ? res.status(400).send(err.response?.data) : res.status(500).send({ error: "Algún error en consultaCrediticia" }) })
// })

// app.get('/v1/currentDocuments', (req, res) => {
//     axios.get('https://client-qualification-portabilidad-ar.apps.osen02.claro.amx/clientsqualification/current-documents')
//         .then(respuesta => res.status(200).send(respuesta.data))
//         .catch(err => { err.response ? res.status(400).send(err.response?.data) : res.status(500).send({ error: "Algún error en currentDocuments" }) })
// })

//! SOLAPA PRODUCTO ----------------------------------------------------------------------------------------------
app.post('/v1/ivaCondition', (req, res) => {
    console.log("respuesta.data IVA");
    axios.post('https://act-validations-activaciones-ar.apps.osen02.claro.amx/client-account/iva-lov', req.body)
        .then(respuesta => { console.log("respuesta.data", respuesta.data); res.status(200).send(respuesta.data) })
        .catch(err => { err.response ? res.status(400).send(err.response.data) : res.status(500).send({ error: "" }) });
});

app.post('/v1/validateIvaIibb', (req, res) => {
    axios.post('https://act-validations-activaciones-ar.apps.osen02.claro.amx/client-account/validate-iva-iibb', req.body)
        .then(respuesta => res.status(200).send(respuesta.data))
        .catch(err => { err.response ? res.status(400).send(err.response.data) : res.status(500).send({ error: "" }) });
});


//! SOLAPA PAGOS ----------------------------------------------------------------------------------------------
app.get('/v1/getTipoDebito', (req, res) => {
    axios.get('https://app-product-validation-activaciones-ar.apps.osen02.claro.amx/product-validation/tipo-debito-fp')
        .then(respuesta => res.status(respuesta.status).send(respuesta?.data))
        .catch(err => {
            console.log('ERROR getTipoDebito:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})

app.post('/v1/getEntidadesBancarias', (req, res) => {
    console.log('entre a entidadesBancarias')
    axios.post('https://app-product-validation-activaciones-ar.apps.osen02.claro.amx/product-validation/entidades-bancarias-fp', req.body)
        .then(respuesta => res.status(respuesta.status).send(respuesta?.data))
        .catch(err => {
            console.log('ERROR getEntidadesBancarias:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
});









//! -----------------------------------------------------------------------------------------------------------------------
//! MFE ----------------------------------------------------------------------------------------------------------
app.get(`/v1/getProvincias/ar`, (req, res) => {
    axios.get(`https://porta-localizacion-portabilidad-ar.apps.osen02.claro.amx/domicilio/provincias`)
        .then(respuesta => {
            console.log(respuesta)
            res.status(respuesta?.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR PROVINCIA:', err.response)
            res.status(err?.response?.status).send(err?.response?.data)
        })
})
app.get(`/v1/getProvincias/py`, (req, res) => {
    axios.get(`https://porta-localizacion-portabilidad-py.apps.osen02.claro.amx/domicilio/provincias`)
        .then(respuesta => {
            res.status(respuesta?.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR PROVINCIA:', err)
            res.status(err?.response?.status || 400).send(err?.response?.data)
        })
})
app.get(`/v1/getProvincias/uy`, (req, res) => {
    axios.get(`https://porta-localizacion-portabilidad-uy.apps.osen02.claro.amx/domicilio/provincias`)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR PROVINCIA:', err.response)
            res.status(err.response?.status).send(err?.response?.data)
        })
})


app.get(`/v1/getLocalidades/ar`, (req, res) => {
    axios.get(`https://porta-localizacion-portabilidad-ar.apps.osen02.claro.amx/domicilio/localidades${req._parsedUrl.search}`)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR LOCALIDAD:', err.response)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.get(`/v1/getLocalidades/py`, (req, res) => {
    axios.get(`https://porta-localizacion-portabilidad-py-desa.apps.osen02.claro.amx/domicilio/localidades${req._parsedUrl.search}`)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR LOCALIDAD:', err.response)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.get(`/v1/getLocalidades/uy`, (req, res) => {
    axios.get(`https://porta-localizacion-portabilidad-uy.apps.osen02.claro.amx/domicilio/localidades${req._parsedUrl.search}`)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR LOCALIDAD:', err.response)
            res.status(err.response?.status).send(err?.response?.data)
        })
})

// Solo AR
app.post('/v1/getAddress/ar', (req, res) => {
    axios.post('https://porta-localizacion-portabilidad-ar-desa.apps.osen02.claro.amx/domicilio/normalizar', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            // console.log('ERROR NORMALIZACION DIRECCION:', err.response)
            res.status(err.response?.status).send(err?.response?.data)
        })
})

app.get(`/v1/getCpa`, (req, res) => {
    axios.get(`https://porta-localizacion-portabilidad-ar.apps.osen02.claro.amx/domicilio/cpa${req._parsedUrl.search}`)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR CPA:', err.response)
            res.status(err.response?.status).send(err?.response?.data)
        })
})

// Solo PY y UY
app.get('/v1/getBarrios/py', (req, res) => {
    console.log('PARAMS BARRIOS:', req._parsedUrl.search)
    console.log('URL:................', `https://porta-localizacion-portabilidad-py.apps.osen02.claro.amx/domicilio/barrios${req._parsedUrl.search}`)
    axios.get(`https://porta-localizacion-portabilidad-py.apps.osen02.claro.amx/domicilio/barrios${req._parsedUrl.search}`)
        .then(respuesta => {
            res.status(respuesta?.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getBarrio:', err?.response?.data)
            res.status(err?.response?.status).send(err?.response?.data)
        })
})
app.get('/v1/getBarrios/uy', (req, res) => {
    axios.get(`https://porta-localizacion-portabilidad-uy.apps.osen02.claro.amx/domicilio/barrios${req._parsedUrl.search}`)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getBarrio:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})






//! -----------------------------------------------------------------------------------------------------------------------
//! GVP -------------------------------------------------------------------------------------------------------------------

app.post('/v1/getEntities/ar', (req, res) => {
    axios.post(`https://business-seller-service-activaciones-ar.apps.osen02.claro.amx/entities/getEntities`, req.body)
        // axios.post('https://business-seller-service-activaciones-ar-desa.apps.osen02.claro.amx/entities/getEntities', {entId: 'FASF', circuito: 'POS'})
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
            // res.status(200).send(fakeEntitySinHijos)
        })
        .catch(err => {
            console.log('ERROR getEntities:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/getEntities/py', (req, res) => {
    axios.post(`https://business-seller-service-activaciones-py-desa.apps.osen02.claro.amx/entities/getEntities`, req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getEntities:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/getEntities/uy', (req, res) => {
    axios.post(`https://business-seller-service-activaciones-uy-desa.apps.osen02.claro.amx/entities/getEntities`, req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getEntities:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})


app.post('/v1/getSellersByEntities/ar', (req, res) => {
    // 11111111 Vededor registrado (activo) | 99999999 Vendedor registrado (no-activo) | 38072224 Vendedor no registrado (nuevo)
    axios.post('https://business-seller-service-activaciones-ar.apps.osen02.claro.amx/sellers/getSellersByEntities', req.body)
        // axios.post('https://business-seller-service-activaciones-ar.apps.osen02.claro.amx/sellers/getSellersByEntities', {activos: '', entIds: ['99']})
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getSellersByEntities:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/getSellersByEntities/py', (req, res) => {
    axios.post('https://business-seller-service-activaciones-py.apps.osen02.claro.amx/sellers/getSellersByEntities', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getSellersByEntities:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/getSellersByEntities/uy', (req, res) => {
    axios.post('https://business-seller-service-activaciones-uy.apps.osen02.claro.amx/sellers/getSellersByEntities', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getSellersByEntities:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})

app.post('/v1/getSellerValidation/ar', (req, res) => {
    axios.post('https://business-seller-service-activaciones-ar.apps.osen02.claro.amx/sellers/getSellerValidation', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getSellerValidation:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/getSellerValidation/py', (req, res) => {
    axios.post('https://business-seller-service-activaciones-py.apps.osen02.claro.amx/sellers/getSellerValidation', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getSellerValidation:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/getSellerValidation/uy', (req, res) => {
    axios.post('https://business-seller-service-activaciones-uy.apps.osen02.claro.amx/sellers/getSellerValidation', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getSellerValidation:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})

app.post('/v1/addSeller/ar', (req, res) => {
    axios.post('https://business-seller-service-activaciones-ar.apps.osen02.claro.amx/sellers/addSeller', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR addSeller:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/addSeller/py', (req, res) => {
    axios.post('https://business-seller-service-activaciones-py.apps.osen02.claro.amx/sellers/addSeller', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR addSeller:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/addSeller/uy', (req, res) => {
    axios.post('https://business-seller-service-activaciones-uy.apps.osen02.claro.amx/sellers/addSeller', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR addSeller:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})

app.post('/v1/updateSeller/ar', (req, res) => {
    axios.post('https://business-seller-service-activaciones-ar.apps.osen02.claro.amx/sellers/updateSeller', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR updateSeller:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/updateSeller/py', (req, res) => {
    axios.post('https://business-seller-service-activaciones-py.apps.osen02.claro.amx/sellers/updateSeller', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR updateSeller:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/updateSeller/uy', (req, res) => {
    axios.post('https://business-seller-service-activaciones-uy.apps.osen02.claro.amx/sellers/updateSeller', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR updateSeller:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})

app.post('/v1/bajaSeller/ar', (req, res) => {
    axios.post('https://business-seller-service-activaciones-ar.apps.osen02.claro.amx/sellers/bajaSeller', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR bajaSeller:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/bajaSeller/py', (req, res) => {
    axios.post('https://business-seller-service-activaciones-py.apps.osen02.claro.amx/sellers/bajaSeller', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR bajaSeller:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/bajaSeller/uy', (req, res) => {
    axios.post('https://business-seller-service-activaciones-uy.apps.osen02.claro.amx/sellers/bajaSeller', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR bajaSeller:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})

app.post('/v1/updatePos/ar', (req, res) => {
    axios.post('https://business-seller-service-activaciones-ar.apps.osen02.claro.amx/pos/updatePos', req.body)
        .then(respuesta => {
            console.log(respuesta)
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR updatePos:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/updatePos/py', (req, res) => {
    axios.post('https://business-seller-service-activaciones-py.apps.osen02.claro.amx/pos/updatePos', req.body)
        .then(respuesta => {
            console.log(respuesta)
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR updatePos:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/updatePos/uy', (req, res) => {
    axios.post('https://business-seller-service-activaciones-uy.apps.osen02.claro.amx/pos/updatePos', req.body)
        .then(respuesta => {
            console.log(respuesta)
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR updatePos:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})

app.post('/v1/getPos/ar', (req, res) => {
    axios.post('https://business-seller-service-activaciones-ar.apps.osen02.claro.amx/pos/getPos', req.body)
        .then(respuesta => {
            console.log(respuesta.data)
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getPos:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/getPos/py', (req, res) => {
    axios.post('https://business-seller-service-activaciones-py.apps.osen02.claro.amx/pos/getPos', req.body)
        .then(respuesta => {
            console.log(respuesta.data)
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getPos:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/getPos/uy', (req, res) => {
    axios.post('https://business-seller-service-activaciones-uy.apps.osen02.claro.amx/pos/getPos', req.body)
        .then(respuesta => {
            console.log(respuesta.data)
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getPos:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})

app.post('/v1/getPosValidation/ar', (req, res) => {
    axios.post('https://business-seller-service-activaciones-ar.apps.osen02.claro.amx/pos/getPosValidation', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getPosValidation:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/getPosValidation/py', (req, res) => {
    axios.post('https://business-seller-service-activaciones-py.apps.osen02.claro.amx/pos/getPosValidation', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getPosValidation:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/getPosValidation/uy', (req, res) => {
    axios.post('https://business-seller-service-activaciones-uy.apps.osen02.claro.amx/pos/getPosValidation', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getPosValidation:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})

app.post('/v1/bajaPos/ar', (req, res) => {
    axios.post('https://business-seller-service-activaciones-ar.apps.osen02.claro.amx/pos/bajaPos', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR bajaPos:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/bajaPos/py', (req, res) => {
    axios.post('https://business-seller-service-activaciones-py.apps.osen02.claro.amx/pos/bajaPos', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR bajaPos:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/bajaPos/uy', (req, res) => {
    axios.post('https://business-seller-service-activaciones-uy.apps.osen02.claro.amx/pos/bajaPos', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR bajaPos:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})

app.post('/v1/addPos/ar', (req, res) => {
    axios.post('https://business-seller-service-activaciones-ar.apps.osen02.claro.amx/pos/addPos', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR addPos:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/addPos/py', (req, res) => {
    axios.post('https://business-seller-service-activaciones-py.apps.osen02.claro.amx/pos/addPos', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR addPos:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/addPos/uy', (req, res) => {
    axios.post('https://business-seller-service-activaciones-uy.apps.osen02.claro.amx/pos/addPos', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR addPos:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})

app.get('/v1/getDocTypes/ar', (req, res) => {
    axios.get('https://client-qualification-portabilidad-ar.apps.osen02.claro.amx/clientsqualification/current-documents')
        .then(respuesta => {
            console.log(res.data)
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getDocTypes:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.get('/v1/getDocTypes/py', (req, res) => {
    axios.get('https://client-qualification-portabilidad-py.apps.osen02.claro.amx/clientsqualification/current-documents')
        .then(respuesta => {
            console.log(res.data)
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getDocTypes:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.get('/v1/getDocTypes/uy', (req, res) => {
    axios.get('https://client-qualification-portabilidad-uy.apps.osen02.claro.amx/clientsqualification/current-documents')
        .then(respuesta => {
            console.log(res.data)
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getDocTypes:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})

app.post('/v1/getGenders/ar', (req, res) => {
    axios.post('https://parameters-service-product-dmain-bs-ar-desa.apps.osen02.claro.amx/parameter/refCodes', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getGender:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/getGenders/py', (req, res) => {
    axios.post('https://parameters-service-product-dmain-bs-py-desa.apps.osen02.claro.amx/parameter/refCodes', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getGender:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/getGenders/uy', (req, res) => {
    axios.post('https://parameters-service-product-dmain-bs-uy-desa.apps.osen02.claro.amx/parameter/refCodes', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getGender:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})

app.post('/v1/getSellerType/ar', (req, res) => {
    axios.post('https://app-seller-service-activaciones-ar.apps.osen02.claro.amx/appSellerService/getTipoVea', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getSellerType:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/getSellerType/py', (req, res) => {
    axios.post('https://app-seller-service-activaciones-py.apps.osen02.claro.amx/appSellerService/getTipoVea', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getSellerType:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/getSellerType/uy', (req, res) => {
    axios.post('https://app-seller-service-activaciones-uy.apps.osen02.claro.amx/appSellerService/getTipoVea', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getSellerType:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})

app.post('/v1/getSeller/ar', (req, res) => {
    axios.post('https://business-seller-service-activaciones-ar.apps.osen02.claro.amx/sellers/getSeller', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getSeller:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/getSeller/py', (req, res) => {
    axios.post('https://business-seller-service-activaciones-py.apps.osen02.claro.amx/sellers/getSeller', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getSeller:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})
app.post('/v1/getSeller/uy', (req, res) => {
    axios.post('https://business-seller-service-activaciones-uy.apps.osen02.claro.amx/sellers/getSeller', req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR getSeller:', err.response?.data)
            res.status(err.response?.status).send(err?.response?.data)
        })
})






//! VCD ---------------------------------------------------------------------
//! -------------------------------------------------------------------------

app.post('/valida-dnic', (req, res) => {
    // res.status(400).send({
    //     action: '',
    //     message: 'Hubo un error BLA BLA BLA',
    //     date: '',
    //     messageType: '',
    //     detalle: '',
    // })
    res.status(200).send({
        getClientResponse: {
            identificationType: 'DNI',
            identificationNumber: '38123123',
            name1: 'DAVID',
            name2: '',
            surname1: 'BOWIE',
            surname2: '',
            surnameAdoptive1: '',
            surnameAdoptive2: '',
            sex: 'MASCULINO',
            birthDate: '2003-12-06',
            nationality: 'ARGENTINO',
            docName: '',
            creationDate: '2003-12-06',
            docBack: 'GSAJGA',
            docFront: 'GSAJGA',
            identificationNumber2: '',
            serieNumber: ''  
        },
        errorMessageDetail: ''
    })
    // axios.post('https://act-validations-activaciones-ar.apps.osen02.claro.amx/activation-validations/user-profile', req.body)
    // .then( respuesta => {
    //     res.status(200).send({
    //         getClientResponse: {    
    //             identificationType: 'DNI',
    //             identificationNumber: '38123123',
    //             name1: 'DAVID',
    //             name2: '',
    //             surname1: 'BOWIE',
    //             surname2: '',
    //             surnameAdoptive1: '',
    //             surnameAdoptive2: '',
    //             sex: 'MASCULINO',
    //             birthDate: '2003-12-06',
    //             nationality: 'ARGENTINO',
    //             docName: '',
    //             creationDate: '2003-12-06',
    //             docBack: 'GSAJGA',
    //             docFront: fakeDocFrenteDNIC,
    //             identificationNumber2: '',
    //             serieNumber: ''  
    //         },
    //         errorMessageDetail: ''
    //     })
    // })
    // .catch( err => {
    //     res.status(200).send({
    //         getClientResponse: {    
    //             identificationType: 'DNI',
    //             identificationNumber: '38123123',
    //             name1: 'DAVID',
    //             name2: '',
    //             surname1: 'BOWIE',
    //             surname2: '',
    //             surnameAdoptive1: '',
    //             surnameAdoptive2: '',
    //             sex: 'MASCULINO',
    //             birthDate: '2003-12-06',
    //             nationality: 'ARGENTINO',
    //             docName: '',
    //             creationDate: '2003-12-06',
    //             docBack: fakeDocDorsoDNIC,
    //             docFront: fakeDocFrenteDNIC,
    //             identificationNumber2: '',
    //             serieNumber: ''  
    //         },
    //         errorMessageDetail: ''
    //     })
    // })

    
    // axios.post(``, req.body)
    //     .then(respuesta => {
    //         res.status(200).send(respuesta?.data)
    //         // res.status(200).send({entNombreComercial: "PIQUARD, GISELE SOLANGE"})
    //     })
    //     .catch(err => {
    //         console.log('ERROR LOCALIDAD:', err.response)
    //         res.status(400).send(err?.response?.data)
    //     });
    
    // res.status(400).send({
    //     action: '',
    //     message: 'Hubo un error BLA BLA BLA',
    //     date: '',
    //     messageType: '',
    //     detalle: '',
    // })
})







//! GLP ---------------------------------------------------------------------
//! -------------------------------------------------------------------------

app.post('/valida-operatoria/ar', (req, res) => {
    axios.post(`https://app-service-mobile-activaciones-ar.apps.osen02.claro.amx/AppServiceMobile/getValidaOperatoriaEnt`, req.body)
        .then(respuesta => {
            res.status(200).send(respuesta?.data)
            //res.status(200).send({entNombreComercial: "PIQUARD, GISELE SOLANGE"})
        })
        .catch(err => {
           // console.log('ERROR LOCALIDAD:', err.response)
            res.status(400).send(err?.response?.data)
        });
})

app.post('/get-all-campanas/ar', (req, res) => {
    axios.post(`https://app-service-mobile-activaciones-ar.apps.osen02.claro.amx/AppServiceMobile/getAllCompanias`, req.body)
        .then(respuesta => {
            res.status(200).send(respuesta?.data)
        })

        .catch(err => {
            console.log('ERROR LOCALIDAD:', err.response)
            res.status(400).send(err?.response?.data)
        });
})

app.post('/get-all-promos/ar', (req, res) => {
    axios.post(`https://app-service-mobile-activaciones-ar.apps.osen02.claro.amx/AppServiceMobile/getAllPromos`, req.body)
        .then(respuesta => {
            res.status(respuesta.status).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR LOCALIDAD:', err.response)
            res.status(err.response?.status).send(err?.response?.data)
        });
})

app.post('/get-all-planes/ar', (req, res) => {
    axios.post(`https://app-service-mobile-activaciones-ar.apps.osen02.claro.amx/AppServiceMobile/getAllPlanes`, req.body)
        .then(respuesta => {
            res.status(200).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR LOCALIDAD:', err.response)
            res.status(400).send(err?.response?.data)
        });
})

app.get('/get-all-tipo-ventas/ar', (req, res) => {
    axios.get(`https://app-service-mobile-activaciones-ar.apps.osen02.claro.amx/AppServiceMobile/getAllTipoVenta`, req.body)
        .then(respuesta => {
            res.status(200).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR LOCALIDAD:', err.response)
            res.status(400).send(err?.response?.data)
        });
})

app.post('/get-all-productos/ar', (req, res) => {
    axios.post(`https://app-service-mobile-activaciones-ar.apps.osen02.claro.amx/AppServiceMobile/getAllProductos`, req.body)
        .then(respuesta => {
            res.status(200).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR LOCALIDAD:', err.response)
            res.status(400).send(err?.response?.data)
        });
})

app.post('/activacion-sim-cac/ar', (req, res) => {
    axios.post(`https://app-service-mobile-activaciones-ar.apps.osen02.claro.amx/AppServiceMobile/activacionSimsCac`, req.body)
        .then(respuesta => {
            res.status(200).send(respuesta?.data)
        })
        .catch(err => {
           // console.log('ERROR LOCALIDAD:', err.response)
            res.status(400).send(err?.response?.data)
        });
        /*const okRes = {
            errorCode: 0,
            errorText: " ",
            nseIccId: "8954310184047735615",
        }*/
      
        // const errorRes = {
        //     errorText: "Error: Tarjeta incorrecta: Codigo invalido.",
        //     errorCode: -1,
        //     nseIccId: "1111111111111111111",
        // }

        // const errorRes2 = {
        //     errorCode: -400,
        //     errorText: "Valido entidad55 -Error:Hay pendiente del 12-JUN-23 que supera el plazo de 20 dias fijado para rendir.",
        //     nseIccId: "8954310184047735607",
        // }

        // const errorRes = {
        //     errorText: 'Error en Actualiza_sds_maveric...Fallo el insert pa_stock.f_movimiento_stock.',
        //     errorCode: -1,
        //     nseIccId: '8954310184047735615'
        // }
})

//Solapa Levantar/ Nominar presuspensión
app.post('/get-nim-presusp/ar', (req, res) => {
    axios.post(`https://mobile-activation-service-activaciones-ar.apps.osen02.claro.amx/getDatosNimPresusp`, req.body)
        .then(respuesta => {
            res.status(200).send(respuesta?.data)
        })
        .catch(err => {
            res.status(400).send(err?.response?.data)
        });
})


app.post('/validate-seller/ar', (req, res) => {
    axios.post(`https://mobile-activation-service-activaciones-ar.apps.osen02.claro.amx/valida-vendedor`, req.body)
        .then(respuesta => {
            res.status(200).send(respuesta?.data)
        })
        .catch(err => {
            res.status(400).send(err?.response?.data)
        });
})

app.post('/validate-area-code/ar', (req, res) => {
    axios.post(`https://mobile-activation-service-activaciones-ar.apps.osen02.claro.amx/valida_codigo_area`, req.body)
        .then(respuesta => {
            res.status(200).send(respuesta?.data)
        })
        .catch(err => {
            res.status(400).send(err?.response?.data)
        });
})

app.get('/current-documents/ar', (req, res) => {
    axios.get(`https://client-qualification-portabilidad-ar.apps.osen02.claro.amx/clientsqualification/current-documents`)
        .then(respuesta => {
            res.status(200).send(respuesta?.data)
        })
        .catch(err => {
            res.status(400).send(err?.response?.data)
        });
})

app.post('/client-profile/ar', (req, res) => {
    axios.post(`https://app-client-portabilidad-ar-desa.apps.osen02.claro.amx/cliente/profile/id`, req.body)
        .then(respuesta => {
            res.status(200).send(respuesta?.data)
        })
        .catch(err => {
            res.status(400).send(err?.response?.data)
        });
})
app.post('/mav-parameters/ar', (req, res) => {
    axios.post(`https://app-parameters-product-dmain-bs-ar.apps.osen02.claro.amx/parameter/mavParameters`, req.body)
        .then(respuesta => {
            res.status(200).send(respuesta?.data)
        })
        .catch(err => {
            res.status(400).send(err?.response?.data)
        });
})


app.post('/ref-codes/ar', (req, res) => {
    axios.post(`https://app-parameters-product-dmain-bs-ar-desa.apps.osen02.claro.amx/parameter/refCodes`, req.body)
        .then(respuesta => {
            res.status(200).send(respuesta?.data)
        })
        .catch(err => {
            console.log('ERROR LOCALIDAD:', err.response)
            res.status(400).send(err?.response?.data)
        });
})


//! PUERTO ----------------------------------------------------------------------------------------------------------------
app.listen(port, () => console.log(`Server ASM iniciado - http://localhost:${port}`))

//! DATA MOCK -------------------------------------------------------------------------------------------------------------
const fakeSeller = {
    seller: {
        tveDescripcion: "SALON",
        tveId: "3",
        veaApellido: "GARECA",
        veaCelular: '1123456789',
        veaDni: "38072000",
        veaEmail: 'dt@velez.com',
        veaId: "36272",
        veaIdentificationType: 'DNI',
        veaNombre: "RICARDO",
        veaObservaciones: null,
        veaSexo: 'M',
    },
    structure: {
        entId: "59655",
        veaId: "36272",
        vesAcumuladoActivacion: null,
        vesAentDescriptiveCode: "TIGRE",
        vesFechaDesde: [2009, 3, 27, 0, 0],
        vesFechaHasta: null,
        vesId: "30379",
        vesLimiteCredito: 0,
        vesMotivo: null,
    }
}

const fakeUserProfile = {
    mavUser: {
        usrAEntidadesEntId: "55",
        usrAdjustmentAmounts: "0",
        usrBlockAccountDate: null,
        usrCorpoFlag: null,
        usrDbaAccessControl: "S",
        usrDroRole: "AGE000055",
        usrDropFlag: null,
        usrEndDate: null,
        usrEndDateUse: null,
        usrId: "AGE000055",
        usrIdentificationNumber: null,
        usrIdentificationType: null,
        usrIpFlag: null,
        usrLeg: null,
        usrMailAddress: "rsemolaleal@claro.com.ar",
        usrName: "ARKAY S.A.",
        usrSurName: null,
        usrTesId: null,
        usrUgrId: "DEALER",
        usrUsrId: null
    },
    userPlace: {
        uspAddress: "San Luis 1771",
        uspCentralizing: "N",
        uspCmpId: "2",
        uspCompany: "S",
        uspCustomerGroupMail: "CUSTOMER SERVICE MAR DEL PLATA",
        uspDescription: "CAC MAR DEL PLATA",
        uspEndIp: "10.255.255.255",
        uspId: "MPL",
        uspParentActUspId: "MPL",
        uspParentUspId: "MPL",
        uspParentUspIdCob: "MPL",
        uspPhoneNumber: "0800 123 0611",
        uspProvince: "MAR DEL PLATA",
        uspRapId: "D",
        uspReceiptSap: "2",
        uspRegCode: "BALA",
        uspSapCenter: "CTIS",
        uspStartIp: "10.0.0.0",
        uspStoreEntId: null,
        uspZipCode: "7600"
    },
    userEntity: {
        entDiasVencimiento: "10",
        entDiasVencimientoPp: "4",
        canId: "2",
        tentId: "1",
        tentDescrip: "AGENTE",
        teeIdEstado: "1",
        cmpId: "2",
        tdocId: "1",
        entPeriodoRendicion: "20",
        entPeriodoLegajo: null,
        entId: "17491",
        unId: "2",
        entRindeEnt: "17491",
        entLimiteCredito: null,
        entRelacion: null,
        entPorcentajeNeteo: null,
        entPorcentajeNeteoEspecial: null,
        entAnulado: "N",
        entEnvioFactura: "N",
        entChkFactura: "N",
        entChkLote: "S",
        entRindeBcoRio: "K",
        accId: "107971582",
        entUsrId: null,
        entNroCuit: "30709090492",
        entIngBrutos: "9027758860",
        entCelular: null,
        entDigitCbu: null,
        entTelefono: "02234860051",
        entFax: "02234863821",
        entRegCode: "BALA",
        entNombreOficial: "ARKAY TS S.A. OFICIAL",
        entNombreComercial: "ARKAY TS S.A.",
        entRepreLegal: "ELICHIRIBEHETY EDUARDO",
        entDealerCode: "A0081",
        entSubDealerCode: "00000",
        vatId: "RI",
        entEmail: "ramon.romero@claro.com.ar",
        entContacto: "ELICHIRIBEHETY EDUARDO",
        entLegajo: "08829",
        entPrtId: "PRT001",
        entNrodoc: "99048515",
        entPassword: "xÈÃ\u0012@",
        nroDoc: null,
        canDescrip: "INDIRECTA",
        parents: [],
    }
}

const fakeEntity = {
    "entidad": {
        "entFechaAlta": [
            1997,
            1,
            1,
            0,
            0
        ],
        "entFechaBaja": null,
        "canId": 2,
        "tentId": 1,
        "tentDescrip": "AGENTE",
        "teeIdEstado": 1,
        "entId": 55,
        "entPadreId": 0,
        "entRindeEnt": 55,
        "entNombreOficial": "ARKAY TEST",
        "entNombreComercial": "ARKAY TEST"
    },
    "listaEntidades": [
        {
            "entFechaAlta": [
            1997,
            1,
            1,
            0,
            0
            ],
            "entFechaBaja": null,
            "canId": 2,
            "tentId": 1,
            "tentDescrip": "AGENTE",
            "teeIdEstado": 1,
            "entId": 55,
            "entPadreId": 0,
            "entRindeEnt": 55,
            "entNombreOficial": "ARKAY TEST",
            "entNombreComercial": "ARKAY TEST"
        },
        {
            "entFechaAlta": [
            2015,
            3,
            19,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 2,
            "tentDescrip": "SUBAGENTE",
            "teeIdEstado": 3,
            "entId": 198055,
            "entPadreId": 55,
            "entRindeEnt": null,
            "entNombreOficial": "EL SUPER MISIL",
            "entNombreComercial": "MIRIAM"
        },
        {
            "entFechaAlta": [
            2015,
            5,
            26,
            13,
            49,
            48
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 1,
            "tentDescrip": "AGENTE",
            "teeIdEstado": 3,
            "entId": 198126,
            "entPadreId": 55,
            "entRindeEnt": 198126,
            "entNombreOficial": "SAP VALIDA V2",
            "entNombreComercial": "TEST VALIDA SAP V2"
        },
        {
            "entFechaAlta": [
            2015,
            6,
            5,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 2,
            "tentDescrip": "SUBAGENTE",
            "teeIdEstado": 3,
            "entId": 198167,
            "entPadreId": 55,
            "entRindeEnt": null,
            "entNombreOficial": "CELULARES LERU LERU",
            "entNombreComercial": "CELULARES LERU LERU"
        },
        {
            "entFechaAlta": [
            2016,
            11,
            9,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 2,
            "tentDescrip": "SUBAGENTE",
            "teeIdEstado": 3,
            "entId": 199331,
            "entPadreId": 55,
            "entRindeEnt": null,
            "entNombreOficial": "ENTIDAD AUTOMATIZADA - 09/11/2016 - 1",
            "entNombreComercial": "ENTIDAD AUTOMATIZADA - 09/11/2016 - 1"
        },
        {
            "entFechaAlta": [
            2004,
            6,
            22,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 2,
            "tentDescrip": "SUBAGENTE",
            "teeIdEstado": 3,
            "entId": 35330,
            "entPadreId": 55,
            "entRindeEnt": null,
            "entNombreOficial": "RODRIGUEZ CONSTANTINO MARIA",
            "entNombreComercial": "RODRIGUEZ CONSTANTINO MARIA"
        },
        {
            "entFechaAlta": [
            2016,
            10,
            3,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 2,
            "tentDescrip": "SUBAGENTE",
            "teeIdEstado": 3,
            "entId": 199259,
            "entPadreId": 55,
            "entRindeEnt": null,
            "entNombreOficial": "ENTIDA_1000",
            "entNombreComercial": "ENTIDA_1000"
        },
        {
            "entFechaAlta": [
            2015,
            6,
            22,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 1204,
            "tentDescrip": "CALL CENTER HOMOLOGADO",
            "teeIdEstado": 3,
            "entId": 198275,
            "entPadreId": 55,
            "entRindeEnt": 198275,
            "entNombreOficial": "ICH SA EDITADO",
            "entNombreComercial": "ICH SA EDITADO"
        },
        {
            "entFechaAlta": [
            2009,
            11,
            24,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 1,
            "tentId": 4,
            "tentDescrip": "EJECUTIVO DE CUENTA",
            "teeIdEstado": 3,
            "entId": 197232,
            "entPadreId": 55,
            "entRindeEnt": null,
            "entNombreOficial": "SS",
            "entNombreComercial": "SS"
        },
        {
            "entFechaAlta": [
            2009,
            12,
            9,
            17,
            9,
            25
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 3,
            "tentDescrip": "SUCURSAL DE AGENTE",
            "teeIdEstado": 3,
            "entId": 197246,
            "entPadreId": 55,
            "entRindeEnt": 197246,
            "entNombreOficial": "ARKAY S.A.",
            "entNombreComercial": "ARKAY CONGRESO"
        },
        {
            "entFechaAlta": [
            2009,
            12,
            9,
            17,
            39,
            21
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 3,
            "tentDescrip": "SUCURSAL DE AGENTE",
            "teeIdEstado": 3,
            "entId": 197247,
            "entPadreId": 55,
            "entRindeEnt": 197247,
            "entNombreOficial": "ARKAY S.A.",
            "entNombreComercial": "ARKAY CONGRESO"
        },
        {
            "entFechaAlta": [
            1999,
            3,
            22,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 1,
            "tentDescrip": "AGENTE",
            "teeIdEstado": 3,
            "entId": 9556,
            "entPadreId": 55,
            "entRindeEnt": 9556,
            "entNombreOficial": "NOLITEL S.R.L.",
            "entNombreComercial": "NOLITEL S.R.L."
        },
        {
            "entFechaAlta": [
            2010,
            8,
            10,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 824,
            "tentDescrip": "EJECUTIVO HOMOLOGADO",
            "teeIdEstado": 3,
            "entId": 197535,
            "entPadreId": 55,
            "entRindeEnt": null,
            "entNombreOficial": "HOMOL",
            "entNombreComercial": "HOMOL"
        },
        {
            "entFechaAlta": [
            1991,
            4,
            16,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 28,
            "tentId": 38,
            "tentDescrip": "STORE",
            "teeIdEstado": 3,
            "entId": 4396,
            "entPadreId": 55,
            "entRindeEnt": 4396,
            "entNombreOficial": "CAC TUCUMAN",
            "entNombreComercial": "CAC TUCUMAN"
        },
        {
            "entFechaAlta": [
            2010,
            7,
            30,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 824,
            "tentDescrip": "EJECUTIVO HOMOLOGADO",
            "teeIdEstado": 3,
            "entId": 197517,
            "entPadreId": 55,
            "entRindeEnt": null,
            "entNombreOficial": "HOMOLO PRUEBA",
            "entNombreComercial": "HOMOLO PRUEBA"
        },
        {
            "entFechaAlta": [
            2010,
            8,
            11,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 2,
            "tentDescrip": "SUBAGENTE",
            "teeIdEstado": 3,
            "entId": 197537,
            "entPadreId": 55,
            "entRindeEnt": null,
            "entNombreOficial": "YYYYYY",
            "entNombreComercial": "YYYY"
        },
        {
            "entFechaAlta": [
            2004,
            1,
            13,
            9,
            1,
            30
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 28,
            "tentId": 38,
            "tentDescrip": "STORE",
            "teeIdEstado": 3,
            "entId": 28419,
            "entPadreId": 55,
            "entRindeEnt": 28419,
            "entNombreOficial": "PAZ, DOLORES",
            "entNombreComercial": "PAZ, DOLORES"
        },
        {
            "entFechaAlta": [
            2017,
            9,
            6,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 1,
            "tentDescrip": "AGENTE",
            "teeIdEstado": 3,
            "entId": 199636,
            "entPadreId": 55,
            "entRindeEnt": null,
            "entNombreOficial": "A",
            "entNombreComercial": "A"
        },
        {
            "entFechaAlta": [
            2017,
            9,
            29,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 1,
            "tentDescrip": "AGENTE",
            "teeIdEstado": 3,
            "entId": 199672,
            "entPadreId": 55,
            "entRindeEnt": null,
            "entNombreOficial": "ASDFASD",
            "entNombreComercial": "SDFSDF"
        },
        {
            "entFechaAlta": [
            2018,
            8,
            30,
            17,
            3,
            21
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 2,
            "tentDescrip": "SUBAGENTE",
            "teeIdEstado": 3,
            "entId": 761927,
            "entPadreId": 55,
            "entRindeEnt": 761927,
            "entNombreOficial": "MORERO ARIEL",
            "entNombreComercial": "MORERO ARIEL"
        },
        {
            "entFechaAlta": [
            2013,
            9,
            12,
            16,
            19,
            56
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 1,
            "tentDescrip": "AGENTE",
            "teeIdEstado": 3,
            "entId": 197943,
            "entPadreId": 55,
            "entRindeEnt": null,
            "entNombreOficial": "PRUEBA 1",
            "entNombreComercial": "PRUEBA 1"
        },
        {
            "entFechaAlta": [
            2016,
            12,
            28,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 1,
            "tentDescrip": "AGENTE",
            "teeIdEstado": 3,
            "entId": 199386,
            "entPadreId": 55,
            "entRindeEnt": 55,
            "entNombreOficial": "TEST2016122805",
            "entNombreComercial": "TEST2016122805"
        },
        {
            "entFechaAlta": [
            2016,
            5,
            16,
            11,
            47,
            25
            ],
            "entFechaBaja": null,
            "canId": 2,
            "tentId": 1204,
            "tentDescrip": "CALL CENTER HOMOLOGADO",
            "teeIdEstado": 1,
            "entId": 580829,
            "entPadreId": 55,
            "entRindeEnt": 580829,
            "entNombreOficial": "ARKAY TS S.A.",
            "entNombreComercial": "CALL CENTER HOMOLOGADO - ARKAY TS S.A."
        },
        {
            "entFechaAlta": [
            2016,
            12,
            19,
            15,
            3,
            29
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 2,
            "tentDescrip": "SUBAGENTE",
            "teeIdEstado": 3,
            "entId": 621448,
            "entPadreId": 55,
            "entRindeEnt": 621448,
            "entNombreOficial": "CHAPARRO CLAUDIA",
            "entNombreComercial": "COMUNICACIONES INTERCELL S.R.L."
        },
        {
            "entFechaAlta": [
            2016,
            12,
            22,
            16,
            36,
            17
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 2,
            "tentDescrip": "SUBAGENTE",
            "teeIdEstado": 3,
            "entId": 622169,
            "entPadreId": 55,
            "entRindeEnt": 622169,
            "entNombreOficial": "SIROLLI EDUARDO",
            "entNombreComercial": "SIROLLI EDUARDO"
        },
        {
            "entFechaAlta": [
            2016,
            12,
            23,
            12,
            30,
            55
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 2,
            "tentDescrip": "SUBAGENTE",
            "teeIdEstado": 3,
            "entId": 622410,
            "entPadreId": 55,
            "entRindeEnt": 622410,
            "entNombreOficial": "ACOSTA ROBERTO DAVID",
            "entNombreComercial": "ACOSTA ROBERTO DAVID"
        },
        {
            "entFechaAlta": [
            2017,
            5,
            12,
            16,
            55,
            49
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 2,
            "tentDescrip": "SUBAGENTE",
            "teeIdEstado": 3,
            "entId": 653467,
            "entPadreId": 55,
            "entRindeEnt": 653467,
            "entNombreOficial": "CERSOSIMO CRISTIAN HECTOR",
            "entNombreComercial": "M.C. COMUNICACIONES S.H."
        },
        {
            "entFechaAlta": [
            2017,
            5,
            22,
            15,
            1,
            32
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 3,
            "tentDescrip": "SUCURSAL DE AGENTE",
            "teeIdEstado": 3,
            "entId": 655675,
            "entPadreId": 55,
            "entRindeEnt": 655675,
            "entNombreOficial": "ARKAY TS S.A.",
            "entNombreComercial": "ARKAY TS S.A."
        },
        {
            "entFechaAlta": [
            2013,
            12,
            11,
            12,
            49,
            19
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 2,
            "tentDescrip": "SUBAGENTE",
            "teeIdEstado": 3,
            "entId": 487110,
            "entPadreId": 55,
            "entRindeEnt": 487110,
            "entNombreOficial": "RODRIGUEZ CHRISTIAN ANIBAL",
            "entNombreComercial": "INFORMATICA CENTRO"
        },
        {
            "entFechaAlta": [
            2014,
            7,
            7,
            9,
            58,
            38
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 3,
            "tentDescrip": "SUCURSAL DE AGENTE",
            "teeIdEstado": 3,
            "entId": 498028,
            "entPadreId": 55,
            "entRindeEnt": 498028,
            "entNombreOficial": "ARKAY TS S.A.",
            "entNombreComercial": "ARKAY TS S.A."
        },
        {
            "entFechaAlta": [
            2008,
            6,
            5,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 2,
            "tentDescrip": "SUBAGENTE",
            "teeIdEstado": 3,
            "entId": 194659,
            "entPadreId": 55,
            "entRindeEnt": null,
            "entNombreOficial": "CASTRO MARIA ISABEL",
            "entNombreComercial": "CASTRO MARIA ISABEL"
        },
        {
            "entFechaAlta": [
            2005,
            5,
            20,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 1,
            "tentDescrip": "AGENTE",
            "teeIdEstado": 3,
            "entId": 103972,
            "entPadreId": 55,
            "entRindeEnt": null,
            "entNombreOficial": "CREDICOOR",
            "entNombreComercial": "CREDICOOR"
        },
        {
            "entFechaAlta": [
            2002,
            2,
            28,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 2,
            "tentDescrip": "SUBAGENTE",
            "teeIdEstado": 3,
            "entId": 21120,
            "entPadreId": 55,
            "entRindeEnt": null,
            "entNombreOficial": "RANDOM COMPUTACION",
            "entNombreComercial": "RANDOM COMPUTACION"
        },
        {
            "entFechaAlta": [
            2008,
            5,
            12,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 824,
            "tentDescrip": "EJECUTIVO HOMOLOGADO",
            "teeIdEstado": 3,
            "entId": 194260,
            "entPadreId": 55,
            "entRindeEnt": null,
            "entNombreOficial": "SNIDER NEREO NESTOR",
            "entNombreComercial": "SNIDER NEREO NESTOR"
        },
        {
            "entFechaAlta": [
            2008,
            5,
            12,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 824,
            "tentDescrip": "EJECUTIVO HOMOLOGADO",
            "teeIdEstado": 3,
            "entId": 194261,
            "entPadreId": 55,
            "entRindeEnt": null,
            "entNombreOficial": "MEDINA BRUNO OMAR",
            "entNombreComercial": "MEDINA BRUNO OMAR"
        },
        {
            "entFechaAlta": [
            2016,
            9,
            29,
            15,
            54,
            14
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 3,
            "tentDescrip": "SUCURSAL DE AGENTE",
            "teeIdEstado": 3,
            "entId": 199254,
            "entPadreId": 55,
            "entRindeEnt": 199254,
            "entNombreOficial": "ACEVEDO CHAMORRO, MARIA ESTAFANIA MONTSE",
            "entNombreComercial": "PRUEBA"
        },
        {
            "entFechaAlta": [
            2017,
            5,
            31,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 1,
            "tentDescrip": "AGENTE",
            "teeIdEstado": 3,
            "entId": 199463,
            "entPadreId": 55,
            "entRindeEnt": null,
            "entNombreOficial": "ENTIDAD_CLARO_2",
            "entNombreComercial": "ENTIDAD_CLARO_1"
        },
        {
            "entFechaAlta": [
            2017,
            5,
            31,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 5,
            "tentId": 356,
            "tentDescrip": "AGENTE-RETAIL",
            "teeIdEstado": 3,
            "entId": 199464,
            "entPadreId": 55,
            "entRindeEnt": null,
            "entNombreOficial": "ENTIDAD_CLARO_2",
            "entNombreComercial": "ENTIDAD_CLARO_2"
        },
        {
            "entFechaAlta": [
            1997,
            11,
            26,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 2,
            "tentDescrip": "SUBAGENTE",
            "teeIdEstado": 3,
            "entId": 156,
            "entPadreId": 55,
            "entRindeEnt": 156,
            "entNombreOficial": "PROVINTEL S.R.L.",
            "entNombreComercial": "ORLANDO GOBET E HIJOS S.A."
        },
        {
            "entFechaAlta": [
            1998,
            4,
            27,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 3,
            "tentDescrip": "SUCURSAL DE AGENTE",
            "teeIdEstado": 3,
            "entId": 217,
            "entPadreId": 55,
            "entRindeEnt": 217,
            "entNombreOficial": "PROVINTEL S.R.L.",
            "entNombreComercial": "ADRIAN SOLER Y PABLO VIDAL"
        },
        {
            "entFechaAlta": [
            2011,
            3,
            3,
            16,
            36,
            42
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 824,
            "tentDescrip": "EJECUTIVO HOMOLOGADO",
            "teeIdEstado": 3,
            "entId": 197696,
            "entPadreId": 55,
            "entRindeEnt": null,
            "entNombreOficial": "HOMOL2",
            "entNombreComercial": "HOMOL2"
        },
        {
            "entFechaAlta": [
            1996,
            1,
            1,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 2,
            "tentDescrip": "SUBAGENTE",
            "teeIdEstado": 3,
            "entId": 97,
            "entPadreId": 55,
            "entRindeEnt": 97,
            "entNombreOficial": "PROVINTEL S.R.L.",
            "entNombreComercial": "URIBARRI, ALDO"
        },
        {
            "entFechaAlta": [
            1997,
            11,
            26,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 2,
            "tentDescrip": "SUBAGENTE",
            "teeIdEstado": 3,
            "entId": 155,
            "entPadreId": 55,
            "entRindeEnt": 155,
            "entNombreOficial": "PROVINTEL S.R.L.",
            "entNombreComercial": "ORLANDO GOBET E HIJOS S.A."
        },
        {
            "entFechaAlta": [
            1998,
            1,
            21,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 2,
            "tentDescrip": "SUBAGENTE",
            "teeIdEstado": 3,
            "entId": 185,
            "entPadreId": 55,
            "entRindeEnt": 185,
            "entNombreOficial": "PROVINTEL S.R.L.",
            "entNombreComercial": "PUL SER S.A."
        },
        {
            "entFechaAlta": [
            1998,
            4,
            24,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 2,
            "tentDescrip": "SUBAGENTE",
            "teeIdEstado": 3,
            "entId": 215,
            "entPadreId": 55,
            "entRindeEnt": 215,
            "entNombreOficial": "PROVINTEL S.R.L.",
            "entNombreComercial": "Z CELL S.R.L."
        },
        {
            "entFechaAlta": [
            1997,
            1,
            1,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 2,
            "tentDescrip": "SUBAGENTE",
            "teeIdEstado": 3,
            "entId": 5291,
            "entPadreId": 55,
            "entRindeEnt": 55,
            "entNombreOficial": "PROVINTEL S.R.L.",
            "entNombreComercial": "JORGE CARDOZO"
        },
        {
            "entFechaAlta": [
            1998,
            10,
            22,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 2,
            "tentDescrip": "SUBAGENTE",
            "teeIdEstado": 3,
            "entId": 8590,
            "entPadreId": 55,
            "entRindeEnt": 8590,
            "entNombreOficial": "PROVINTEL S.R.L.",
            "entNombreComercial": "CEL - SAT"
        },
        {
            "entFechaAlta": [
            1999,
            8,
            31,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 2,
            "tentDescrip": "SUBAGENTE",
            "teeIdEstado": 3,
            "entId": 10291,
            "entPadreId": 55,
            "entRindeEnt": 10291,
            "entNombreOficial": "GROENEMBERG MARINA",
            "entNombreComercial": "GROENEMBERG MARINA"
        },
        {
            "entFechaAlta": [
            2008,
            8,
            1,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 2,
            "tentDescrip": "SUBAGENTE",
            "teeIdEstado": 3,
            "entId": 195230,
            "entPadreId": 55,
            "entRindeEnt": null,
            "entNombreOficial": "MARTINEZ MONICA PATRICIA",
            "entNombreComercial": "MARTINEZ MONICA PATRICIA"
        },
        {
            "entFechaAlta": [
            2009,
            5,
            5,
            0,
            0
            ],
            "entFechaBaja": [
            2021,
            4,
            29,
            0,
            0
            ],
            "canId": 2,
            "tentId": 1,
            "tentDescrip": "AGENTE",
            "teeIdEstado": 3,
            "entId": 199826,
            "entPadreId": 55,
            "entRindeEnt": null,
            "entNombreOficial": "FRANCISCO",
            "entNombreComercial": "FDC"
        }
    ]
}

const fakeSubagentSellers = {
    sellerResponseList: [
        {
            seller: {
                veaId: "41737",
                tveId: "1",
                tveDescripcion: "CALLE",
                veaDni: "38111111",
                veaNombre: "RICARDO",
                veaApellido: "GARECA",
                veaCelular: "1123452345",
                veaEmail: "DT@VELEZ.COM",
                veaObservaciones: "EL TIGRE CAMPEON",
                veaSexo: "M",
                veaIdentificationType: "DNI",
            },
            structure: {
                vesId: "55736",
                veaId: "41737",
                entId: "182",
                vesLimiteCredito: 500,
                vesAcumuladoActivacion: 0,
                vesFechaDesde: [
                    2023,
                    5,
                    2,
                    0,
                    0
                ],
                vesFechaHasta: null,
                vesMotivo: null,
                vesAentDescriptiveCode: "123",
            }
        }
    ]
}

const fakeExtraSeller = {
    seller: {
        tveDescripcion: "CALLE",
        tveId: "1",
        veaApellido: "BIANCHI",
        veaCelular: '1145674567',
        veaDni: "99999999",
        veaEmail: 'VIRREY@DT.COM',
        veaId: "5293",
        veaIdentificationType: 'DNI',
        veaNombre: "CARLOS",
        veaObservaciones: null,
        veaSexo: 'M',
    },
    structure: {
        entId: "",
        veaId: "",
        vesAcumuladoActivacion: 0,
        vesAentDescriptiveCode: "",
        vesFechaDesde: "04/05/2023",
        vesFechaHasta: "",
        vesId: "",
        vesLimiteCredito: "",
        vesMotivo: "",
    }
}

// OBSOLETOS
const fakeEntityConHijos = {
    entidad: {
        entFechaAlta: [
            1997,
            1,
            1,
            0,
            0
        ],
        entFechaBaja: null,
        canId: 2,
        tentId: 1,
        tentDescrip: "AGENTE",
        teeIdEstado: 1,
        entId: 55,
        entPadreId: 0,
        entRindeEnt: 55,
        entNombreOficial: "ARKAY TEST",
        entNombreComercial: "ARKAY TEST"
    },
    entidadesHIjas: [
        {
            entFechaAlta: [
                2017,
                6,
                7,
                0,
                0
            ],
            entFechaBaja: null,
            canId: 152,
            tentId: 458,
            tentDescrip: null,
            teeIdEstado: 1,
            entId: 199496,
            entPadreId: null,
            entRindeEnt: null,
            entNombreOficial: "ENTIDAD_CLARO_22",
            entNombreComercial: "ENTIDAD_CLARO_22"
        },
        {
            entFechaAlta: [
                2017,
                6,
                7,
                0,
                0
            ],
            entFechaBaja: null,
            canId: 152,
            tentId: 458,
            tentDescrip: null,
            teeIdEstado: 1,
            entId: 199498,
            entPadreId: null,
            entRindeEnt: null,
            entNombreOficial: "ENTIDAD_CLARO_24",
            entNombreComercial: "ENTIDAD_CLARO_24"
        },
        {
            entFechaAlta: [
                2019,
                10,
                30,
                0,
                0
            ],
            entFechaBaja: null,
            canId: 152,
            tentId: 458,
            tentDescrip: null,
            teeIdEstado: 1,
            entId: 405748,
            entPadreId: null,
            entRindeEnt: null,
            entNombreOficial: "KAKJASLDKJALSKD",
            entNombreComercial: "ASDALSKDALSKJ"
        },
        {
            entFechaAlta: [
                1997,
                12,
                17,
                0,
                0
            ],
            entFechaBaja: null,
            canId: 152,
            tentId: 459,
            tentDescrip: null,
            teeIdEstado: 1,
            entId: 182,
            entPadreId: null,
            entRindeEnt: 182,
            entNombreOficial: "PROVINTEL S.R.L.",
            entNombreComercial: "NESTOR COLAVITA"
        },
        {
            entFechaAlta: [
                2017,
                11,
                27,
                9,
                39,
                1
            ],
            entFechaBaja: null,
            canId: 2,
            tentId: 2,
            tentDescrip: null,
            teeIdEstado: 1,
            entId: 696579,
            entPadreId: null,
            entRindeEnt: 696579,
            entNombreOficial: "FUENTES PRIMO CLAUDIA",
            entNombreComercial: "FUENTES PRIMO CLAUDIA"
        },
        {
            entFechaAlta: [
                2004,
                10,
                26,
                0,
                0
            ],
            entFechaBaja: null,
            canId: 2,
            tentId: 2,
            tentDescrip: null,
            teeIdEstado: 1,
            entId: 59654,
            entPadreId: null,
            entRindeEnt: null,
            entNombreOficial: "PROVINTEL SRL",
            entNombreComercial: "PERREZ MONICA BEATRIZ"
        },
        {
            entFechaAlta: [
                2005,
                6,
                7,
                0,
                0
            ],
            entFechaBaja: null,
            canId: 2,
            tentId: 2,
            tentDescrip: null,
            teeIdEstado: 1,
            entId: 109218,
            entPadreId: null,
            entRindeEnt: null,
            entNombreOficial: "DI LUCIANO SAN MARTIN CARINA",
            entNombreComercial: "DAK TRADER"
        },
        {
            entFechaAlta: [
                2008,
                4,
                8,
                0,
                0
            ],
            entFechaBaja: null,
            canId: 2,
            tentId: 824,
            tentDescrip: null,
            teeIdEstado: 1,
            entId: 193941,
            entPadreId: null,
            entRindeEnt: null,
            entNombreOficial: "ABRAHAM MARIELA",
            entNombreComercial: "ABRAHAM MARIELA"
        },
        {
            entFechaAlta: [
                2008,
                4,
                8,
                0,
                0
            ],
            entFechaBaja: null,
            canId: 2,
            tentId: 824,
            tentDescrip: null,
            teeIdEstado: 1,
            entId: 193943,
            entPadreId: null,
            entRindeEnt: null,
            entNombreOficial: "CUBERO PAULA FLORENTINA",
            entNombreComercial: "CUBERO PAULA FLORENTINA"
        },
        {
            entFechaAlta: [
                2016,
                5,
                16,
                11,
                47,
                25
            ],
            entFechaBaja: null,
            canId: 2,
            tentId: 1204,
            tentDescrip: null,
            teeIdEstado: 1,
            entId: 580829,
            entPadreId: null,
            entRindeEnt: 580829,
            entNombreOficial: "ARKAY TS S.A.",
            entNombreComercial: "CALL CENTER HOMOLOGADO - ARKAY TS S.A."
        },
        {
            entFechaAlta: [
                1998,
                1,
                28,
                0,
                0
            ],
            entFechaBaja: null,
            canId: 2,
            tentId: 2,
            tentDescrip: null,
            teeIdEstado: 1,
            entId: 186,
            entPadreId: null,
            entRindeEnt: 55,
            entNombreOficial: "PROVINTEL S.R.L.",
            entNombreComercial: "CELLULAR S.E.T."
        },
        {
            entFechaAlta: [
                1999,
                1,
                5,
                0,
                0
            ],
            entFechaBaja: null,
            canId: 2,
            tentId: 2,
            tentDescrip: null,
            teeIdEstado: 1,
            entId: 9114,
            entPadreId: null,
            entRindeEnt: 55,
            entNombreOficial: "PROVINTEL S.R.L.",
            entNombreComercial: "CELLULAR COM S.R.L."
        },
        {
            entFechaAlta: [
                2004,
                7,
                5,
                0,
                0
            ],
            entFechaBaja: null,
            canId: 2,
            tentId: 3,
            tentDescrip: null,
            teeIdEstado: 1,
            entId: 37101,
            entPadreId: null,
            entRindeEnt: null,
            entNombreOficial: "ARKAY S.A.",
            entNombreComercial: "ARKAY S.A."
        },
        {
            entFechaAlta: [
                2016,
                12,
                6,
                0,
                0
            ],
            entFechaBaja: null,
            canId: 2,
            tentId: 1,
            tentDescrip: null,
            teeIdEstado: 1,
            entId: 199370,
            entPadreId: null,
            entRindeEnt: null,
            entNombreOficial: "ASDASD",
            entNombreComercial: "ASDASD"
        },
        {
            entFechaAlta: [
                2006,
                11,
                30,
                0,
                0
            ],
            entFechaBaja: null,
            canId: 2,
            tentId: 3,
            tentDescrip: null,
            teeIdEstado: 1,
            entId: 189602,
            entPadreId: null,
            entRindeEnt: null,
            entNombreOficial: "ARKAY S.A.",
            entNombreComercial: "ARKAY S.A. SUCURSAL NQN"
        },
        {
            entFechaAlta: [
                2007,
                2,
                15,
                0,
                0
            ],
            entFechaBaja: null,
            canId: 2,
            tentId: 2,
            tentDescrip: null,
            teeIdEstado: 1,
            entId: 190143,
            entPadreId: null,
            entRindeEnt: null,
            entNombreOficial: "GARCIA IRENE",
            entNombreComercial: "DOS MEGA"
        },
        {
            entFechaAlta: [
                2007,
                2,
                15,
                0,
                0
            ],
            entFechaBaja: null,
            canId: 2,
            tentId: 3,
            tentDescrip: null,
            teeIdEstado: 1,
            entId: 190141,
            entPadreId: null,
            entRindeEnt: null,
            entNombreOficial: "ARKAY S.A.",
            entNombreComercial: "ARKAY S.A. AMBA"
        },
        {
            entFechaAlta: [
                2017,
                11,
                27,
                9,
                39,
                1
            ],
            entFechaBaja: null,
            canId: 2,
            tentId: 2,
            tentDescrip: null,
            teeIdEstado: 1,
            entId: 696579,
            entPadreId: null,
            entRindeEnt: 696579,
            entNombreOficial: "FUENTES PRIMO CLAUDIA",
            entNombreComercial: "FUENTES PRIMO CLAUDIA"
        },
        {
            entFechaAlta: [
                2017,
                12,
                7,
                0,
                0
            ],
            entFechaBaja: null,
            canId: 2,
            tentId: 1,
            tentDescrip: null,
            teeIdEstado: 1,
            entId: 199791,
            entPadreId: null,
            entRindeEnt: null,
            entNombreOficial: "ENT_REACTIVA_1021_P",
            entNombreComercial: "ENT_REACTIVA_1021_P"
        },
        {
            entFechaAlta: [
                2001,
                11,
                16,
                0,
                0
            ],
            entFechaBaja: null,
            canId: 2,
            tentId: 2,
            tentDescrip: null,
            teeIdEstado: 1,
            entId: 19735,
            entPadreId: null,
            entRindeEnt: 55,
            entNombreOficial: "MONEZ RUIZ GONZALO",
            entNombreComercial: "MONEZ RUIZ GONZALO"
        },
        {
            entFechaAlta: [
                2005,
                1,
                19,
                0,
                0
            ],
            entFechaBaja: null,
            canId: 2,
            tentId: 2,
            tentDescrip: null,
            teeIdEstado: 1,
            entId: 71802,
            entPadreId: null,
            entRindeEnt: null,
            entNombreOficial: "CREDICORR",
            entNombreComercial: "CREDICORR"
        },
        {
            entFechaAlta: [
                1997,
                12,
                15,
                0,
                0
            ],
            entFechaBaja: null,
            canId: 2,
            tentId: 2,
            tentDescrip: null,
            teeIdEstado: 1,
            entId: 171,
            entPadreId: null,
            entRindeEnt: 171,
            entNombreOficial: "PROVINTEL S.R.L.",
            entNombreComercial: "CEL TV SRL"
        },
        {
            entFechaAlta: [
                1998,
                1,
                21,
                0,
                0
            ],
            entFechaBaja: null,
            canId: 152,
            tentId: 458,
            tentDescrip: null,
            teeIdEstado: 1,
            entId: 184,
            entPadreId: null,
            entRindeEnt: 184,
            entNombreOficial: "PROVINTEL S.R.L.",
            entNombreComercial: "ORVE"
        }
    ],
    message: null
}

const fakeEntitySinHijos = {
    entidad: {
        entFechaAlta: [
            1997,
            1,
            1,
            0,
            0
        ],
        entFechaBaja: null,
        canId: 2,
        tentId: 1,
        tentDescrip: "AGENTE",
        teeIdEstado: 1,
        entId: 55,
        entPadreId: 0,
        entRindeEnt: 55,
        entNombreOficial: "ARKAY TEST",
        entNombreComercial: "ARKAY TEST"
    },
    entidadesHIjas: [],
    message: null
}

const fakeEntitySellers = {
    sellerResponseList: [
        {
            seller: {
                veaId: "1909",
                tveId: "3",
                tveDescripcion: "CALLE Y SALON",
                veaDni: "13764370",
                veaNombre: null,
                veaApellido: "PROVINTEL SRL",
                veaCelular: null,
                veaEmail: null,
                veaObservaciones: null,
                veaSexo: null,
                veaIdentificationType: null
            },
            structure: {
                vesId: "1981",
                veaId: "1909",
                entId: "55",
                vesLimiteCredito: 500,
                vesAcumuladoActivacion: null,
                vesFechaDesde: [
                    2002,
                    5,
                    14,
                    0,
                    0
                ],
                vesFechaHasta: [
                    2022,
                    10,
                    28,
                    0,
                    0
                ],
                vesMotivo: "TRASLADO A OTRA AGENCIA",
                vesAentDescriptiveCode: "0055"
            }
        },
        {
            seller: {
                veaId: "4615",
                tveId: "3",
                tveDescripcion: "CALLE Y SALON",
                veaDni: "7694",
                veaNombre: "LORENA",
                veaApellido: "MATEOS",
                veaCelular: null,
                veaEmail: null,
                veaObservaciones: null,
                veaSexo: null,
                veaIdentificationType: null
            },
            structure: {
                vesId: "4832",
                veaId: "4615",
                entId: "55",
                vesLimiteCredito: 10,
                vesAcumuladoActivacion: -1616.99,
                vesFechaDesde: [
                    2003,
                    6,
                    26,
                    0,
                    0
                ],
                vesFechaHasta: [
                    3999,
                    1,
                    20,
                    0,
                    0
                ],
                vesMotivo: "RENUNCIA",
                vesAentDescriptiveCode: "0101"
            }
        },
        {
            seller: {
                veaId: "424",
                tveId: "3",
                tveDescripcion: "CALLE Y SALON",
                veaDni: "3104",
                veaNombre: "ARIEL",
                veaApellido: "ALIPRANDI",
                veaCelular: null,
                veaEmail: null,
                veaObservaciones: null,
                veaSexo: null,
                veaIdentificationType: null
            },
            structure: {
                vesId: "4839",
                veaId: "424",
                entId: "55",
                vesLimiteCredito: 10,
                vesAcumuladoActivacion: null,
                vesFechaDesde: [
                    2003,
                    7,
                    1,
                    0,
                    0
                ],
                vesFechaHasta: [
                    3999,
                    1,
                    20,
                    0,
                    0
                ],
                vesMotivo: "TRASLADO A OTRA AGENCIA",
                vesAentDescriptiveCode: "0156"
            }
        },
        {
            seller: {
                veaId: "4623",
                tveId: "3",
                tveDescripcion: "CALLE Y SALON",
                veaDni: "282",
                veaNombre: null,
                veaApellido: "ANTONIETTE NIEVAS",
                veaCelular: null,
                veaEmail: null,
                veaObservaciones: null,
                veaSexo: null,
                veaIdentificationType: null
            },
            structure: {
                vesId: "4840",
                veaId: "4623",
                entId: "55",
                vesLimiteCredito: 0,
                vesAcumuladoActivacion: null,
                vesFechaDesde: [
                    2003,
                    7,
                    1,
                    0,
                    0
                ],
                vesFechaHasta: [
                    3999,
                    1,
                    20,
                    0,
                    0
                ],
                vesMotivo: "RENUNCIA",
                vesAentDescriptiveCode: "055"
            }
        },
        {
            seller: {
                veaId: "4625",
                tveId: "3",
                tveDescripcion: "CALLE Y SALON",
                veaDni: "199",
                veaNombre: "EMANUEL",
                veaApellido: "ARNAUDIN",
                veaCelular: null,
                veaEmail: null,
                veaObservaciones: null,
                veaSexo: null,
                veaIdentificationType: null
            },
            structure: {
                vesId: "4841",
                veaId: "4625",
                entId: "55",
                vesLimiteCredito: 0,
                vesAcumuladoActivacion: null,
                vesFechaDesde: [
                    2003,
                    7,
                    1,
                    0,
                    0
                ],
                vesFechaHasta: [
                    3999,
                    1,
                    20,
                    0,
                    0
                ],
                vesMotivo: "RENUNCIA",
                vesAentDescriptiveCode: "056"
            }
        },
        {
            seller: {
                veaId: "4627",
                tveId: "3",
                tveDescripcion: "CALLE Y SALON",
                veaDni: "1154",
                veaNombre: "ESTEBAN",
                veaApellido: "BAGNOLI",
                veaCelular: null,
                veaEmail: null,
                veaObservaciones: null,
                veaSexo: null,
                veaIdentificationType: null
            },
            structure: {
                vesId: "4842",
                veaId: "4627",
                entId: "55",
                vesLimiteCredito: 1000000,
                vesAcumuladoActivacion: 16608,
                vesFechaDesde: [
                    2003,
                    7,
                    1,
                    0,
                    0
                ],
                vesFechaHasta: [
                    3999,
                    1,
                    20,
                    0,
                    0
                ],
                vesMotivo: "RENUNCIA",
                vesAentDescriptiveCode: "058"
            }
        },
        {
            seller: {
                veaId: "4628",
                tveId: "3",
                tveDescripcion: "CALLE Y SALON",
                veaDni: "103",
                veaNombre: "JORGE",
                veaApellido: "BANDERA",
                veaCelular: null,
                veaEmail: null,
                veaObservaciones: null,
                veaSexo: null,
                veaIdentificationType: null
            },
            structure: {
                vesId: "4843",
                veaId: "4628",
                entId: "55",
                vesLimiteCredito: 10,
                vesAcumuladoActivacion: 26383.04,
                vesFechaDesde: [
                    2003,
                    7,
                    1,
                    0,
                    0
                ],
                vesFechaHasta: [
                    3999,
                    1,
                    20,
                    0,
                    0
                ],
                vesMotivo: null,
                vesAentDescriptiveCode: "12D"
            }
        },
        {
            seller: {
                veaId: "4630",
                tveId: "3",
                tveDescripcion: "CALLE Y SALON",
                veaDni: "35089901",
                veaNombre: "JUAN JOSE",
                veaApellido: "BORASSI",
                veaCelular: null,
                veaEmail: null,
                veaObservaciones: null,
                veaSexo: null,
                veaIdentificationType: null
            },
            structure: {
                vesId: "4844",
                veaId: "4630",
                entId: "55",
                vesLimiteCredito: 10,
                vesAcumuladoActivacion: 0,
                vesFechaDesde: [
                    2003,
                    7,
                    1,
                    0,
                    0
                ],
                vesFechaHasta: [
                    3999,
                    1,
                    20,
                    0,
                    0
                ],
                vesMotivo: null,
                vesAentDescriptiveCode: "156"
            }
        },
        {
            seller: {
                veaId: "4632",
                tveId: "3",
                tveDescripcion: "CALLE Y SALON",
                veaDni: "302",
                veaNombre: "PEDRO",
                veaApellido: "BRUNET",
                veaCelular: null,
                veaEmail: null,
                veaObservaciones: null,
                veaSexo: null,
                veaIdentificationType: null
            },
            structure: {
                vesId: "4845",
                veaId: "4632",
                entId: "55",
                vesLimiteCredito: 10,
                vesAcumuladoActivacion: null,
                vesFechaDesde: [
                    2003,
                    7,
                    1,
                    0,
                    0
                ],
                vesFechaHasta: [
                    3999,
                    1,
                    20,
                    0,
                    0
                ],
                vesMotivo: "TRASLADO A OTRA AGENCIA",
                vesAentDescriptiveCode: "23456"
            }
        },
        {
            seller: {
                veaId: "4633",
                tveId: "3",
                tveDescripcion: "CALLE Y SALON",
                veaDni: "50",
                veaNombre: "JORGE",
                veaApellido: "BRUNNER",
                veaCelular: null,
                veaEmail: null,
                veaObservaciones: null,
                veaSexo: null,
                veaIdentificationType: null
            },
            structure: {
                vesId: "4846",
                veaId: "4633",
                entId: "55",
                vesLimiteCredito: 100,
                vesAcumuladoActivacion: null,
                vesFechaDesde: [
                    2003,
                    7,
                    1,
                    0,
                    0
                ],
                vesFechaHasta: [
                    3999,
                    1,
                    20,
                    0,
                    0
                ],
                vesMotivo: "TRASLADO A OTRA AGENCIA",
                vesAentDescriptiveCode: "4062"
            }
        },
        {
            seller: {
                veaId: "4634",
                tveId: "3",
                tveDescripcion: "CALLE Y SALON",
                veaDni: "43",
                veaNombre: "ANALIA",
                veaApellido: "CALABRESE",
                veaCelular: null,
                veaEmail: null,
                veaObservaciones: null,
                veaSexo: null,
                veaIdentificationType: null
            },
            structure: {
                vesId: "4847",
                veaId: "4634",
                entId: "55",
                vesLimiteCredito: 101,
                vesAcumuladoActivacion: 13476.04,
                vesFechaDesde: [
                    2003,
                    7,
                    1,
                    0,
                    0
                ],
                vesFechaHasta: [
                    3999,
                    1,
                    20,
                    0,
                    0
                ],
                vesMotivo: null,
                vesAentDescriptiveCode: "4063"
            }
        },
        {
            seller: {
                veaId: "4635",
                tveId: "3",
                tveDescripcion: "CALLE Y SALON",
                veaDni: "1884",
                veaNombre: "FERNANDO",
                veaApellido: "CANDAL",
                veaCelular: null,
                veaEmail: null,
                veaObservaciones: null,
                veaSexo: null,
                veaIdentificationType: null
            },
            structure: {
                vesId: "4848",
                veaId: "4635",
                entId: "55",
                vesLimiteCredito: 10,
                vesAcumuladoActivacion: 0,
                vesFechaDesde: [
                    2003,
                    7,
                    1,
                    0,
                    0
                ],
                vesFechaHasta: [
                    3999,
                    1,
                    20,
                    0,
                    0
                ],
                vesMotivo: null,
                vesAentDescriptiveCode: "055"
            }
        },
        {
            seller: {
                veaId: "4627",
                tveId: "3",
                tveDescripcion: "CALLE Y SALON",
                veaDni: "1154",
                veaNombre: "ESTEBAN",
                veaApellido: "BAGNOLI",
                veaCelular: null,
                veaEmail: null,
                veaObservaciones: null,
                veaSexo: null,
                veaIdentificationType: null
            },
            structure: {
                vesId: "55236",
                veaId: "4627",
                entId: "55",
                vesLimiteCredito: 342,
                vesAcumuladoActivacion: null,
                vesFechaDesde: [
                    2019,
                    6,
                    26,
                    0,
                    0
                ],
                vesFechaHasta: [
                    3999,
                    1,
                    20,
                    0,
                    0
                ],
                vesMotivo: null,
                vesAentDescriptiveCode: null
            }
        }
    ]
}