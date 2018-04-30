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

app.get('/status', (req, res) => res.json({active: true, env: process.env.NODE_ENV}))
app.post('/signin', (req, res) => {
  let generarToken = false
  let item = {}
  //Usuario con todos los privilegios posibles
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
  // Usuario de la empresa0 que solo puede acceder al flujo ...001
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
  // Usuario de la empresa0 que solo puede acceder al flujo ...002 y ...003
  // ademas es del grupo tecnico pero esta con el ID de empresa
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
  // Usuario de la empresa0 que solo puede acceder al flujo ...002 y ...003
  // ademas es del grupo tecnico pero esta con el ID de usuario 
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
  // Usuario de la empresa0 que solo puede acceder al flujo ...004 y ...005
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
  // Usuario de la institucion AGETIC que accede como tecnico
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
  // Usuario de la institucion AGETIC que accede como jefe
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
  // Usuario de la institucion AGETIC que accede como director
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
  // Usuario de la institucion AGETIC que accede como viceministro
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

const PORT = process.env.PORT || 3001;
const debug = new Debug('bpm:index')

app.listen(PORT, () => {
  debug(`Servidor ejecutando en el puerto ${PORT}`)
})
