import React, { useEffect, useState } from 'react';

import axios from 'axios';
import api from '../../services/api';

import Header from '../../components/Header';

import { Container, Filters, TableContainer, DeleteIcon } from './styles';

function Home() {
  const [cities, setCities] = useState([]);
  const [ufState, setUfState] = useState([]);
  const [region, setRegion] = useState([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedRegion, setSelectedRegion] = useState('0');
  const [filteredCities, setFilteredCities] = useState(null);

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
  }, [filteredCities]);

  function handleSelectedUf(event) {
    const selectUf = event.target.value;

    setSelectedUf(selectUf);
  }

  function handleSelectedRegion(event) {
    const selectRegion = event.target.value;

    setSelectedRegion(selectRegion);
  }

  function handleFilter() {
    let filteringCities = [];

    if (selectedUf === '0' && selectedRegion === '0') {
      return setFilteredCities(cities);
    }

    if (selectedUf !== '0' && selectedRegion !== '0') {
      filteringCities = cities.filter(city => {
        return city.uf === selectedUf && city.regiao === selectedRegion;
      });

      return setFilteredCities(filteringCities);
    }

    if (selectedUf !== '0')
      filteringCities = cities.filter(city => city.uf === selectedUf);

    if (selectedRegion !== '0')
      filteringCities = cities.filter(city => city.regiao === selectedRegion);

    return setFilteredCities(filteringCities);
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
                <option value="0">Selecione uma região</option>
                {region.map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select>
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
              {filteredCities !== null
                ? filteredCities.map(
                    ({
                      ibge,
                      uf,
                      nome_cidade,
                      longitude,
                      latitude,
                      regiao,
                    }) => (
                      <tr key={ibge}>
                        <td>{ibge}</td>
                        <td>{nome_cidade}</td>
                        <td>{uf}</td>
                        <td>{regiao}</td>
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
                : cities.map(
                    ({
                      ibge,
                      uf,
                      nome_cidade,
                      longitude,
                      latitude,
                      regiao,
                    }) => (
                      <tr key={ibge}>
                        <td>{ibge}</td>
                        <td>{nome_cidade}</td>
                        <td>{uf}</td>
                        <td>{regiao}</td>
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
