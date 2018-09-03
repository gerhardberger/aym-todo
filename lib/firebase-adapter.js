const firebase = require('firebase-admin')

const config = require('../config.js')

module.exports = class FirebaseAdapter {
  static getInstance () {
    if (!FirebaseAdapter._instance) {
      throw new Error('Did not connect to firebase.')
    }
    return FirebaseAdapter._instance
  }

  static setup () {
    FirebaseAdapter._instance = firebase.initializeApp({
      credential: firebase.credential.cert(config.firebase.serviceAccount)
    })
  }
}
