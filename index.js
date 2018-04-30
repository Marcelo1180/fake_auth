const Debug = require('debug')
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const axios = require('axios')


const app = express()
const secret = 'clavesecreta_client'
// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const createToken = (item) => {
  const infoToken = {
    roles: item.roles,
    status: true
  }
  return jwt.sign({ infoToken }, secret, { expiresIn: 18555 })
}

let GRUPOS = []
let LABELS = []

app.get('/status', (req, res) => res.json({active: true, env: process.env.NODE_ENV}))
app.post('/signin', (req, res) => {
  let generarToken = false
  let item = {}
  if (req.body.user == 'user0') {
    item = {
      entity: 'CODE/USER/0',
      grupos: [
        '555b00000000000000000003',
        '555b00000000000000000004',
        '555b00000000000000000005',
        '555b00000000000000000006',
        '555b00000000000000000007',
        '555b00000000000000000008',
        '555b00000000000000000009',
      ],
      flujos: []
    }
    generarToken = true
  }
  if (req.body.user == 'user1') {
    item = {
      entity: 'CODE/EMPRESA/0',
      grupos: [],
      flujos: [
        '777a00000000000000000001',
      ]
    }
    generarToken = true
  }
  if (req.body.user == 'user2') {
    item = {
      entity: 'CODE/EMPRESA/0',
      grupos: [
        '555b00000000000000000003',
      ],
      flujos: [
        '777a00000000000000000002',
        '777a00000000000000000003',
      ]
    }
    generarToken = true
  }
  if (req.body.user == 'user2t') {
    item = {
      entity: 'CODE/USER2/AGETIC/tecnico',
      grupos: [
        '555b00000000000000000003',
      ],
      flujos: [
        '777a00000000000000000002',
        '777a00000000000000000003',
      ]
    }
    generarToken = true
  }
  if (req.body.user == 'user3') {
    item = {
      entity: 'CODE/EMPRESA/0',
      grupos: [],
      flujos: [
        '777a00000000000000000004',
        '777a00000000000000000005',
      ]
    }
    generarToken = true
  }
  if (req.body.user == 'tecnico') {
    item = {
      entity: 'CODE/USER/AGETIC/tecnico',
      grupos: [
        '555b00000000000000000003',
      ],
      flujos: []
    }
    generarToken = true
  }
  if (req.body.user == 'jefe') {
    item = {
      entity: 'CODE/USER/AGETIC/jefe',
      grupos: [
        '555b00000000000000000004',
      ],
      flujos: []
    }
    generarToken = true
  }
  if (req.body.user == 'director') {
    item = {
      entity: 'CODE/USER/AGETIC/director',
      grupos: [
        '555b00000000000000000005',
      ],
      flujos: []
    }
    generarToken = true
  }
  if (req.body.user == 'viceministro') {
    item = {
      entity: 'CODE/USER/AGETIC/viceministro',
      grupos: [
        '555b00000000000000000006',
      ],
      flujos: []
    }
    generarToken = true
  }
  // let idUser = Number(req.body.user.split('user')[1])
  // if (idUser == 0) {
  //   item = {
  //     entity: `Y/abc/${idUser}/2018`,
  //     grupos: GRUPOS,
  //     labels: LABELS
  //   }
  //   generarToken = true
  // }
  // else if(idUser >= 1 && idUser <= GRUPOS.length) {
  //   item = {
  //     entity: `Y/abc/${idUser}/2018`,
  //     grupos: GRUPOS[idUser-1],
  //     labels: LABELS[idUser-1]
  //   }
  //   generarToken = true
  // }
  if (generarToken) {
    const token = createToken(item)
    res.status(200).json({
      finalizado: true,
      message: 'Autentificacion satisfactoria',
      token,
      item 
    })
  } else {
    res.status(400).json({
      finalizado: false,
      message: 'Usuario no autorizado',
    })
  }
})
// async function allGrupos (req, res, next) {
//   GRUPOS = []
//   LABELS = []
//   try {
//     const response = await axios.get('http://localhost:3000/external/auth/api/v1/grupos')
//     const items = response.data.datos.listado
//     items.forEach(function(item) {
//       GRUPOS.push(item._id)
//       LABELS.push(`${item.titulo} - ${item.institucion.nombre}`)
//       // GRUPOS.push({
//       //   grupo: item._id
//       // })
//       // console.log(item._id);
//       // console.log(item.titulo);
//       // console.log(item.institucion._id);
//       // console.log(item.institucion.nombre);
//     })
//     next()
//   } catch (error) {
//     return console.error(error);
//   }
// }
app.get('/sync/bpm/grupos', allGrupos, async (req, res) => {
  res.status(200).json({
    finalizado: true,
    message: 'Operacion satisfactoria',
  })
})

const PORT = process.env.PORT || 3001;
const debug = new Debug('bpm:index')

app.listen(PORT, () => {
  debug(`Servidor ejecutando en el puerto ${PORT}`)
})
