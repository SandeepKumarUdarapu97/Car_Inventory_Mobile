import React from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";

const {width,height} = Dimensions.get('window');
const  LoadingComponent = () =>{
    return(
        <View style={{width:width,height:height,alignItems:'center',justifyContent:'center',position:'absolute'}}>
            <ActivityIndicator size={'large'} color={'black'}/> 
        </View>
    )
}

export default LoadingComponent;