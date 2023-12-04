import React from 'react';

const CountryDetail = ({ handleCountryDetail, selectedCountry, onClose }) => {
  return (
    <div className='countryModal'>
      <div className="close-button" onClick={onClose}>
        <i className="fas fa-times"></i>
      </div>
      <div className="country-img">
        <img src={selectedCountry.flag} alt="" />
      </div>
      <div className="country-info">
        <h5 className="countryName">{selectedCountry.name}</h5>
        <p className="regionName">
          <strong>Region:</strong> {selectedCountry.region}
        </p>
        <p>
          <strong>Population:</strong> {selectedCountry.population}
        </p>
        <p>
          <strong>Capital:</strong> {selectedCountry.capital}
        </p>
      <button className='bg-red-500 text-white px-5 fw-bold rounded py-2' onClick={onClose}>Back</button>
      </div>
    </div>
  );
};

export default CountryDetail;
