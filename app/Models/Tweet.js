'use strict'

const Model = use('Model')

class Tweet extends Model {

  users () {
    this.belongsTo('App/Models/User')
  }
}

module.exports = Tweet
