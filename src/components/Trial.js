import React, { Component } from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Styles, {AppColors, AppFonts} from './AppStyles';
import MapStyles from './MapStyles';
import MapViewDirections from 'react-native-maps-directions';
import firebase from 'react-native-firebase';
 
const GOOGLE_API_KEY = 'AIzaSyBwwSJUZkTjAm79_OwsIqMcN7wIPyxLdaA';
const USE_METHODS = false;

export default class App extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            origin: {latitude: 0, longitude: 0},
            destination: ' ',
            makArray: []
        }
    }

    componentWillMount(){
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
            origin: {longitude: position.coords.longitude, latitude: position.coords.latitude}
            }); 
        });
        var markArray = new Array();
            c = 0;
            var data = firebase.database().ref('/users/').once('value', (snapshot) => {
            var stores = snapshot.val();
            console.log(stores);
            for(var i=0;i<18;i++){
                loc=stores[i][i];
                console.log(loc);
                markArray.push(<Marker coordinate = {loc} />);
            }
            this.setState({makArray : markArray})
        })
    }

    getCurrentLocation(){
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
            origin: {longitude: position.coords.longitude, latitude: position.coords.latitude}
            }); 
        });
        return this.state.origin;
    }

        renderMarkers(){
            var markArray = new Array();
            c = 0;
            var data = firebase.database().ref('/users/').once('value', (snapshot) => {
            var stores = snapshot.val();
            for(var i=0;i<18;i++){
                loc=stores[i][i];
                console.log(loc);
                markArray.push(<Marker coordinate = {loc}/>);
            }
            console.log(markArray);
            /*for(var i=8; i < stores['count']['c'];i++){
                loc = stores['m' + i ]['obj']['loc']
                p = stores['m' + i]['obj']['pothole']
                s = stores['m' + i]['obj']['speedbraker']
                console.log(loc,p,s);
                if(p == true){
                    markArray.push(<Marker coordinate = {loc} image={p50}/>);
                }
                if(s == true){
                    markArray.push(<Marker coordinate = {loc} image={s50}/>);
                }
            }*/

        })
        return markArray;
    }
    
    render()
    {
      return (
          <View style={Styles.appContainer}>
                <View style={{flex:1}}>
                    <MapView
                        ref={ref => this.refMap = ref}
                        provider={PROVIDER_GOOGLE}
                        style={Styles.map}
                        customMapStyle={MapStyles}
                        initialRegion={{
                            latitude: this.state.origin.latitude,
                            longitude: this.state.origin.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        showsUserLocation={true}
                        followUserLocation={true}                    
                    >
                        
                        {this.state.displayPath ?<MapViewDirections
                            origin={this.getCurrentLocation()}
                            destination={this.state.destination}
                            strokeWidth={10}
                            strokeColor="royalblue"
                            apikey={"AIzaSyBwwSJUZkTjAm79_OwsIqMcN7wIPyxLdaA"}
                        />
                         : null }
                         {this.state.makArray}
                    </MapView>
                </View>
          </View>
        )
    }
}