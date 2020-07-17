import React, { useRef, useState, useEffect } from 'react';

import axios from 'axios';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Header from '../../components/Header';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';
import { Container } from './styles';

function Create() {
  const formRef = useRef(null);

  const [cities, setCities] = useState([]);

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();

    async function loadStates() {
      try {
        const response = await api.get('cities', { cancelToken: source.token });

        setCities(response.data);
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

  async function handleSubmit(data, { reset }) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        ibge: Yup.number()
          .typeError('IBGE precisa ser um número')
          .required('IBGE é obrigatório')
          .integer('IBGE precisa ser um número inteiro')
          .positive('IBGE precisa ser um número inteiro positivo'),
        uf: Yup.string()
          .required('UF é obrigatório')
          .length(2, 'UF precisa ter dois caracteres'),
        nome_cidade: Yup.string().required('Cidade é obrigatório'),
        regiao: Yup.string().required('Regiao é obrigatório'),
        latitude: Yup.string().required('Latitude é obrigatório'),
        longitude: Yup.string().required('Longitude é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const listIBGE = [];
      cities.forEach(value => listIBGE.push(value.ibge));
      const checkSameIBGE = listIBGE.indexOf(Number(data.ibge));
      if (checkSameIBGE !== -1) return;

      const listUF = [];
      const citiesPerUf = cities.filter(city => city.uf === data.uf);
      citiesPerUf.forEach(value => listUF.push(value.nome_cidade));
      const checkSameName = listUF.indexOf(data.nome_cidade);
      if (checkSameName !== -1) return;

      await api.post('/cities', data);
      reset();
    } catch (err) {
      const errors = getValidationErrors(err);

      if (formRef !== null) formRef.current.setErrors(errors);
    }
  }

  return (
    <>
      <Header />
      <Container>
        <h1>CRIAR NOVA CIDADE</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <label>IBGE</label>
          <Input type="text" id="ibge" name="ibge" size={10} />
          <label>UF</label>
          <Input type="text" id="UF" name="uf" size={2} maxLength={2} />
          <label>Cidade</label>
          <Input type="text" name="nome_cidade" id="cidade" />
          <label htmlFor="regiao">Regiao</label>
          <Input type="text" name="regiao" id="regiao" />
          <label>Latitude</label>
          <Input type="text" name="latitude" id="latitude" />
          <label>Longitude</label>
          <Input type="text" id="longitude" name="longitude" />
          <button type="submit">Criar Cidade</button>
        </Form>
      </Container>
    </>
  );
}

export default Create;
