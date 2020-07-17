import React, { useEffect, useState } from 'react';
import axios from 'axios';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container, Filters, Wrapper, Reports } from './styles';

function Relatórios() {
  const [cities, setCities] = useState([]);
  const [ufState, setUfState] = useState([]);
  const [region, setRegion] = useState([]);
  const [selectedUf, setSelectedUf] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [cityPerRegion, setCityPerRegion] = useState(0);
  const [cityPerUf, setCityPerUf] = useState(0);

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();

    async function loadStates() {
      try {
        const response = await api.get('cities', { cancelToken: source.token });

        const listCity = response.data;

        const listUf = [];
        const listRegion = [];

        listCity.forEach(value => listUf.push(value.uf));
        listCity.forEach(value => listRegion.push(value.regiao));

        const filteredListUf = listUf.filter((value, index) => {
          return listUf.indexOf(value) === index;
        });

        const filteredListRegion = listRegion.filter((value, index) => {
          return listRegion.indexOf(value) === index;
        });

        setCities(listCity);
        setUfState(filteredListUf);
        setRegion(filteredListRegion);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('cancelled');
        } else {
          throw err;
        }
      }
    }

    loadStates();

    return () => {
      source.cancel();
    };
  }, []);

  function handleSelectedUf(event) {
    const selectUf = event.target.value;

    setSelectedUf(selectUf);

    if (selectUf === '') return setCityPerUf(0);

    const quantity = cities.filter(city => city.uf === selectUf);

    return setCityPerUf(quantity.length);
  }

  function handleSelectedRegion(event) {
    const selectRegion = event.target.value;

    setSelectedRegion(selectRegion);

    if (selectRegion === '') return setCityPerRegion(0);

    const quantity = cities.filter(city => city.regiao === selectRegion);

    return setCityPerRegion(quantity.length);
  }

  return (
    <>
      <Header />
      <Container>
        <Wrapper>
          <Filters>
            <div className="field">
              <label htmlFor="uf">
                Estado (UF):
                <select
                  name="uf"
                  id="uf"
                  onChange={handleSelectedUf}
                  value={selectedUf}
                >
                  <option value="">Selecione uma UF</option>
                  {ufState.map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="field">
              <label htmlFor="region">
                Região:
                <select
                  name="region"
                  id="region"
                  onChange={handleSelectedRegion}
                  value={selectedRegion}
                >
                  <option value="">Selecione uma região</option>
                  {region.map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </Filters>

          <Reports>
            <span>
              Quantidade de cidades no estado {selectedUf}: {cityPerUf}
            </span>
            <span>
              Quantidade de cidades na região {selectedRegion}: {cityPerRegion}
            </span>
          </Reports>
        </Wrapper>
      </Container>
    </>
  );
}

export default Relatórios;
