import React,{ useState }  from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface NumberAdjusterProps  {
    setNumberMethod: (value: number) => void;
   };
const {width,height}   = Dimensions.get('window');

   const NumberAdjuster: React.FC<NumberAdjusterProps> = ({ setNumberMethod }) => {
    const [number, setNumber] = useState<number>(0);
   
    const increment = () => {
        const temp = number +1
       setNumber(temp);
       setNumberMethod(temp);
    };
   
    const decrement = () => {
        const temp = number  -1
       setNumber(temp);
       setNumberMethod(temp);
    };
   
    return (
       <View style={styles.container}>
         <TouchableOpacity disabled={number === 0} onPress={decrement} style={[styles.button,{opacity: number === 0 ? 0.5 :1}]}>
           <Text style={styles.buttonText}>-</Text>
         </TouchableOpacity>
         <Text style={styles.numberText}>{number}</Text>
         <TouchableOpacity onPress={increment} style={styles.button}>
           <Text style={styles.buttonText}>+</Text>
         </TouchableOpacity>
       </View>
    );
   };
   const styles = StyleSheet.create({
    container: {
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: '#7a42f4',
       borderRadius:(width/100)*1.5,
    },
    button: {
       paddingHorizontal:(height/100)*2,
       paddingVertical:(height/100)*1
    },
    buttonText: {
       color: 'white',
       fontSize: 20,
       fontWeight: 'bold',
    },
    numberText: {
       fontSize: 20,
       fontWeight: 'bold',
       color: 'white'
    },
   });
   
export default NumberAdjuster