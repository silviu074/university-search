import axios from 'axios'
import React, { useState, useEffect} from 'react'


const UniversityList = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [university, setUniversity] = useState()
    const [searchWord, setSearchWord] = useState('')

    useEffect( () => {
      axios.get('https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json')
        .then(response => {
            setLoading(false)
            setUniversity(response.data)
            setError(false)
        })
        .catch(err => {
            setLoading(false)
            setUniversity({})
            setError(true)
            console.log(err)
        })
    }, [])
    

    function searchFunction(x) {
      let results = []
      for(let i=0;i<=university.length;i++){
           if(typeof(university[i]) === 'undefined') break;
           if (university[i].country.toLowerCase().includes(x.toLowerCase())){
            console.log(university[i].country)
            results = university[i]
           }
      }
      return results
    }
   
  

  return (
    <div>
      
      {loading ? 'Loading' : null}
        {error ? 'Something went wrong' : null}
      <h1>Search</h1>
      <input type='text' placeholder='search' 
      onChange={e => {
        setSearchWord(e.target.value)
        }} />
        {/* <button onClick={searchFunction(searchWord)} > Search</button> */}
      
        
    </div>
  )
}

export default UniversityList