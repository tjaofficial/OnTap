import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import {Controller} from 'react-hook-form';

const CustomInput= ({ control, name, rules={}, placeholder, secureTextEntry}) => {
    return (
        <Controller 
            control={control}
            name={name}
            rules={rules}
            render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <>    
                    <View 
                        style={[styles.container, {borderBottomColor: error ? 'red' : '' }]}>
                        <TextInput 
                            value={value}
                            placeholder={placeholder}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            style={styles.input} 
                            secureTextEntry={secureTextEntry}
                        />
                    </View>
                    {error && <Text style={{color: 'red', alignItems: 'center'}}>
                        {error.message || 'Error'}
                    </Text>}
                </>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '70%',
        paddingHorizontal: 10,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 6,
        marginVertical: 5,
        paddingVertical: 10,
    },
    input: {

    },
})
export default CustomInput;