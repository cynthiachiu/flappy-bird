import React from 'react';
import { View, Image } from 'react-native';

const Obstacles = ({ imgAsset, obstaclesLeft, obstacleWidth, obstacleHeight, gap, randomBottom }) => {

    return (
        <>
            <View style={{
                position: 'absolute',
                left: obstaclesLeft,
                bottom: randomBottom + obstacleHeight + gap,
            }}>
                <Image
                    source={imgAsset}
                    style={{
                        width: obstacleWidth,
                        height: obstacleHeight,
                        transform: [{ rotate: '180deg' }],
                    }}
                />
            </View>

            <View style={{
                position: 'absolute',
                left: obstaclesLeft,
                bottom: randomBottom,
            }}>
                <Image
                    source={imgAsset}
                    style={{
                        width: obstacleWidth,
                        height: obstacleHeight,
                    }}
                />
            </View>
        </>
    )
}

export default Obstacles;