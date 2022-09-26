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
      let result = []
      
      for(let i=0;i<=university.length;i++){
           if(typeof(university[i]) === 'undefined') break;
           if (university[i].name.toLowerCase().includes(searchWord.toLowerCase()))
           {
            result.push(university[i])
           } 
      }
      
      return result
    }
    

  return (
    <div className='container'>
      
      {loading ? 'Loading' : null}
      {error ? 'Something went wrong' : null}

      <h1>Search</h1>
      <input 
         type='text' 
         placeholder='Type here' 
         onChange={e => {
           setSearchWord(e.target.value)
           }} />
      <button onClick={ () =>  setResults(searchFunction(university, searchWord))} > Search</button>
      

           <div className='resultsContainer' > 
            {results.map (function (result, index) {
              return (
                <div key={index} className='universityConainter' >
                  <p> Name: {result.name} </p>
                  <div><p> Web page:</p>
                   <a href={result.web_pages[0]} target='blank' >{result.web_pages[0]}</a><br/>
                   <a href={result.web_pages[1]} target='blank' >{result.web_pages[1]}</a>
                   </div>
                  <p> Domain: @{result.domains} </p>
                  <p> Country: {result.country} </p>
                  <p> Country code: {result.alpha_two_code} </p>
                </div>
              )
            })}
      </div> 
    </div>
  )
}

export default UniversityList