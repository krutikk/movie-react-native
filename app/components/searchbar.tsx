import React from 'react'
import {View, Image, TextInput} from "react-native";
import {icons} from "@/constants/icons";

interface Props {
    placeHolder:string;
    onPress?:() => void;
    value:string;
    onChangeText:(value:string) => void;
}

const Searchbar = ({placeHolder, onPress, value, onChangeText}: Props) => {
    return (
        <View className="flex-row  items-center bg-dark-200 rounded-full px-5 py-4">
            <Image source={icons.search} className="size-5 mx-auto" resizeMode={"contain"} tintColor="#ab8bff"/>
            <TextInput onPress={onPress}
                       placeholder={placeHolder} value={value} onChangeText={onChangeText}
             placeholderTextColor={"#ab8bff"} className="flex-1 ml-2 text-white"/>
        </View>
    )
}

export default Searchbar

