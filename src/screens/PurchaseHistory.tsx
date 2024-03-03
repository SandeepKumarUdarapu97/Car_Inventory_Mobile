import React from "react";
import { Dimensions, Text, View } from "react-native";

const {width,height} = Dimensions.get('window');
interface PurchaseHistoryProps {

}

const PurchaseHistory: React.FC<PurchaseHistoryProps> = ()=>{
    return(
        <View style={{flex:1}}>
            <Text>Purchase history</Text>
        </View>
    )
}
export default PurchaseHistory;