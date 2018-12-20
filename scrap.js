//Reeds: ==============

const editPost = (req, res, next) => {
  const postId = Number(req.params.id);
  let queryString = 'UPDATE posts SET ';

  if (req.body.user_id && req.body.body) {
    queryString += `user_id = ${req.body.user_id}, body = '${req.body.body}' `;
  } else if (req.body.user_id) {
    queryString += `user_id = ${req.body.user_id} `;
  } else {
    queryString += `body = '${req.body.body}' `;
  }

  queryString += `WHERE id = ${postId}`;

  console.log(queryString);

  db.none(queryString)
  .then(() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'post successfully updated'
    })
  }).catch(err => {
    console.log(err);
    next();
  })
}
//================Reed: ==========
const allLikesForPost = (req, res, next) => {
  const postId = Number(req.params.id);
  db.any('SELECT * FROM likes WHERE post_id = ${id}', {
    id: postId
  })
  .then(likes => {
    res.status(200).json({
      status: 'success',
      data: likes,
      message: 'retrieved all likes for post'
    });
  }).catch(err => {
    console.log(err);
    next();
  })
}

//========================
