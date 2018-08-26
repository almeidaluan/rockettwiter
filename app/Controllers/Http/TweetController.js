'use strict'
const Tweet = use('App/models/Tweet')
/**
 * Resourceful controller for interacting with tweets
 */
class TweetController {
  /**
   * Show a list of all tweets.
   * GET tweets
   */
  async index ({ request, response, view }) {

    //const Tweets = await Tweet.all()
    const tweets = await Tweet.query.with('users').fetch() // Lista os dados do usuario referenciado por ID
    return tweets
  }

  /**
   * Create/save a new tweet.
   * POST tweets
   */
  async store ({ request,auth}) {

    const data = request.only(['contet'])

    const tweet = Tweet.create({user_id:auth.user.id, ...data})

    return tweet

  }

  /**
   * Display a single tweet.
   * GET tweets/:id
   */
  async show ({ params, request, response, view }) {

    const tweet = Tweet.findOrFail(params.id)

    return tweet
  }

  /**
   * Update tweet details.
   * PUT or PATCH tweets/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a tweet with id.
   * DELETE tweets/:id
   */
  async destroy ({ params, auth,request, response }) {

    const tweet = Tweet.findOrFail(params.id)

    if(Tweet.user_id === auth.user.id){
      await tweet.delete()
    }else{
      return response.status(401)
    }

  }
}

module.exports = TweetController
