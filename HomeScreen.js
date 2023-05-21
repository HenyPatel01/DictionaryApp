import * as React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Header} from '@rneui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default class HomeScreen extends React.Component{
constructor(){
    super();
    this.state={
        text: '',
        isSearchPressed: true,
        word: '',
        lexicalCategory: '',
        definition: '',
    }
}

getWord=(word)=>{
    var searchKeyword=word.toLowerCase()
    var url = "https://rupinwhitehatjr.github.io/dictionary/%22+searchKeyword+%22.json"+searchKeyword+".json"
    return fetch(url)
    .then((data)=>{
        if(data.status===200)
        {
            return data.json()
        }
        else
        {
            return null
        }
    })
    .then((response)=>{
        var responseObject = response

        if(responseObject)
        {
            var wordData = responseObject.definitions[0]
            var definition=wordData.description
            var lexicalCategory=wordData.wordtype
            this.setState({
                "word": this.state.text,
                "definition": definition,
                "lexicalCategory": lexicalCategory
            })
        }
        else
        {
            this.setState({
                "word": this.state.text,
                "definition": "Not Found",
            })
        }
    })
}
    render(){
        return(
        <SafeAreaProvider>
            <View>
                <Header backgroundColor="#b8e0d2" centerComponent={{text:'Monkey Chunky', style:{color:'#fff', fontSize:20}}}/>
                <TextInput
                 style={styles.inputBox}
                 onChangeText={text => {
                    this.setState({
                        text: text,
                        isSearchPressed: false,
                        word: "Loading...",
                        lexicalCategory: '',
                        examples: [],
                        definition: ""
                    });
                 }}
                 value={this.state.text}
                />

                <TouchableOpacity style={styles.searchButton} 
                onPress={()=>{this.setState({isSearchPressed: true}); this.getWord(this.state.text)}}>
                <Text style = {{textAlign: 'center', fontSize: 20, color: "white"}}>Search</Text>
                </TouchableOpacity>

                <View>
                    <Text style={styles.detailsTitle}>
                        Word:{" "}
                    </Text>
                    <Text style={{fontSize:18}}>
                        {this.state.word}
                    </Text>
                </View>

                <View>
                    <Text style={styles.detailsTitle}>
                        Type:{" "}
                    </Text>
                    <Text style={{fontSize:18}}>
                        {this.state.lexicalCategory}
                    </Text>
                </View>

                <View style={{flexDirection:'row',flexWrap: 'wrap'}}>
                    <Text style={styles.detailsTitle}>
                        Definition:{" "}
                    </Text>
                    <Text style={{fontSize:18}}>
                        {this.state.definition}
                    </Text>
                </View>
            </View>
        </SafeAreaProvider>
        );
    
     }
}

const styles = StyleSheet.create({
    inputBox: {
        width:'80%',
        alignSelf: 'center',
        height: 40,
        textAlign: 'center',
        borderWidth: 3,
        borderColor: 'black',
    },
    searchButton: {
        width: '40%',
        height: 50,
        alignSelf: 'center',
        padding: 10,
        margin: 20,
        borderWidth: 3,
        borderRadius: 20,
        borderColor: 'black',
    },
    detailsTitle: {
        marginTop: 30,
        color: "black",
        fontWeight: 'bold',
        justifyContent: 'center',
        fontSize: 20,
        marginLeft: 20,
        marginRight: 20
    }
})
