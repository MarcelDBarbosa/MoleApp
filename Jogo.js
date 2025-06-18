import { useState, useEffect, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, Button, Dimensions, Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';

function GameScreen({navigation}){
  const { width, height } = Dimensions.get('window');
  const moleSize = 80;
  const minInterval = 500; //tempo mínimo para ser jogável!
  const [molePos, setMolePos] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [intervalTime, setIntervalTime] = useState(900);
  const intervalRef = useRef(null);
  const soundRef = useRef(null);

  // Função para gerar posição aleatória dentro dos limites
  const randomPosition = () => {
    const x = Math.random() * (width - moleSize);
    const y = Math.random() * (height - moleSize - 200); // desconta espaço para UI
    return { x, y };
  };


// Carregar o som para indicar que errou
useEffect(() => {
    (async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('./assets/Errou.m4a')
      );
      soundRef.current = sound;
    })();

    return () => {
      // Liberar o som quando o componente desmontar
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

// Função para iniciar ou reiniciar o timer com o intervalo atual
  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setMolePos(randomPosition());
    }, intervalTime);
  };

  // Inicia o timer na montagem e reinicia quando intervalTime mudar
  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, [intervalTime]);

  // Verifica se score chegou a 10 para mostrar alerta e ajustar estado
  useEffect(() => {
    if (score === 10) {
      const total = score + misses;
      const errorPercent = total > 0 ? ((misses / total) * 100).toFixed(2) : 0;

      Alert.alert(
        'Parabéns!',
        `Você atingiu ${score} acertos no intervalo\nde ${intervalTime} ms! \n\nPorcentagem de erros: ${errorPercent}%`,
        [{ text: 'OK', onPress: () => {} }],
        { cancelable: false }
      );

      // Zera placares
      setScore(0);
      setMisses(0);

      // Diminui intervalo em 20 ms, sem passar do mínimo
      setIntervalTime(prev => (prev - 20 >= minInterval ? prev - 20 : prev));
    }
  }, [score, misses]);


  // Ao tocar na imagem
  const hitMole = () => {
    setScore(score + 1);
    Haptics.selectionAsync();
  };


  // Ao tocar fora da imagem
  const miss = async() => {
    setMisses(misses + 1);
    if (soundRef.current) {
      try {
        await soundRef.current.replayAsync();
      } catch (error){
        console.log('Erro ao tocar som:', error);
      }
    }
  };

  // Reiniciar jogo
  const resetGame = () => {
    setScore(0);
    setMisses(0);
    setIntervalTime(900);
  };

//function GameScreen({navigation}){
  return(
    <View style={{ flex: 1, backgroundColor: 'blue' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }}>
        <Text style={{color: 'white', fontWeight: 'bold', textAlignVertical: 'center'}}>Acertos: {score}</Text>
        <Text style={{color: 'white', fontWeight: 'bold', textAlignVertical: 'center'}}>Erros: {misses}</Text>
        <Button title="Reiniciar" onPress={resetGame} />
      </View>

      <TouchableOpacity style={{ flex: 1, backgroundColor: 'lightgreen' }} activeOpacity={1} onPress={miss}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={hitMole}
            style={{
              position: 'absolute',
              left: molePos.x,
              top: molePos.y,
              width: moleSize,
              height: moleSize,
            }}
          >
            <Image
              source={require('./assets/bunny1.png')}
              style={{ width: moleSize, height: moleSize }}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}
  export default GameScreen;
