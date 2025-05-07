import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const pictures = [
  { id: '1', title: 'Sunset Beach', uri: 'https://t4.ftcdn.net/jpg/00/81/83/03/360_F_81830330_sfs46yRDV1XUOAAAUUjTgCu7O14nQio8.jpg' },
  { id: '2', title: 'Mountain View', uri: 'https://media.timeout.com/images/106150168/750/562/image.jpg' },
  { id: '3', title: 'City Lights', uri: 'https://images.theconversation.com/files/149162/original/image-20161208-18046-116xg09.jpg?ixlib=rb-4.1.0&rect=0%2C0%2C3500%2C1697&q=45&auto=format&w=1356&h=668&fit=crop' },
  { id: '4', title: 'Calm Lake', uri: 'https://media.istockphoto.com/id/108327817/photo/lake-plansee-tirol-austria.jpg?s=612x612&w=0&k=20&c=FKIudoqwHFtceB6w_jYJcAQA743TFlEJMf4lkHzi1iU=' },
  { id: '5', title: 'Forest Path', uri: 'https://miro.medium.com/v2/resize:fit:1400/0*6lQ6FxwIWeJWhti6.jpg' },
  { id: '6', title: 'Desert Dunes', uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlVLM7ZOtrDzpw0rpAgkRVpQ_vf3k2Q-Yreg&s' },
  { id: '7', title: 'Snowy Peak', uri: 'https://media.istockphoto.com/id/1288385045/photo/snowcapped-k2-peak.jpg?s=612x612&w=0&k=20&c=sfA4jU8kXKZZqQiy0pHlQ4CeDR0DxCxXhtuTDEW81oo=' },
  { id: '8', title: 'Sunny Field', uri: 'https://media.istockphoto.com/id/815712236/photo/golden-wheat-field-under-beautiful-sunset-sky.jpg?s=612x612&w=0&k=20&c=Dy9vp9z8_G8HqAEl1vYJ8mDSH5qxL1T4PwbiIx7Ts54=' },
  { id: '9', title: 'Lush Waterfall', uri: 'https://freerangestock.com/sample/112646/lush-waterfalls.jpg' },
];

export default function GalleryScreen() {
  const navigation = useNavigation();
  const numColumns = 3;

  return (
    <FlatList
      data={pictures}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('Viewer', { image: item })}
        >
          <Image source={{ uri: item.uri }} style={styles.thumbnail} />
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const { width } = Dimensions.get('window');
const itemSize = width / 3 - 16; // adjust spacing

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    marginHorizontal: 8,
  },
  item: {
    marginVertical: 8,
    width: itemSize,
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: itemSize,
    borderRadius: 8,
  },
  title: {
    marginTop: 4,
    textAlign: 'center',
    fontSize: 12,
  },
});
