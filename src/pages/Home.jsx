import { Container, CountryList, Heading, Loader, Section } from 'components';
import { useEffect, useState,  } from 'react';
import { getCountries } from 'service/country-service'

export const Home = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        console.log(data)
        setCountries(data)
      } catch (error) {
        console.log("Error countries", error);
      }
      finally{
        setIsLoading(false);
      }
    }
    fetchCountries()
    }, []);

  return (
    <Section>
      <Container>
        {isLoading && <Loader />}
        <CountryList countries={countries}/>
      </Container>
    </Section>
  );
};
