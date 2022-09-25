import axios from 'axios'
import React, { useState, useEffect} from 'react'


const UniversityList = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [university, setUniversity] = useState()
    const [searchWord, setSearchWord] = useState('')
    const [results, setResults] = useState([])

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
    
     function searchFunction(university, searchWord) {
      let results = []
      for(let i=0;i<=university.length;i++){
           if(typeof(university[i]) === 'undefined') break;
           if (university[i].name.toLowerCase().includes(searchWord.toLowerCase()))
           {
            // console.log(university[i].name)
            results[i] = university[i]
           } else results[i]=''
      }
      results= results.filter(Boolean)
      console.log(results)
      return results
    }
    

  return (
    <div>
      
      {loading ? 'Loading' : null}
      {error ? 'Something went wrong' : null}
      <h1>Search</h1>
      <input 
         type='text' 
         placeholder='Type here' 
         onChange={e => {
           setSearchWord(e.target.value)
           }} />
      <button onClick={ () => setResults(searchFunction(university, searchWord))} > Search</button>
       <div>
         {results.map( ({results}, index) =>
         <div key={index}><li>{results} {index}</li></div>)} 
       </div>
    </div>
  )
}

export default UniversityList