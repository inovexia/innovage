import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

import GSIcon from '~/components/gs-icon'

const AddReview = ({
  title = `ADD REVIEW`,
  shopID,
  productID,
  productHandle,
  productTitle,
  productImg,
  setResColor,
  setRes,
  updateResMsg,
}) => {
  const [addReview, doAddReview] = useState(false),
    [author, updateAuthor] = useState(''),
    [email, updateEmail] = useState(''),
    [productRating, updateProductRating] = useState(0),
    [reviewTitle, updateReviewTitle] = useState(''),
    [reviewBody, updateReviewBody] = useState(''),
    closeReview = () => {
      reviewFormReset()
      doAddReview(false)
    },
    mouseOverRating = currentIndex => {
      const ratingBtn = document.querySelectorAll(
        '.rating-field .starts .rating-btn'
      )

      ratingBtn.forEach((button, index) => {
        index <= currentIndex && button.classList.add('hovered')
      })
    },
    mouseLeaveRating = currentIndex => {
      const ratingBtn = document.querySelectorAll(
        '.rating-field .starts .rating-btn'
      )
      if (productRating === 0) {
        ratingBtn.forEach((button, index) => {
          index <= currentIndex && button.classList.remove('hovered')
        })
      } else {
        ratingBtn.forEach(button => {
          button.classList.remove('hovered')
        })
      }
    },
    changeRating = currentIndex => {
      const ratingBtn = document.querySelectorAll(
        '.rating-field .starts .rating-btn'
      )

      ratingBtn.forEach(button => {
        button.classList.remove('active')
        button.classList.remove('hovered')
      })

      ratingBtn.forEach((button, index) => {
        index <= currentIndex && button.classList.add('active')
      })
      updateProductRating(currentIndex + 1)
    },
    reviewFormReset = () => {
      updateAuthor('')
      updateEmail('')
      updateReviewTitle('')
      updateReviewBody('')
      updateProductRating(0)
      document.querySelector('.review-form').reset()
    },
    sendReview = async (URL, data) => {
      return await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-requested-with': 'XMLHttpRequest',
        },
        body: JSON.stringify(data),
      })
        .then(response => {
          if (response.status === 200) {
            response.json().then(responseJson => {
              const ratingBtn = document.querySelectorAll(
                '.rating-field .starts .rating-btn'
              )

              setResColor('demo-primary')
              setRes(true)
              updateResMsg(
                <div>
                  {responseJson.message}
                  <strong>&nbsp;successfully</strong>.
                </div>
              )
              ratingBtn.forEach(button => {
                button.classList.remove('active')
                button.classList.remove('hovered')
              })
              reviewFormReset()
            })
          } else if (response.status === 422) {
            response.json().then(responseJson => {
              setRes(true)
              setResColor('danger')
              updateResMsg(
                <>
                  <strong> {responseJson.message}</strong>{' '}
                  <ul className="mb-0 pl-4">
                    {' '}
                    {Object.keys(responseJson.errors).map(error => (
                      <li key={error}>{responseJson.errors[error][0]}</li>
                    ))}{' '}
                  </ul>
                </>
              )
            })
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    submitReview = () => {
      if (shopID) {
        const data = {
          author: author,
          email: email,
          rating: productRating,
          title: reviewTitle,
          body: reviewBody,
          shopify_id: shopID,
          product_id: productID,
          product_handle: productHandle,
          product_title: productTitle,
          product_image: productImg,
        }
        sendReview(`//reviews.hulkapps.com/api/shop/${shopID}/reviews`, data)
      } else {
        const data = {
          author: author,
          email: email,
          rating: productRating,
          title: reviewTitle,
          body: reviewBody,
          shopify_id: shopID,
          product_id: productID,
          product_handle: productHandle,
          product_title: productTitle,
          product_image: productImg,
        }
      }
    }

  return (
    <React.Fragment>
      <button className={'btn-add-review'} onClick={() => doAddReview(true)}>
        {title}
      </button>
      <Modal
        className={'add-review-modal'}
        show={addReview}
        onHide={closeReview}
        centered={true}
      >
        <Modal.Body>
          <button
            type={'button'}
            className={'btn-dismiss'}
            aria-label={'Close Modal'}
            onClick={closeReview}
          />
          <div className={'modal-wrapper'}>
            <h4 className={'heading'}>{title}</h4>
            <form
              className={'review-form'}
              onSubmit={event => {
                event.preventDefault()
                submitReview()
              }}
            >
              <div className={'form-field'}>
                <input
                  type={'text'}
                  className={'field'}
                  name={'author'}
                  aria-label={'Your name'}
                  placeholder={'Your name'}
                  required={true}
                  defaultValue={author}
                  onChange={({ target: { value } }) => updateAuthor(value)}
                />
              </div>
              <div className={'form-field'}>
                <input
                  type={'email'}
                  className={'field'}
                  name={'email'}
                  aria-label={'Your Email'}
                  placeholder={'Your Email'}
                  required={true}
                  defaultValue={email}
                  onChange={({ target: { value } }) => updateEmail(value)}
                />
              </div>
              <div className={'rating-field'}>
                <label className={'label'} htmlFor={'rating'}>
                  {'Rating'}
                </label>
                <div className={'starts'}>
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      type={'button'}
                      className={`rating-btn${
                        i <= productRating - 1 ? ' active' : ''
                      }`}
                      onMouseOver={() => mouseOverRating(i)}
                      onFocus={() => mouseOverRating(i)}
                      onMouseLeave={() => mouseLeaveRating(i)}
                      onBlur={() => mouseLeaveRating(i)}
                      onClick={() => changeRating(i)}
                    >
                      <GSIcon icon={'gs-star'} />
                    </button>
                  ))}
                </div>
              </div>
              <div className={'form-field'}>
                <input
                  type={'text'}
                  className={'field'}
                  name={'title'}
                  aria-label={'Review Title'}
                  placeholder={'Review Title'}
                  required={true}
                  defaultValue={reviewTitle}
                  onChange={({ target: { value } }) => updateReviewTitle(value)}
                />
              </div>
              <div className={'form-field'}>
                <textarea
                  className={'field'}
                  name={'body'}
                  placeholder={'Your Review'}
                  rows={5}
                  aria-label={'Your Review'}
                  required={true}
                  defaultValue={reviewBody}
                  onChange={({ target: { value } }) => updateReviewBody(value)}
                />
              </div>
              <div className={'form-field'}>
                <button
                  type={'submit'}
                  className={'btn btn-demo-primary w-100 text-uppercase'}
                  aria-label={'Submit Review'}
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}

export default AddReview
