import React from 'react';
import { View, Image } from 'react-native';

const Bird = ({ birdBottom, birdLeft }) => {
    const birdWidth = 80;
    const birdHeight = 60;

    return (
        <View style={{
            position: 'absolute',
            bottom: birdBottom - (birdHeight / 2),
            left: birdLeft - (birdWidth / 2),
        }}>
            <Image
                source={require('../assets/yellowbird-upflap.png')}
                style={{
                    width: birdWidth,
                    height: birdHeight,
                }}
            />
        </View>
    )
}

export default Bird;