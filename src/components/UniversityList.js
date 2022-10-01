import axios from 'axios'
import React, { useState, useEffect} from 'react'




const UniversityList = () => {

    // const for getting data from API

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [university, setUniversity] = useState()

    // searchWord stores the input value from the Name Search section
    // nameSearchResults stores the object/array of objects found in the search

    const [searchWord, setSearchWord] = useState('')
    const [nameSearchResults, setNameSearchResults] = useState([])

    // country stores the input value from the Country Search section
    // countrySearchResults stores the object/array of objects found in the search   

    const [country, setCountry] = useState('')
    const [countrySearchResults, setCountrySearchResults] = useState([])    

     // email stores the input value from the E-mail section
     // emailResults stores the object/array of objects found in the search

    const [email, setEmail] = useState('')
    const [emailResults, setEmailResults] = useState([])



    // Storing the json from API to const {university}

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


    // Search by name ( API array of objects, name input value )
    
     function nameSearchFunction(university, searchWord) {
      let result = []
      for(let i=0;i<=university.length;i++){
           if(typeof(university[i]) === 'undefined') break;
           if (university[i].name.toLowerCase().includes(searchWord.toLowerCase()))
           {
            result.push(university[i])
           } 
      }
      if(result.length === 0) alert('No results found')
      return result
    }


     // Search by e-mail ( API array of objects, e-mail input value )

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
       console.log(result)
       if(result.length === 0) alert('The e-mail address is invalid')
       return result
       }


       // Search by country ( API array of objects, country input value )

    function countrySearchFunction(university, country) {
      let result = []
      if(country === '') return countrySearchResults
      for(let i=0;i<=university.length;i++){
           if(typeof(university[i]) === 'undefined') break;
           if (university[i].country.toLowerCase().includes(country.toLowerCase()))
           {
            result.push(university[i])
           } 
      }
      if(result.length === 0) alert('This country does not exist')
      return result
    }
    

  return (
    <div className='container'>
      
      {loading ? 'Loading' : null}
      {error ? 'Something went wrong' : null}
      
      <br/><h1>World Universities and Domains </h1><br/>
      <p>The purpose of this project is to display data from&nbsp; 
      <a href="https://github.com/Hipo/university-domains-list-api" >
      University Domains and Names Data List & API
      </a> in a simplified and elegant manner.  </p>
      <p>Using the buttons below, you can generate a list of universities based on name, country 
        and/or student e-mail address:</p><br/>

        {/* Name Search */}

      <h2>Name</h2>
      <div>
      <input 
         type='text' 
         placeholder='Enter university name' 
         className='input'
         onChange={e => {
           setSearchWord(e.target.value)
           }} />
      <button className='button'
       onClick={ () => 
        setNameSearchResults(nameSearchFunction(university, searchWord))} > Search</button>
      </div>
      
      {/* Country Search */}

      <h2>Country</h2>
      <div>
      <input 
         type='text' 
         placeholder='Enter country' 
         className='input'
         onChange={y => {
           setCountry(y.target.value)
           }} />
      <button className='button' 
        onClick={ () => 
        setCountrySearchResults(countrySearchFunction(university, country))} > Search
      </button>
      </div>

      {/* E-mail search */}

      <h2>Student e-mail</h2>
      <div>
      <input 
         type='text' 
         placeholder='Enter student e-mail address' 
         className='input'
         onChange={x => {
           setEmail(x.target.value)
           }} />
      <button className='button' 
        onClick={ () =>  
        setEmailResults(validateFunction(university, email))} > Search
      </button>
      </div>

      {/* Clearing any search by resetting the objects */}

      <button className='buttonClear' 
      onClick={ () =>  {setEmailResults([]) 
                        setCountrySearchResults([])
                        setNameSearchResults([])
                        }} > Clear </button>


      {/* Rendering the results for for e-mail search */}
        
      <div className='resultsContainer' > 
      
            { 
            emailResults.map (function (result, index) {
              return (
                
                <div key={index} className='universityConainter' >
                  <p>This e-mail domain belongs to:  {result.name} </p>
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

      {/* Rendering the results for for country search */}

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

           {/* Rendering the results for for name search */}
      
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