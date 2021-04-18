import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { LeafletMouseEvent } from 'leaflet';
import { Map, Popup, TileLayer, Marker } from 'react-leaflet';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import BeatLoader from "react-spinners/BeatLoader";

import DropZone from '../../Components/DropZone';
import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.svg';
import { Input } from '../../Components/Input';
import { Select } from '../../Components/Select';


//Sempre que cria estado para array ou objeto: manualmente informar o tipo da variavel

interface Item {
  id: number;
  title: string;
  imageUrl: string;
}

interface UfIBGEResponse {
  sigla: string;
  nome: string;
}
interface Uf {
  name: string;
  fullName: string;
}

interface CityIBGEResponse {
  nome: string;
}

interface CreatePointFormData {
  name: string;
  email: string;
  whatsapp: string;
  uf: string;
  city: string;
}

const createPointFormSchema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  whatsapp: Yup.string().required('Whatsapp obrigatório'),
  uf: Yup.string().required('Estado obrigatório'),
  city: Yup.string().required('Cidade obrigatória')
})

const CreatePoint = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createPointFormSchema)
  });

  const { errors } = formState;

  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<Uf[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

  const [selectedUf, setSelectedUf] = useState<string>('');
  const [isLoadingCity, setIsLoadingCity] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
  const [selectedFile, setSelectedFile] = useState<File>();

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
      setSelectedPosition([latitude, longitude]);
    })
  }, [])

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    })
  }, [])

  useEffect(() => {
    axios.get<UfIBGEResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        const ufInitials = response.data.map(uf => {
          return {
            fullName: uf.nome,
            name: uf.sigla
          }
        })
        setUfs(ufInitials);
      })
  }, [])

  useEffect(() => {
    if (selectedUf === '')
      return;

    axios.get<CityIBGEResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        const cityNames = response.data.map(city => city.nome);
        setCities(cityNames);
        setIsLoadingCity(false);
      })

  }, [selectedUf]);


  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    
    setIsLoadingCity(true);
    setCities([]);
    setSelectedUf(uf);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filterItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filterItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }
  console.log(errors);

  const handleCreatePoint: SubmitHandler<CreatePointFormData> = async (values) => {
    const { name, email, whatsapp, uf, city } = values;
    const [latitude, longitude] = selectedPosition;
    const items = selectedItems;

    if(!items){
      alert('Selecione algum ítem de coleta!')
      return ;
    }

    const data = new FormData();

    data.append('name', name);
    data.append('email', email);
    data.append('whatsapp', whatsapp);
    data.append('uf', uf);
    data.append('city', city);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('items', items.join(','));

    if(selectedFile) {
        data.append('image', selectedFile);
    }

    await api.post('points', data);

    alert('Ponto de coleta criado!');
    history.push('/');
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>
      <form onSubmit={handleSubmit(handleCreatePoint)}>
        <h1>Cadastro do<br /> ponto de coleta</h1>

        <DropZone 
          onFileUploaded={setSelectedFile}
        />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <div className="field-group">
            <Input
              label="Nome da entidade"
              type="text"
              error={errors?.name}
              {
              ...register("name")
              }
            />
          </div>
          <div className="field-group">
            <Input
              label="Email"
              type="email"
              error={errors?.email}
              {
              ...register("email")
              }
            />
            <Input
              label="Whatsapp"
              type="email"
              error={errors?.whatsapp}
              {
              ...register("whatsapp")
              }
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={initialPosition} zoom={13} onClick={handleMapClick}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition || initialPosition}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
            </Marker>
          </Map>
          <div className="field-group">
            <Select
              label="Estado (UF)"
              placeholder="Selecione uma UF"
              {
              ...register("uf")
              }
              onChange={handleSelectUf}
            >
              
              {
                ufs.map(uf => (
                  <option key={uf.name} value={uf.name}>{uf.fullName}</option>
                ))
              }
            </Select>
            <Select
              label="Cidade"
              placeholder="Selecione uma Cidade"
              isLoading={isLoadingCity}
              error={errors?.city}
              {
              ...register("city")
              }
            >
              {
                cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))
              }
            </Select>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais ítens abaixo</span>
          </legend>

          <ul className="items-grid">
            {items.map(item => (
              <li
                key={item.id}
                onClick={() => handleSelectItem(item.id)}
                className={selectedItems.includes(item.id) ? 'selected' : ''}
              >
                <img src={item.imageUrl} alt={item.title} />
                <span>{item.title}</span>
              </li>
            )
            )}
          </ul>
        </fieldset>
        {!formState.isSubmitting 
          ? <button type="submit">Cadastrar ponto de coleta</button>
          : (
            <button type="submit" disabled>
              <BeatLoader color="#ffffff" loading={true} size={10} />
            </button>
            )
        }
      </form>
    </div>
  )
};

export default CreatePoint;