import React, { useState, useEffect } from 'react';
import CountryDetail from './components/CountryDetail';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [darkMode, setDarkMode] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null); // Initialize as null

  const handleCountryDetail = (country) => {
    setSelectedCountry(country);
  };

  const handleCloseDetail = () => {
    setSelectedCountry(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v2/all');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRegionFilter = (region) => {
    setSelectedRegion(region);
    setShowDropDown(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const filteredCountries = countries.filter((country) => {
    const regionFilter = selectedRegion === 'All' || country.region === selectedRegion;
    const searchFilter = country.name.toLowerCase().includes(searchTerm.toLowerCase());

    return regionFilter && searchFilter;
  });

  return (
    <div className={` ${darkMode ? 'dark' : ''}`}>
      <div className='container1'>
        <h1>Davlatlar haqida ma'lumotlar</h1>
        <button className="toggle" onClick={handleToggleDarkMode}>
          <i className={`far fa-moon moon ${darkMode ? 'fas' : ''}`}></i>
          Tunggi rejim
        </button>
      </div>

      <div className="container1">
        <div className="form-control ">
          <input
            type="text"
            placeholder="Davlatni izlang..."
            className="search"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <i className="fas fa-search search"></i>
        </div>

        <div className="dropDownCon">
          <div className="dropDown" onClick={() => setShowDropDown(!showDropDown)}>
            <p id="saralash">{`${handleRegionFilter ? selectedRegion : 'Saralash'}`}</p>
            <button>
              <i className={`fas fa-chevron-down ${showDropDown ? 'rotate' : ''}`}></i>
            </button>
          </div>
          <div className={`drop ${!showDropDown ? 'showDropDown' : ''}`}>
            <p className="region" onClick={() => handleRegionFilter('All')}>
              All
            </p>
            <p className="region" onClick={() => handleRegionFilter('Africa')}>
              Africa
            </p>
            <p className="region" onClick={() => handleRegionFilter('Asia')}>
              Asia
            </p>
            <p className="region" onClick={() => handleRegionFilter('Europe')}>
              Europe
            </p>
            <p className="region" onClick={() => handleRegionFilter('Oceania')}>
              Oceania
            </p>
          </div>
        </div>
      </div>

      <div className="countries">
        {filteredCountries.map((country) => (
          <div key={country.alpha2Code} onClick={() => handleCountryDetail(country)}  className="country">
            <div className="country-img">
              <img className='aspect-[5/3] object-fit-cover object-cover' src={country.flags['svg']} alt="" />
            </div>
            <div className="country-info">
              <h5 className="countryName">{country.name}</h5>
              <p className="regionName">
                <strong>Region:</strong> {country.region}
              </p>
              <p>
                <strong>Population:</strong> {country.population}
              </p>
              <p>
                <strong>Capital:</strong> {country.capital}
              </p>
            </div>
          </div>
        ))}
      </div>
      {selectedCountry && (
        <CountryDetail
          handleCountryDetail={handleCountryDetail}
          selectedCountry={selectedCountry}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};

export default App;
