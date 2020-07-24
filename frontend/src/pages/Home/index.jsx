import React, { useEffect, useState } from 'react';

import axios from 'axios';
import api from '../../services/api';

import Header from '../../components/Header';

import { Container, Filters, TableContainer, DeleteIcon } from './styles';

function Home() {
  const [citiesList, setCitiesList] = useState([]);
  const [ufsList, setUfsList] = useState([]);
  const [regionsList, setRegionsList] = useState([]);

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedRegion, setSelectedRegion] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  const [filteredCities, setFilteredCities] = useState('0');

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
  }, [filteredCities]);

  function handleSelectedUf(event) {
    const selectUf = event.target.value;

    setSelectedUf(selectUf);
  }

  function handleSelectedRegion(event) {
    const selectRegion = event.target.value;

    setSelectedRegion(selectRegion);
  }

  function handleSelectedCity(event) {
    const selectCity = event.target.value;

    return setSelectedCity(selectCity);
  }

  function filterStates(data) {
    let cities = [];

    if (selectedUf !== '0' || selectedRegion !== '0') {
      if (selectedUf !== '0')
        cities = data.filter(city => city.Uf.name === selectedUf);

      if (selectedRegion !== '0')
        cities = data.filter(city => city.Region.name === selectedRegion);

      if (selectedUf !== '0' && selectedRegion !== '0')
        cities = data.filter(
          city =>
            city.Uf.name === selectedUf && city.Region.name === selectedRegion,
        );
    } else {
      return data;
    }

    return cities;
  }

  async function handleFilter() {
    let cities = [];

    if (selectedCity !== '0') {
      const { data } = await api.get('/cities', {
        params: {
          nome_cidade: selectedCity,
        },
      });

      if (data.length === 0) return setFilteredCities([]);

      cities = filterStates(data);

      return setFilteredCities(cities);
    }

    cities = filterStates(citiesList);

    return setFilteredCities(cities);
  }

  async function handleDeleteCity(ibge) {
    try {
      await api.delete(`/cities/${Number(ibge)}`);

      const response = await api.get('cities');
      setFilteredCities(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Header />
      <Container>
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
          <div className="field">
            <label htmlFor="nome_cidade">
              Cidade:
              <input
                type="text"
                id="nome_cidade"
                onChange={handleSelectedCity}
              />
            </label>
          </div>
          <button type="button" onClick={handleFilter}>
            Pesquisar
          </button>
        </Filters>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>IBGE</th>
                <th>CIDADE</th>
                <th>UF</th>
                <th>REGIÃO</th>
                <th>LATITUDE</th>
                <th>LONGITUDE</th>
                <th>EXCLUIR</th>
              </tr>
            </thead>

            <tbody>
              {filteredCities !== '0'
                ? filteredCities.map(
                    ({
                      Region,
                      Uf,
                      ibge,
                      nome_cidade,
                      longitude,
                      latitude,
                    }) => (
                      <tr key={ibge}>
                        <td>{ibge}</td>
                        <td>{nome_cidade}</td>
                        <td>{Uf.name}</td>
                        <td>{Region.name}</td>
                        <td>{latitude}</td>
                        <td>{longitude}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleDeleteCity(ibge)}
                          >
                            <DeleteIcon />
                          </button>
                        </td>
                      </tr>
                    ),
                  )
                : citiesList.map(
                    ({
                      Region,
                      Uf,
                      ibge,
                      nome_cidade,
                      longitude,
                      latitude,
                    }) => (
                      <tr key={ibge}>
                        <td>{ibge}</td>
                        <td>{nome_cidade}</td>
                        <td>{Uf.name}</td>
                        <td>{Region.name}</td>
                        <td>{latitude}</td>
                        <td>{longitude}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleDeleteCity(ibge)}
                          >
                            <DeleteIcon />
                          </button>
                        </td>
                      </tr>
                    ),
                  )}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
}

export default Home;
