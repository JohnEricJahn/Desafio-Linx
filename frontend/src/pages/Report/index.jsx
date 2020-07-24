import React, { useEffect, useState } from 'react';
import axios from 'axios';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container, Filters, Wrapper, Reports } from './styles';

function Relatórios() {
  const [citiesList, setCitiesList] = useState([]);
  const [ufsList, setUfsList] = useState([]);
  const [regionsList, setRegionsList] = useState([]);

  const [selectedUf, setSelectedUf] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const [cityPerRegion, setCityPerRegion] = useState(0);
  const [cityPerUf, setCityPerUf] = useState(0);

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();

    async function loadStates() {
      try {
        const listCity = await api.get('cities', { cancelToken: source.token });
        const listUf = await api.get('ufs', { cancelToken: source.token });
        const listRegion = await api.get('regions', {
          cancelToken: source.token,
        });

        setCitiesList(listCity.data);
        setUfsList(listUf.data);
        setRegionsList(listRegion.data);
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

    const quantity = citiesList.filter(city => city.Uf.name === selectUf);

    return setCityPerUf(quantity.length);
  }

  function handleSelectedRegion(event) {
    const selectRegion = event.target.value;

    setSelectedRegion(selectRegion);

    if (selectRegion === '') return setCityPerRegion(0);

    const quantity = citiesList.filter(
      city => city.Region.name === selectRegion,
    );

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
                  <option value="0">Selecione uma UF</option>
                  {ufsList.map(({ id, name }) => (
                    <option value={name} key={id}>
                      {name}
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
                  <option value="0">Selecione uma região</option>
                  {regionsList.map(({ id, name }) => (
                    <option value={name} key={id}>
                      {name}
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
