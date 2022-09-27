import axios from 'axios'
import React, { useState, useEffect} from 'react'




const UniversityList = () => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [university, setUniversity] = useState()
    const [searchWord, setSearchWord] = useState('')
    const [nameSearchResults, setNameSearchResults] = useState([])
    const [email, setEmail] = useState('')
    const [emailResults, setEmailResults] = useState([])
    const [country, setCountry] = useState('')
    const [countrySearchResults, setCountrySearchResults] = useState([])



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
    
     function nameSearchFunction(university, searchWord) {
      let result = []
      if(searchWord === '') return nameSearchResults
      
      for(let i=0;i<=university.length;i++){
           if(typeof(university[i]) === 'undefined') break;
           if (university[i].name.toLowerCase().includes(searchWord.toLowerCase()))
           {
            result.push(university[i])
           } 
      }
      
      return result
    }

    function validateFunction(university, email) {
      let result=[]
      let address = email;
      let universityDomain = address.substring(address.lastIndexOf("@") +1);
      for(let i=0;i<=university.length;i++){
        if(typeof(university[i]) === 'undefined') break;
        if (universityDomain.toLowerCase() ===
         (university[i].domains[0].toLowerCase() || university[i].domains[1].toLowerCase() ))
        {
         result.push(university[i])
        } 
   }
      return result
    }


    function countrySearchFunction(university, country) {
      let result = []
      if(country === '') return nameSearchResults
      
      for(let i=0;i<=university.length;i++){
           if(typeof(university[i]) === 'undefined') break;
           if (university[i].country.toLowerCase().includes(country.toLowerCase()))
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
      <h1>World universities and domains </h1>
      <p>The purpose of this project is to extract data from
      <a href="https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json" >
        this API
      </a> and to display it in a simplified manner.  </p>
      <p>Using the following buttons you can generate a list of universities by searching:</p>

      <h2>University name</h2>
      <input 
         type='text' 
         placeholder='Enter university name' 
         onChange={e => {
           setSearchWord(e.target.value)
           }} />
      <button onClick={ () =>  setNameSearchResults(nameSearchFunction(university, searchWord))} > Search</button>
      <button onClick={ () =>  setNameSearchResults([])} > Clear</button>
      
      

      <h2>Country</h2>
      <input 
         type='text' 
         placeholder='Enter country' 
         onChange={y => {
           setCountry(y.target.value)
           }} />
      <button onClick={ () =>  setCountrySearchResults(countrySearchFunction(university, country))} > Search</button>
      <button onClick={ () =>  setCountrySearchResults([])} > Clear</button>

      <p>If you want to check a student e-mail is valid you can type the address down below.
        The following button will generate details about the university from which the entered e-mail comes from.
      </p>

      <h2>E-mail validation</h2>
      <input 
         type='text' 
         placeholder='Enter e-mail' 
         onChange={x => {
           setEmail(x.target.value)
           }} />
      <button onClick={ () =>  setEmailResults(validateFunction(university, email))} > Validate</button>
      <button onClick={ () =>  setEmailResults([])} > Clear</button>

      <div className='resultsContainer' > 
            { 
            emailResults.map (function (result, index) {
              return (
                
                <div key={index} className='universityConainter' >
                  <p> Name: {result.name} </p>
                  <div>
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

      <div className='resultsContainer' > 
            {
            countrySearchResults.map (function (result, index) {
              return (
                <div key={index} className='universityConainter' >
                  
                  <p> Name: {result.name} </p>
                  <div>
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

           
      
           <div className='resultsContainer' > 
            {
            nameSearchResults.map (function (result, index) {
              return (
                
                <div key={index} className='universityConainter' >
                  <p> Name: {result.name} </p>
                  <div>
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