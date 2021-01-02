import React, {useState, useEffect} from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, ImageBackground, Text, Image, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import api from '../../services/api';

interface States {
  uf: string;
}

interface Cities {
  uf: string;
  cities: {
    name: string;
  }[]
}

const Home = () => {
  const navigation = useNavigation();

  const [uf, setUf] = useState('0');
  const [ufs, setUfs] = useState([] as string[]);
  const [city, setCity] = useState('0');
  const [cities, setCities] = useState([] as string[]);

  function handleNavigateToPoints() {
    navigation.navigate('Points', {uf, city})
  }

  useEffect(() => {
    setUfs([]);
    api.get<States[]>('points/states')
        .then(response => {
            const ufInitials = response.data.map(state => { 
                return state.uf
            })
            setCity('0');
            setUfs(ufInitials);
        })
  }, [])

  useEffect(() => {
    setCity('loading');
    api.get<Cities>(`points/states/${uf}/cities`)
        .then(response => {
            const citiesSelected = response.data.cities.map(state => { 
                return state.name
            })
            setCity('0');
            setCities(citiesSelected);
        })
  }, [uf])
  
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ImageBackground 
        source={require('../../assets/home-background.png')} 
        style={styles.container}
        imageStyle={{width: 274, height: 368}}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
          <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleas de forma eficiente.</Text>
        </View>
        
        <View style={styles.footer}>
          <View
            style={{...styles.inputView}}
          >
            <Picker
              style={{color: uf === '0' ? "#949494" : "#464646" ,...styles.input}}
              selectedValue={uf}
              onValueChange={(itemValue, itemIndex) => {
                setUf(`${itemValue}`);
              }
            }>
              <Picker.Item label="Selecione seu Estado" value="0"/>
              { ufs.map(uf => (
                  <Picker.Item key={uf} label={uf} value={uf}/>
              ))}
            </Picker>
          </View>
          
          <View
            style={{...styles.inputView}}
          >
            <Picker
              style={{color: city === "0" || city === "loading" ? "#949494" : "#464646" ,...styles.input}}
              selectedValue={city}
              enabled={cities.length!==0}
              onValueChange={(itemValue, itemIndex) => {
                setCity(`${itemValue}`);
              }
            }>
              <Picker.Item label="Selecione sua Cidade" value="0" />
              { city==="loading" && <Picker.Item label="carregando.." value="loading" /> }
              { cities.map(city => (
                  <Picker.Item key={city} label={city} value={city}/>
              ))}
            </Picker>
          </View>

          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>
              Entrar
            </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  inputView: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  input: {
    height: 60
  },
  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});