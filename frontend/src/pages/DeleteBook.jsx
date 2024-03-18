import React,{useState} from 'react'
import Backbutton from '../Components/Backbutton'
import Spinner from '../Components/Spinner'
import axios from 'axios'
import { useNavigate , useParams } from 'react-router-dom'


const deleteBook = () => {
  const [loading,setLoading]=useState(false)
  const{id}=useParams();
  const navigate=useNavigate()
  const handleDeleteBook=()=>{
    setLoading(true)
    axios.delete(`https://book-store-backend-lovat-gamma.vercel.app/books/${id}`)
    .then(()=>{
      setLoading(false);
      navigate("/")
    }).catch((error)=>{
      setLoading(false);
      alert(" Please Check Console, there is some error")
      // console.log(error)
    })
  }
  return (
    <div className='p-4'>
    <Backbutton/>
    <h1 className="text-3xl my-4">Delete Book</h1>
    {loading?<Spinner/>: ""}
    <div className="flex flex-col items-center border-2 border-sky-500 rounded-xl w-[600px] p-8 mx-auto">
    <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
    <button className="p-4 bg-red-600 text-white m-8 w-full" onClick={handleDeleteBook}> Yes , Delete It</button>
    </div>
    </div>
  )
}

export default deleteBook
