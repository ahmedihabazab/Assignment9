function globalErrMiddleware(err, req, res, next) {
  res
    .status(err.cause?.statusCode || 400)
    .json({ errMsg: err.message, err, extra: err.cause });
}

export default globalErrMiddleware;
