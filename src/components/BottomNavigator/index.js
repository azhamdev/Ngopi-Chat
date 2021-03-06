import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import TabItem from '../TabItem';
import { Colors } from '../../utils/colors';
import { ms } from 'react-native-size-matters';

export default function BottomNavigator({ state, descriptors, navigation }) {
    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented)
                    {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (


                    <TabItem title={label} active={isFocused} onPress={onPress} onLongPress={onLongPress} />
                    // <TouchableOpacity
                    //     accessibilityRole="button"
                    //     accessibilityState={isFocused ? { selected: true } : {}}
                    //     accessibilityLabel={options.tabBarAccessibilityLabel}
                    //     testID={options.tabBarTestID}
                    //     onPress={onPress}
                    //     onLongPress={onLongPress}
                    //     style={{ flex: 1 }}
                    // >
                    //     <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                    //         {label}
                    //     </Text>
                    // </TouchableOpacity>
                );
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.Secondary,
        justifyContent: 'space-between',
        paddingHorizontal: ms(80),
        paddingVertical: ms(12),

    }
})