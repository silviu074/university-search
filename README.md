# React University Search 

The purpose of this project is to display data from [University Domains and Names Data List & API](https://github.com/Hipo/university-domains-list-api) in a simplified and elegant manner.

## Built with

  * HTML 
  * CSS
  * Javascript
  * React
  * University Domains and Names API
  * Axios
  
## Demo

https://user-images.githubusercontent.com/44822821/192899507-c74acc3b-5659-4e89-8bd2-71a4b48a7ba0.mp4

## How does this work?

The const {university} is used to store the content of the [University Domains and Names Data List & API](https://github.com/Hipo/university-domains-list-api)

```

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [university, setUniversity] = useState()
    
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

```

Then there are 3 search functions corresponding to each button:

Search by name:

```

    // {searchWord} gets the value from the input field next to it
    // (nameSearchResults} is the object/array of objects returned by the function
    
     <button className='button'
       onClick={ () => 
        setNameSearchResults(nameSearchFunction(university, searchWord))} > Search
     </button>
      

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

```


Search by country:

```

    // {country} gets the value from the input field next to it
    // (countrySearchResults} is the object/array of objects returned by the function
    
    <button className='button' 
        onClick={ () => 
        setCountrySearchResults(countrySearchFunction(university, country))} > Search
    </button>

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

```

Search by e-mail address:

```

    // {email} gets the value from the input field next to it
    // (emailResults} is the object/array of objects returned by the function
    
    <button className='button' 
        onClick={ () =>  
        setEmailResults(validateFunction(university, email))} > Search
    </button>

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

```

And the "Clear" button resets the displayed data by changing the state of the objects created before:

```

      <button className='buttonClear' 
       onClick={ () =>  {setEmailResults([]) 
                        setCountrySearchResults([])
                        setNameSearchResults([])
                        }} > Clear </button>

```


## Credits

[University Domains and Names Data List & API](https://github.com/Hipo/university-domains-list-api)
