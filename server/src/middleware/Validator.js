import {body} from 'express-validator'

export default class Validator {
  static login = [
    body('username')
      .exists({checkFalsy: true})
        .withMessage('Username is required.')
        .bail()
      .isString()
        .withMessage('Invalid data type submitted for Username.')
        .bail()
      .trim()
      .escape(),
    body('password')
      .exists({checkFalsy: true})
        .withMessage('Password is required.')
        .bail()
      .isString()
        .withMessage('Invalid data type submitted for Password.')
        .bail()
      .trim()
      .escape()
  ]
}