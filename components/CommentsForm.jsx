import React, { useState, useEffect, useRef } from 'react'
import { submitComment } from '../services'

const CommentsForm = ({slug}) => {
  const [error, setError] = useState(false)
  const [lStorage, setLStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const commentEl = useRef()
  const nameEl = useRef()
  const emailEl = useRef()
  const storeDataEl = useRef()

  useEffect(()=> {
    nameEl.current.value = window.localStorage.getItem("name")
    emailEl.current.value = window.localStorage.getItem("email")
  },[])

  const handleCommentSubmission = () => {
    const {value : comment} = commentEl.current
    const {value : name} = nameEl.current
    const {value : email} = emailEl.current
    const {checked : storeData} = storeDataEl.current
    if(!comment || !name || !email){
      setError(true)
      return;
    }
    const commentObj = {name,email,comment,slug}
    if(storeData){
      window.localStorage.setItem("name",name)
      window.localStorage.setItem("email",email)
    }else{
      window.localStorage.removeItem("name")
      window.localStorage.removeItem("email")
    }
    submitComment(commentObj).then((res) => {
      // console.log(res)
      setShowSuccessMessage(true)
      setTimeout(() => {
        setShowSuccessMessage(false)
      },3000)
    })

  }
  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">Add Comment</h3>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <textarea
          ref={commentEl}
          className="w-full rounded-lg bg-gray-100 p-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200 "
          name="comment"
          placeholder="Comment"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <input
          ref={nameEl}
          type="text"
          className="w-full rounded-lg bg-gray-100 py-2 px-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200 "
          name="name"
          placeholder="Name"
        />
        <input
          ref={emailEl}
          type='email'
          className="w-full rounded-lg bg-gray-100 py-2 px-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200 "
          name="email"
          placeholder="Email"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <div>
            <input ref={storeDataEl} type="checkbox" id="storeData" name='dataStore'/>
            <label className="ml-2 text-gray-500 cursor-pointer" htmlFor='storeData' >Save my e-mail and name for the next time I comment.</label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fields are required</p>}
      <div className="mt-8">
        <button type="button"
         onClick={handleCommentSubmission}
         className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
         >Post Comment</button>
         {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment Submitted for review</span>}
      </div>
    </div>
  )
}

export default CommentsForm
