import { useEffect, useState } from 'react';

import {
  Container,
  SearchForm,
  Section,
  Heading,
  Loader,
  CountryList,
} from 'components';
import { useSearchParams } from 'react-router-dom';
import {fetchByRegion} from 'service/country-service'

export const CountrySearch = () => {

const [query, setQuery] = useState('');
const [searchParams, setSearchParams] = useSearchParams();
const [countries, setCountries] = useState([]);
const [isLoading, setIsLoading] = useState(null);

console.log(query);

const searchRegion = (query) => {
  setSearchParams({ query: query });
  setQuery(searchParams.get('query'));
}


useEffect(() => {
  setIsLoading(true);
  const fetchCountries = async () => {
    try {
      const data = await fetchByRegion(query);
      // console.log(data);
      setCountries(data);
    } catch (error) {
      console.log('Error countries', error);
    } finally {
      setIsLoading(false);
    }
  };
  fetchCountries();
}, [query]);


  return (
    <Section>
      <Container>  
        <SearchForm onSubmit={searchRegion}/>
        <CountryList countries={countries}/>
      </Container>
    </Section>
  );
};
