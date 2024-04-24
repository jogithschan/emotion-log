import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import { TextInput } from 'react-native-web';

const RegistrationsInput = ({
    label,
    error, 
    password,
    onFocus = () => {},
    ...props
}) => {
    const [isFocused, setIsFocused] = React.useState(false)
    return <View style={{marginBotton: 20}}>
        <Text style={style.label}>
            {label}
        </Text>
        <View style={[style.inputContainer, {borderColor: error ?'red':isFocused ? '#957BEE' : '#fff'}]}>
            <TextInput 
            autoCorrect={false}
            onFocus={() => {
                onFocus();
                setIsFocused(true);
            }}
            onBlur={() => {
                setIsFocused(false);
            }}
            style={{color: '#fff', flex: 1, paddingLeft: 10}} 
            {...props}>
            </TextInput>
            {error && (<Text style={{color: 'red', fontSize: 12, marginTop: 7}}>
                {error}
            </Text>
            )}    
        </View>
    </View>
}

const style = StyleSheet.create({
    label: {
        marginVertical: 5,
        fontSize: 16, 
        color: 'white',
    },
    inputContainer: {
        height: 55,
        backgroundColor: '#000', 
        flexDirection: 'row',
        // marginHorizontal: 15,
        borderWidth: 0.5,
        alignItems: 'center',
        borderRadius: 6,
        // width: '90%',
    },
})

export default RegistrationsInput;