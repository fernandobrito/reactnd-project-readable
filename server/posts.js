const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: '14 Keys to a Healthy Diet',
    body: 'Awesome post about diets: http://www.berkeleywellness.com/healthy-eating/food/slideshow/14-keys-healthy-diet',
    author: 'adietguy',
    category: 'diet',
    voteScore: 6,
    deleted: false
  },
  "8xf0y6ziyjabvozdd253nds": {
    id: '8xf0y6ziyjabvozdd253nds',
    timestamp: 1467166872634,
    title: 'DAREBEE - Fitness Made Easy',
    body: 'Hey guys, check out this awesome website for exercising. www.darebee.com',
    author: 'fitnessrocks',
    category: 'exercises',
    voteScore: 16,
    deleted: false
  },
  "8xf0y6ziyjabvozdd253ndb": {
    id: '8xf0y6ziyjabvozdd253ndb',
    timestamp: 1467166872634,
    title: '50 Things to Make With Bacon : Recipes and Cooking',
    body: "Can't wait to try them all! http://www.foodnetwork.com/recipes/articles/50-things-to-make-with-bacon",
    author: 'opsreally',
    category: 'diet',
    voteScore: -9,
    deleted: false
  },

  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Headspace: Meditation and mindfulness made simple',
    body: "I've been using this meditation app and it's just awesome! www.headspace.com",
    author: 'thingone',
    category: 'meditation',
    voteScore: 20,
    deleted: false
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts.deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll
}
