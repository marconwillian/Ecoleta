import { ChangeEvent, useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRouter } from 'next/router'

import { FiArrowLeft } from "react-icons/fi";
import BeatLoader from "react-spinners/BeatLoader";

import axios from "axios";

import { Select } from "../../Components/Select";
import { Input } from "../../Components/Input";
import { DropZone } from "../../Components/DropZone";

const Map = dynamic(
  () => import('../../Components/Map'),
  {
    loading: () => <p>Carregando mapa!</p>,
    ssr: false
  }  
);

import styles from './createPoint.module.scss';
import { GetStaticProps } from "next";
import { string } from "yup/lib/locale";

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

interface Location {
  lat: number;
  lng: number;
}


const createPointFormSchema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  whatsapp: Yup.string().required('Whatsapp obrigatório'),
  uf: Yup.string().required('Estado obrigatório'),
  city: Yup.string().required('Cidade obrigatória')
})


interface CreatePointProps {
  items: Item[];
  ufs: Uf[];
  endPointApi: string;
  googleMapKey: string;
}

export default function CreatePoint({ items, ufs, googleMapKey, endPointApi }: CreatePointProps){
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createPointFormSchema)
  });

  const { errors } = formState;

  const [cities, setCities] = useState<string[]>([]);

  const [initialPosition, setInitialPosition] = useState<Location>({lat: 0, lng: 0});

  const [selectedUf, setSelectedUf] = useState<string>('');
  const [isLoadingCity, setIsLoadingCity] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<Location>({lat: 0, lng: 0});
  const [selectedFile, setSelectedFile] = useState<File>();

  const router = useRouter();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition({lat: latitude, lng: longitude});;
      setSelectedPosition({lat: latitude, lng: longitude});
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

  function handleMapClick({
    lat,
    lng
  }: {
    lat: number,
    lng: number
  }) {
    console.log({ lat, lng })
    setSelectedPosition({ lat, lng });
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

  const handleCreatePoint: SubmitHandler<CreatePointFormData> = async (values) => {
    const { name, email, whatsapp, uf, city } = values;
    const { lat: latitude, lng: longitude } = selectedPosition;
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
    
    await axios.post(`${endPointApi}/points`, data);

    alert('Ponto de coleta criado!');
    router.push('/');
  }

  return (
    <div className={styles.page_create_point}>
      <Head>
        <title>Criar Ponto - Ecoleta</title>
      </Head>
      <header>
        <img src="/assets/logo.svg" alt="Ecoleta" />
        <Link href="/">
          <a href="/">
            <FiArrowLeft />
            Voltar para home
          </a>
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
          <div className={styles.field_group}>
            <Input
              label="Nome da entidade"
              type="text"
              error={errors?.name}
              {
              ...register("name")
              }
            />
          </div>
          <div className={styles.field_group}>
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
          <Map
            initialPosition={initialPosition}
            selectedPosition={selectedPosition}
            handleMapClick={handleMapClick}
            keyMap={googleMapKey}
          />
          <div className={styles.field_group}>
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

          <ul className={styles.items_grid} >
            {items.map(item => (
              <li
                key={item.id}
                onClick={() => handleSelectItem(item.id)}
                className={selectedItems.includes(item.id) ? styles.selected : ''}
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
}

export const getStaticProps: GetStaticProps = async () => { 
  const endPointApi = process.env.ENDPOINT_API;
  const { data: items } = await axios.get<Item[]>(`${endPointApi}/items`);

  const { data: ufs } = await axios.get<UfIBGEResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados');

  const ufInitials = ufs.map(uf => {
    return {
      fullName: uf.nome,
      name: uf.sigla
    }
  })

  return {
    props: {
      items,
      ufs: ufInitials,
      endPointApi,
      googleMapKey: process.env.KEY_GOOGLE_MAPS,
    },
    revalidate: ( 60 * 60 * 24 ), // 1 hours 
  }
}