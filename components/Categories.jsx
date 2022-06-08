import React , {useState,useEffect} from 'react'
import { getCategories } from '../services'
import Link from 'next/link'

const Categories = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {

    getCategories().then((result) => setCategories(result))
    
  }, [])
  return (
    <div className="mb-8 rounded-lg bg-white p-8 shadow-lg pb-12">
      <h3 className="mb-8 border-b p-4 text-xl font-semibold">
        Categories
      </h3>
      {categories.map((category) =>(
        <Link key={category.slug} href={`/category/${category.slug}`}>
          <span className="block mb-3 pb-3 cursor-pointer">{category.name}</span>
        </Link>
      ) )}
      </div>
  )
}

export default Categories